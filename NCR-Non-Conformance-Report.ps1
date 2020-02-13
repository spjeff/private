<#
.DESCRIPTION
    Read source XLS on network share, group subtotals, and update cumulative total
    on desintation SharePoint NCR list.  Added features for logging into SPList.
    
.PARAMETER readOnly
    Execute process and generate LOG but do NOT apply changes to SharePoint NCR list
    
.PARAMETER install
	Execute process and generate LOG but do NOT apply changes to SharePoint NCR list

.EXAMPLE
    .\NCR-Non-Conformance-Report.ps1

.EXAMPLE
    .\NCR-Non-Conformance-Report.ps1 -readOnly

.EXAMPLE
    .\NCR-Non-Conformance-Report.ps1 -install
	
.NOTES  
	File Name:  NCR-Non-Conformance-Report.ps1
    Author   :  Rob Smyth       robert.smyth@ngc.com
                Jeff Jones      jeffrey.jones3@ngc.com

	Version  :  1.0
    Modified :  2020-02-12
    
    Depends on https://www.microsoft.com/en-us/download/details.aspx?id=54920

    File Name:
    AccessDatabaseEngine.exe		(77.0 MB)
    AccessDatabaseEngine_X64.exe	(79.0 MB)
#>

[CmdletBinding()]
param (
    [switch]$readOnly,
    [switch]$install
)

# Load module
Add-Type -Assembly "System.IO.Compression.FileSystem" -ErrorAction SilentlyContinue | Out-Null
$pnp = Get-Command Connect-Stuff -ErrorAction SilentlyContinue | Out-Null
if (!$pnp) {
    Install-Module SharePointPnPPowerShellOnline -Force
}
Import-Module SharePointPnPPowerShellOnline

# Configuration
$spUrl = ""
$spList = ""
$xlSource = "c:\temp\source.xlsx"
$xlTable = "TableName"

# read Excel cell values A2/H2 header first row Sophia format
# from https://martin77s.wordpress.com/2014/06/02/get-excel-data-without-excel/
function Get-ExcelData {
    [CmdletBinding(DefaultParameterSetName = 'Worksheet')]
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [String] $Path,

        [Parameter(Position = 1, ParameterSetName = 'Worksheet')]
        [String] $WorksheetName = 'Sheet1',

        [Parameter(Position = 1, ParameterSetName = 'Query')]
        [String] $Query = 'SELECT * FROM [Sheet1$]'
    )

    switch ($pscmdlet.ParameterSetName) {
        'Worksheet' {
            $Query = 'SELECT * FROM [{0}$]' -f $WorksheetName
            break
        }
        'Query' {
            # Make sure the query is in the correct syntax (e.g. 'SELECT * FROM [SheetName$]')
            $Pattern = '.*frombs*(?<Table>w+).*'
            if ($Query -match $Pattern) {
                $Query = $Query -replace $Matches.Table, ('[{0}$]' -f $Matches.Table)
            }
        }
    }

    # Create the scriptblock to run in a job
    $JobCode = {
        Param($Path, $Query)

        # Check if the file is XLS or XLSX 
        if ((Get-Item -Path $Path).Extension -eq 'xls') {
            $Provider = 'Microsoft.Jet.OLEDB.4.0'
            $ExtendedProperties = 'Excel 8.0;HDR=YES;IMEX=1'
        }
        else {
            $Provider = 'Microsoft.ACE.OLEDB.12.0'
            $ExtendedProperties = 'Excel 12.0;HDR=YES'
        }
        
        # Build the connection string and connection object
        $ConnectionString = 'Provider={0};Data Source={1};Extended Properties="{2}"' -f $Provider, $Path, $ExtendedProperties
        Write-host $ConnectionString
        $Connection = New-Object System.Data.OleDb.OleDbConnection $ConnectionString

        try {
            # Open the connection to the file, and fill the datatable
            $Connection.Open()
            $tables = $Connection.GetOleDbSchemaTable([System.Data.OleDb.OleDbSchemaGuid]::Tables, $null);

            $Adapter = New-Object -TypeName System.Data.OleDb.OleDbDataAdapter $Query, $Connection
            $DataTable = New-Object System.Data.DataTable

            # Suppress error (Expected for WorksheetNotFound first query)
            $ErrorActionPreference = 'silentlycontinue' 
            try {
                $Adapter.Fill($DataTable) | Out-Null
            }
            catch { }
            $ErrorActionPreference = 'continue' 
        }
        catch {
            # something went wrong 😦
            Write-Error $_.Exception.Message
        }
        finally {
            # Close the connection
            if ($Connection.State -eq 'Open') {
                $Connection.Close()
            }
        }

        # Return the results as an array
        return $DataTable, $tables
    }

    # Run the code in a 32bit job, since the provider is 32bit only
    $job = Start-Job $JobCode -RunAs32 -ArgumentList $Path, $Query
    $job | Wait-Job | Receive-Job
    Remove-Job $job
}

