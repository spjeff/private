<#
.DESCRIPTION
	Copies local XLS Financial Reports to Office 365 and applies SQL metadata tags.
	
.NOTES  
	File Name:  EDC-Financial_Report.ps1
	Author   :  Jeff Jones <jjones@cloudproserv.com>
	Author   :  Bob Duncan <bduncan@edc.org>
	Version  :  1.0
	Modified :  2019-04-09
#>

# Config
#region CONFIG
$Days = "1"
$ModifiedAge = (Get-Date).Adddays(-$Days)
$SourcePath = "\\COSTPOINT-DB2\DivReporting\PDMonthlyReports\Reports"

# Config - Office 365
$Target365Web = "https://educationdevelopmentcenter.sharepoint.com/sites/intranet/ReportsDashboards/"
$Target365Lib = "BD Reports/"
$Target365LibURL = "$Target365Web/BD%20Reports"
$TenantUserName = "cp365admin@educationdevelopmentcenter.onmicrosoft.com"
$TenantPassword = '~xH~%RWXfJ6{Q&y(' | ConvertTo-SecureString -AsPlainText -Force
$TenantCredentials = New-Object -typename System.Management.Automation.PSCredential -argumentlist $TenantUserName, $TenantPassword
$UserProfilePrefix = "i:0#.f|membership|" # Claims membership prefix

# Config - SQL
$DB_SERVER = "costpoint-db2\datawarehouse"
$DB_NAME = "DivReporting"
$DB_UserName = "adprofilesync_reporting"
$DB_Pass = 'Ni0c24$Noav8923xuW'
$ReportPeriod_Filter = "5" 
$DB_QUERY = "SELECT ProjectID, Level1ProjectName, PublishedID, FiscalYear, Period, ExcelFileName, PDName, PDPersonID, PDEmailAddress, DFMEmailAddress, PortfolioName, PortfolioLeaderEmailAddress, DivisionName, DivisionLeaderEmailAddress, PushedToCloud  FROM [DivReporting].[dbo].[Reporting_PublishLog] WHERE ((Period ='$ReportPeriod_Filter') AND (FiscalYear = '2019'))"

# Config - Managed Metadata
$ReportTypeTermPath = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|Reports And Dashboards|" 
$DivisionTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|ReachAudience|All EDC|"
$PortfolioTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|EDC Portfolios|"
$ProjectNameTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|EDC Projects|"
$ProjectIdTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|EDC ProjectCodes|"
#endregion CONFIG

# Modules
Import-Module SqlServer -ErrorAction SilentlyContinue | Out-Null
Import-Module SharePointPnPPowerShellOnline -ErrorAction SilentlyContinue | Out-Null

# Logic
Function UploadFiles() {
    # PNP Connect
    Connect-PnPOnline -Url $Target365Web -Credentials $TenantCredentials -WarningAction SilentlyContinue -ErrorAction SilentlyContinue

    # SQL Collect Tags
    $SQL_Records = Invoke-SQLcmd -ServerInstance $DB_SERVER -Database $DB_NAME -Query $DB_QUERY -username $DB_UserName -password $DB_Pass # -Credential $DB_Credential
    Write-Host "SQL_Records: $($SQL_Records.Count)"

    # Format Tags
    foreach ($SQLitem in $SQL_Records) {
        $File = $SQLitem.ExcelFileName -creplace '(?s)^.*\\', ''
        if (Test-Path -Path $WorkingPath\$File ) {
            # SQL Columns
            $ProjectID = $SQLitem.ProjectID
            $Level1ProjectName = ($SQLitem.Level1ProjectName)
            $ReportNewName = $ProjectID + "-" + $Level1ProjectName -join ""

            # PNP Upload File
            Add-PnPFile -Path "$WorkingPath\$File" -Folder $Target365Lib -Values @{"Title" = "$ReportNewName"; }
        }
    }
}

