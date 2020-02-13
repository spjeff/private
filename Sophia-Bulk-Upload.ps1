<#
.DESCRIPTION
	Bulk upload files from UNC into SharePoint Document Library.  Apply tags from XLS metadata source.

.NOTES  
	File Name:  Sophia-Bulk-Upload.ps1
	Author   :  Jeff Jones  - Jones, Jeffrey <jeffrejones@deloitte.com>
	Version  :  1.1
    Modified :  2020-01-08

.EXAMPLE
    .\Sophia-Bulk-Upload.ps1

.LINK
	https://deloittebsg.visualstudio.com/DTi2013
#>

[CmdletBinding()]
param (
)

# Module
Add-PSSnapin "Microsoft.SharePoint.PowerShell" -ErrorAction SilentlyContinue | Out-Null
Add-Type -Assembly "System.IO.Compression.FileSystem" -ErrorAction SilentlyContinue | Out-Null

# Configuration
$webUrl = "https://dti.tax.deloitteonline.com/sites/204394"
# $uncFolder = "\\usadcnas02.us.deloitte.com\Project-Sophia-Tax"
# $uncFolder = "\\ushdcnas22.us.deloitte.com\Project-Sophia-Tax\SophiaSFTP"
$uncFolder = "S:\"

# read Excel cell values A2/H2 header first row Sophia format
# from https://martin77s.wordpress.com/2014/06/02/get-excel-data-without-excel/
function Get-ExcelData {
    [CmdletBinding(DefaultParameterSetName='Worksheet')]
    Param(
        [Parameter(Mandatory=$true, Position=0)]
        [String] $Path,

        [Parameter(Position=1, ParameterSetName='Worksheet')]
        [String] $WorksheetName = 'Sheet1',

        [Parameter(Position=1, ParameterSetName='Query')]
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
            if($Query -match $Pattern) {
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
        } else {
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
            $ErrorActionPreference= 'silentlycontinue' 
            try {
                $Adapter.Fill($DataTable) | Out-Null
            } catch {}
            $ErrorActionPreference= 'continue' 
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
        return $DataTable,$tables
    }

    # Run the code in a 32bit job, since the provider is 32bit only
    $job = Start-Job $JobCode -RunAs32 -ArgumentList $Path, $Query
    $job | Wait-Job | Receive-Job
    Remove-Job $job
}

function ParseXLS($file) {
    # from https://stackoverflow.com/questions/32526175/extract-a-certain-file-from-zip-via-powershell-seems-like-not-to-look-in-sub-fol
    # Inspect ZIP file entries
    $temp = $env:TEMP
    $zip = [IO.Compression.ZipFile]::OpenRead($file.Fullname)
    $ent = $zip.Entries
    # Extract XLSX only with overwrite
    $ent | Where-Object {$_.Name -like '*.xlsx'} | ForEach-Object {$n=$_.Name; [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, "$temp\$n", $true)}
    $zip.Dispose()
    $foundXLS = "$temp\$n"

    # Read XLS first header row
    $data = Get-ExcelData $foundXLS "WorkSheetNotFound"
    $tableName = $data[1].Rows.TABLE_NAME
    $tableName = $tableName.TrimEnd('$$')
    Write-Host $tableName -Fore Yellow
    $data = Get-ExcelData $foundXLS $tableName
    $toprow = $data[0][0]
    return $toprow
}

function Main() {
    # Open destination SPWeb
    $web = Get-SPWeb -Identity $webUrl
    #Get the TermSet
    $TaxonomySession = Get-SPTaxonomySession -Site $webUrl
    $TermStore = $TaxonomySession.TermStores["Managed Metadata Service"]
    $TermGroup = $TermStore.Groups["DTi Core Term Sets"]
    $TermSet = $TermGroup.TermSets["Tax Year"]
    if ($web) {
        # Open destination folder
        $list = $web.Lists.TryGetList("Documents")
        # Open source files
        $files = Get-ChildItem -Path $uncFolder -Force -Recurse

        # Initialize Tracking
        $start = Get-Date
        $i = 0
        $total = $files.Count
        $filesComplete = 0

        # Loop source files
        foreach ($file in $files) {
            # Progress Tracking
            $i++
            $prct = [Math]::Round((($i / $total) * 100.0), 2)
            $elapsed = (Get-Date) - $start
            $totalTime = ($elapsed.TotalSeconds) / ($prct / 100.0)
            $remain = $totalTime - $elapsed.TotalSeconds
            $eta = (Get-Date).AddSeconds($remain)
                
            # Display
            $name = $file.Name
            Write-Progress -Activity "Complete: $filesComplete Parsing: $name ETA: $eta" -Status "$prct" -PercentComplete $prct
                
            # Operation
            if ($file.Extension -eq ".ZIP") {
                # Parse XLSX for metadata tags
                $toprow = ParseXLS $file

                # Upload SPFile Binary
                $file.Name
                $stream = $file.OpenRead()
                $done = $list.RootFolder.Files.Add($file.Name, $stream, $true)
                Write-Host $done.Name " - Uploaded into the Site" -BackgroundColor Green -Fore Black      

                # Refetch Item by ID
                $item = $list.GetItemById($done.Item.ID)

                # Apply Metadata Tags (CSV)
                $item["FundFamily"] = $toprow."Fund Family"
                $item["FundName"] = $toprow."Fund Name"
                $item["FundShortName"] = $toprow."Fund Short Name"
                $item["EmmaID"] = $toprow."Emma ID"
                $item["CUSIP"] = $toprow."CUSIP"
                $item["DistributionTime"]	= $toprow."Distribution Time"
                $item["Document_x0020_Type"]	= $toprow."Document Type"
                $item.Update()

                #set managed metadata field value powershell
                $Term = $Termset.Terms[$toprow."Tax Year"]
                $MMSField = [Microsoft.SharePoint.Taxonomy.TaxonomyField]($item.Fields |? {$_.InternalNAme -eq "Tax_x0020_Year"})
                $MMSField.setFieldValue($item,$Term)
                $item.Update()
                Write-Host $done.Name " - Tagged SPFile" -BackgroundColor Green

                # Metrics
                $filesComplete++
            }
        }
    }

    Write-Host "Files complete: $filesComplete"
}
Start-Transcript
Main
Stop-Transcript