function ParseXLS($xlSource, $xlTable) {
    # from https://stackoverflow.com/questions/32526175/extract-a-certain-file-from-zip-via-powershell-seems-like-not-to-look-in-sub-fol
    # Inspect ZIP file entries
    $temp = $env:TEMP
    $zip = [IO.Compression.ZipFile]::OpenRead($xlSource)
    $ent = $zip.Entries

    # Extract XLSX only with overwrite
    $ent | Where-Object { $_.Name -like '*.xlsx' } | ForEach-Object { $n = $_.Name; [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, "$temp\$n", $true) }
    $zip.Dispose()
    $foundXLS = "$temp\$n"

    # Read XLS first header row
    $data = Get-ExcelData $foundXLS $xlTable
    $table = $data[0]
    return $table
}

function WriteDetail($msg, $obj) {
    $detail += "$msg `r`n" + $obj.ToSTring()
}

function Main() {
    #Log
    Start-Transcript
    $detail = ""
    WriteDetail "START" (Get-Date)

    # Parameter switches
    if ($install) {
        # IIS Detect current user and pass
        $user = $ENV:USERDOMAIN + "\" + $ENV:USERNAME
        WriteDetail "USER $user"

        # IIS Attempt to detect password from IIS Pool (if current user is local admin and farm account)
        $appPools = Get-WMIObject -Namespace "root/MicrosoftIISv2" -Class "IIsApplicationPoolSetting" | Select-Object WAMUserName, WAMUserPass
        foreach ($pool in $appPools) {			
            if ($pool.WAMUserName -like $user) {
                $pass = $pool.WAMUserPass
                if ($pass) {
                    break
                }
            }
        }
        
        # Manual input if auto detect failed
        if (!$pass) {
            $pass = Read-Host "Enter password for $user "
        }

        # Create scheduled task
        Write-Host "SCHTASKS CREATE" -Fore "Yellow"
        $script = $MyInvocation.MyCommand.Name
        SCHTASKS /S $_ /create /TN "NCR-Non-Conformance-Report" /RU $user /RP $pass /SC daily /ST 02:00 /TR "powershelle.exe $script"
        WriteDetail "SCHTASK $script"
    }

    # Context
    Connect-PnPOnline -Url $spUrl -UseWebLogin
    $list = Get-PnPList -Identity $spList
    WriteDetail "LIST $($list.Id)"

    # Parse XLS named range
    $xls = ParseXLS $xlSource $xlTable
    $rows = $xls | Group-Object "NCRNumber" | Measure-Object -Sum "TotalHours"
    WriteDetail "ROWS $($rows.Count)"
    foreach ($r in $rows) {
        # Read SPListItem
        $ncr = $r.NCRNumber
        WriteDetail "ROW $($ncr) TOTAL $($r.TotalHours)"
        $query = "<View><Query><Where><Eq><FieldRef Name='NCRNumber'/><Value Type='Text'>$ncr</Value></Eq></Where></Query></View>"
        $item = Get-PnPListItem -List $list -Query $query
        if ($item) {
            # Update SPListItem
            WriteDetail "UPDATE $($item.Id)"
            Write-Host "Updating $($item.Id) " -ForegroundColor "Yellow"
            $newHours = $item.TotalHours += $r.TotalHours

            # Read only bypass
            if (!$readonly) {
                WriteDetail "NEW HOURS $($newHours)"
                Set-PnPListItem -List $list -Identity $item.Id -Values @{"TotalHours" = $newHours}
            }
        }
    }

    # Log to SPList
    Set-PnPListItem -List $listLog -Values @{"Title" = $script; "Detail" = $detail}

    # Log
    Stop-Transcript
}
Main