Function TagFiles() {
    # SharePoint rows
    $SPlistItems = Get-PnPListItem -List $Target365Lib

    # SQL rows
    foreach ($SQLitem in $SQL_Records) {
        #$sqlFile = $SQLitem.ExcelFileName
        $File = $SQLitem.ExcelFileName -creplace '(?s)^.*\\', ''
        $ProjectID = $SQLitem.ProjectID
        $Level1ProjectName = ($SQLitem.Level1ProjectName)
        $PDEmailAdress = ($SQLitem.PDEmailAddress)
        $PDLoginName = $UserProfilePrefix, $PDEmailAdress -join ""
        $PublishedID = ($SQLitem.PublishedID)
        $Period = ($SQLitem.Period)
        $FiscalYear = ($SQLitem.FiscalYear)
        $PortfolioName = ($SQLitem.PortfolioName)
        $PortfolioLeaderEmailAddress = ($SQLitem.PortfolioLeaderEmailAddress)
        $PortfolioLeaderLoginName = $UserProfilePrefix, $PortfolioLeaderEmailAddress -join ""
        $DivisionName = ($SQLitem.DivisionName)
        $DivisionLeaderEmailAddress = ($SQLitem.DivisionLeaderEmailAddress)
        $DivisionLeaderLoginName = $UserProfilePrefix, $DivisionLeaderEmailAddress -join ""
        $DFMEmailAddress = ($SQLitem.DFMEmailAddress)
        $DFMLoginName = $UserProfilePrefix, $DFMEmailAddress -join ""
        $DivisionTermPath = $DivisionTermBase, $DivisionName -join ""
        $PortfolioTermPath = $PortfolioTermBase, $PortfolioName -join ""
        $ProjectNameTermPath = $ProjectNameTermBase, $Level1ProjectName -join ""
        $ProjectIdTermPath = $ProjectIDTermBase, $ProjectID -join ""
        $ReportTypePath = $ReportTypeTermPath + $ReportType -join ""
        $ReportNewName = $ProjectID + "-" + $Level1ProjectName -join ""

        foreach ($SPListitem in $SPlistItems) {
            # SP Fields
            $SPitemName = $SPListitem.FieldValues.FileLeafRef
            $SPitemID = $SPListitem.FieldValues.ID
            $SPitemProjectCode = $SPListitem.FieldValues.EDC_x0020_Project_x0020_ID
            $File = $SQLitem.ExcelFileName -creplace '(?s)^.*\\', ''
            $ProjectID = $SQLitem.ProjectID
            $Level1ProjectName = ($SQLitem.Level1ProjectName)
            $PDEmailAdress = ($SQLitem.PDEmailAddress)
            $PDLoginName = $UserProfilePrefix, $PDEmailAdress -join ""
            $PublishedID = ($SQLitem.PublishedID)
            $Period = ($SQLitem.Period)
            $FiscalYear = ($SQLitem.FiscalYear)
            $PortfolioName = ($SQLitem.PortfolioName)
            $PortfolioLeaderEmailAddress = ($SQLitem.PortfolioLeaderEmailAddress)
            $PortfolioLeaderLoginName = $UserProfilePrefix, $PortfolioLeaderEmailAddress -join ""
            $DivisionName = ($SQLitem.DivisionName)
            $DivisionLeaderEmailAddress = ($SQLitem.DivisionLeaderEmailAddress)
            $DivisionLeaderLoginName = $UserProfilePrefix, $DivisionLeaderEmailAddress -join ""
            $DFMEmailAddress = ($SQLitem.DFMEmailAddress)
            $DFMLoginName = $UserProfilePrefix, $DFMEmailAddress -join ""
            $DivisionTermPath = $DivisionTermBase, $DivisionName -join ""
            $PortfolioTermPath = $PortfolioTermBase, $PortfolioName -join ""
            $ProjectNameTermPath = $ProjectNameTermBase, $Level1ProjectName -join ""
            $ProjectIdTermPath = $ProjectIDTermBase, $ProjectID -join ""
            $ReportTypePath = $ReportTypeTermPath + $ReportType -join ""
            $ReportNewName = $ProjectID + "-" + $Level1ProjectName -join ""

            # Prepare tags
            $hash = @{
                "EDC_x0020_ReportType"                             = "$ReportTypePath";
                "EDC_x0020_Division"                               = "$DivisionTermPath";
                "EDC_x0020_Portfolio"                              = "$PortfolioTermPath";
                "EDC_x0020_Project"                                = "$ProjectNameTermPath";
                "EDC_x0020_Project_x0020_ID"                       = "$ProjectID";
                "EDC_x0020_Fiscal_x0020_Year"                      = "$FiscalYear";
                "EDC_x0020_Report_x0020_Perios"                    = "$Period";
                "EDC_x0020_Report_x0020_Published_x0020_ID"        = "$PublishedID";
                "EDC_x0020_Project_x0020_Director"                 = "$PDLoginName";
                "EDC_x0020_Portfolio_x0020_Leader"                 = "$PortfolioLeaderLoginName";
                "EDC_x0020_Division_x0020_Leader"                  = "$DivisionLeaderLoginName";
                "EDC_x0020_Division_x0020_Financial_x0020_Manager" = "$DFMLoginName"
            }

            # Apply tags
            Write-Host "Updating $SPitemID ... " -NoNewline
            Set-PnPListItem -List $Target365Lib -Identity $SPitemID -Values $hash            
            Write-Host "[OK]" -Fore Green

            # Permission
            ApplyPermission $item
        }
    }
}

# Set row level security permission
Function ApplyPermission ($spListItem) {
    Write-Host "  Setting permissions... " -ForegroundColor Yellow
    # Set PD and EDC Leadership Team  access for the item:
    $ReportUser = "$PDEmailAdress" # set this to the user email value you want to use.  Value for Prodject director from DB is '$PDEmailAdress'
    $LeadershipGroup = "Reports-EDC-LeadershipTeam" # Set to SP EDC leadership Team group on 

    Write-Host "  Setting Project Director permissions to: $ReportUser ... " -ForegroundColor White
    Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -User $ReportUser -AddRole $SpPermSet
    Write-Host "  Setting EDC Leadership Group permissions... " -ForegroundColor White
    Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $LeadershipGroup -AddRole $SpPermSet

    # Set Division Permsissions
    if ( -not ([string]::IsNullOrEmpty($DivisionName))) {
        if ( $DivisionName -eq "IDD" ) {
            $DivSPgroup = "IDD"
        }
        if ( $DivisionName -eq "U.S. DIVISION" ) {
            $DivSPgroup = "USD"
        }
        if ( $DivisionName -eq "USD" ) {
            $DivSPgroup = "USD"
        }

        $DivisionLeadGroup = "Reports-" + $DivSPgroup + "-DivisionLeads" -join ""
        Write-Host "  Setting Division Leaders permissions to: $DivisionLeadGroup " -ForegroundColor White
        Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $DivisionLeadGroup -AddRole $SpPermSet
    }

    # Set Portfolio Permsissions
    if ( -not ([string]::IsNullOrEmpty($PortfolioName))) {
       
        if ( $DivSPgroup -eq "USD" ) {
            $PortfolioLeadGroup = "Reports-" + $DivSPgroup + "-" + $PortfolioName + "-PortfolioLeads" -join ""
            Write-Host "  Setting Portfolio permissions to: $PortfolioLeadGroup ... " -ForegroundColor White
            Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $PortfolioLeadGroup -AddRole $SpPermSet
        }
        if ( $DivisionName -eq "IDD" ) {
            #  Defing IDD Portfolio Mappings
            $IDD_Unit1_Portfolio = "Reports-IDD-Unit1-PortfolioLeads"
            $IDD_Unit2_Portfolio = "Reports-IDD-Unit2-PortfolioLeads"
            $IDD_Unit3_Portfolio = "Reports-IDD-Unit3-PortfolioLeads"
            #
            If ( $PortfolioLeaderEmailAddress -eq "sross@edc.org" ) {
                #Write-Host "Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $IDD_Unit1_Portfolio -AddRole $SpPermSet
                Write-Host "  Setting Portfolio permission to: $IDD_Unit1_Portfolio" -ForegroundColor White
            }
            If ( $PortfolioLeaderEmailAddress -eq "snogueirasanca@edc.org" ) {
                #Write-Host "Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $IDD_Unit2_Portfolio -AddRole $SpPermSet
                Write-Host "  Setting Portfolio permission to: $IDD_Unit2_Portfolio" -ForegroundColor White
            }
            If ( $PortfolioLeaderEmailAddress -eq "sjames@edc.org" ) {
                #Write-Host "Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $IDD_Unit3_Portfolio -AddRole $SpPermSet
                Write-Host "  Setting Portfolio permission to: $IDD_Unit3_Portfolio" -ForegroundColor White
            }
        }
    }
    
    # Set Division Financial Manager Leads Permsissions
    if ( -not ([string]::IsNullOrEmpty($DivisionName))) {
        $FinancialLeadGroup = "Reports-" + $DivSPgroup + "-FinancialLeads" -join ""
        Write-Host "Setting Financial Manager permission to: $FinancialLeadGroup" -ForegroundColor White
        Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $FinancialLeadGroup -AddRole $SpPermSet
    }
}

# Main
Function Main() {
    Start-Transcript
    UploadFiles
    TagFiles
    Stop-Transcript
}
Main