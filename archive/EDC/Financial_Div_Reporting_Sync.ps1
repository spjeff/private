<#

EDC:

To run script enter this scpipt: 

C:\scripts\Prod\Financial_Reports\dev\Financial_Div_Reporting_Dev_Sync-test.ps1 'D:\test_source' 1 # dev

C:\scripts\Prod\Financial_Reports\prod\Financial_Div_Reporting_Sync.ps1 '\\COSTPOINT-DB2\DivReporting\PDMonthlyReports\Reports' 1 # Prod

4/15/2018: Initial creation of this script to sync only newly created reports generated on a regular basis from internal server share to o365 site library.

#>


Function Set-Reports{
	[CmdletBinding()]
	Param(
		[Parameter(Mandatory=$true,ValueFromPipeline=$true,ValueFromPipelineByPropertyName = $true)]
		[String] $SourcePath="\\COSTPOINT-DB2\DivReporting\PDMonthlyReports\Reports", # Path to Production Directory on Costpoint-db2 server
        #[String] $SourcePath="D:\test_source",# test path
		[String] $Days="1"
	)
	
	Begin{
		#Working 365 Variables
        #
        # Set to $TRUE to re-stage files from fileshare $FALSE to skip
        $GatherFiles = $TRUE #$FALSE
        # Set to $TRUE to Upload files to 365 $FALSE to skip
        $UploadFiles = $TRUE # $FALSE
        # Set to $TRUE to apply file Metadata $FALSE to skip
        $SetFileMetadata = $TRUE
        # Set to $TRUE to apply file Permissions $FALSE to skip
        $SetFilePermissions = $TRUE
        #
        $SP_Perms = "Read-only"
        #
        $SpPermSet = "Intranet View" # permsission set on library
        #365 Dev site and folder lodcation
       #
        $Target365Web = "https://educationdevelopmentcenter.sharepoint.com/sites/intranet/ReportsDashboards/" # Dev
        $Target365Lib = "BD Reports/" # Dev
        $Target365LibURL = "https://educationdevelopmentcenter.sharepoint.com/sites/intranet/ReportsDashboards/BD%20Reports" # Dev
        $WorkingPath = "D:\DivReporting_Working" # Dev
		$Logfile = "D:\DivReporting_Working\Logs\DBTrackerDivReporting_Test.log" # Dev
        #
        <# 365 Dev site and Folder Locations
        $Target365Web = "https://educationdevelopmentcenter.sharepoint.com/sites/Dev2/busdev/" # Dev
        $Target365Lib = "BD Reports" #Prod
        $Target365LibURL = "https://educationdevelopmentcenter.sharepoint.com/sites/Dev2/busdev/BD%20Reports" # Dev
        $WorkingPath = "E:\DivReporting_Testing" # Dev
		$Logfile = "E:\DivReporting_Testing\Logs\DBTrackerDivReporting_Test.log" # Dev
        #>
        # Working local Vars
        $ListContentType = "EDC Reports and Dashboards"
		$TypeFilter = "*.xlsx"
        $ReportsAndDash_TermGuid = "b9ffe05a-8710-4659-af76-2fcceaf2406e" #
        $ReportType = "Project Financial Reports" # use Termstore path as Guid or text path
        $UserProfilePrefix = "i:0#.f|membership|" # Claims membership prefix
        #
        # Other types:
        #$ReportType = "MandE" # Monitoring and Evaluation
        #
        ## SPO Audience/Groups Mappings
        $PortfolioGroupPerms = "" # This will set permissions for each Project file so that the portfolio and Div leader groups can see as well.
          ## SP Audience Mapping
        $SeniorLeadership_Audience = "EDC Leadership Team" # this will need acutal audience names from o365
        $InternationalDivisionLeadership_Audience = "IDD_SMT_MTG" # this will need acutal audience names from o365
        $DomesticDivisionLeadership_Audience = "USD_Division_Leaders" # this will need acutal audience names from o365
        #INT Portfolios
        $International_Porfolio_Audience = "International Portfolio leaders" # no actual portfolios exist so file with Division name as done in SQL db
        # USD Portoflios
        $USD_Portfolio_Audience = "USD Portfolio Leads" # this will need acutal audience names from o365
        #
        ## EDC Portfolio Mapping
        # IDD Div
        $PortfolioIDD_IDD_ID = "IDD"
        $PortfolioIDD_IDD_Name = "IDD"
        $PortfolioIDD_IDD_TermGUID = "c10b7f93-e094-4167-98a3-b03fd865610a"
        #
        # US Div
        # Behavioral Health Programs
        $PortfolioUS_SAP_ID = "SAP"
        $PortfolioUS_SAP_Name = "Subst Abuse Prevention" # prev "Subst Abuse Prevention" #"Behavioral Health Programs"
        $PortfolioUS_SAP_TermGUID = "67452e33-5ccb-43f3-9bbb-335278fe47a7"
        # College Workforce Success
        $PortfolioUS_CWS_ID = "CWS"
        $PortfolioUS_CWS_Name = "College Workforce Success"
        $PortfolioUS_CWS_TermGUID = "c10b7f93-e094-4167-98a3-b03fd865610a"
        # Early Childhood
        $PortfolioUS_EC_ID = "EC"
        $PortfolioUS_EC_Name = "Early Childhood"
        $PortfolioUS_EC_TermGUID = "b26e6062-5d07-4b10-a84e-4164776371ae"
        # Innovation in Practice and Technology
        $PortfolioUS_IPT_ID = "IPT"
        $PortfolioUS_IPT_Name = "IPT" # "Innovation in Practice and Technology"
        $PortfolioUS_IPT_TermGUID = "be8c7ca0-96f9-47d1-8d2b-4b0897a57b59"
        # School Improvement Programs
        $PortfolioUS_SIP_ID = "SIP"
        $PortfolioUS_SIP_Name = "School Improvement" 
        $PortfolioUS_SIP_TermGUID = "2966f4d2-f8bc-4d0e-b2b9-09517ef28d48"
        # STEM
        $PortfolioUS_STEM_ID = "STEM"
        $PortfolioUS_STEM_Name = "STEM"
        $PortfolioUS_STEM_TermGUID = "60a04d21-cedc-4239-8ccd-6b722843e422"
        # Suicide, Violence and Injury Prevention
        $PortfolioUS_IVSP_ID = "IVSP" 
        $PortfolioUS_IVSP_Name = "IVSP" #"Suicide, Violence and Injury Prevention" 
        $PortfolioUS_IVSP_TermGUID = "a67a25e5-7310-4813-bd09-d1f6dc286390"
        #
         # IVSP-Zero Suicide Institute
        $PortfolioUS_IVSP_ZSI_ID = "IVSP-Zero Suicide Institute" 
        $PortfolioUS_IVSP_ZSI_Name = "IVSP-Zero Suicide Institute" #"Suicide, Violence and Injury Prevention- ZSI" 
        $PortfolioUS_IVSP_ZSI_TermGUID = "a67a25e5-7310-4813-bd09-d1f6dc286390"
        #
        $EdcDivisions = @("IDD","U.S. DIVISION")
        $EdcPortFolios = @($PortfolioIDD_IDD_Name,$PortfolioUS_SAP_Name,$PortfolioUS_CWS_Name,$PortfolioUS_EC_Name,$PortfolioUS_IPT_Name,$PortfolioUS_SIP_Name,$PortfolioUS_STEM_Name,$PortfolioUS_IVSP_Name,$PortfolioUS_IVSP_ZSI_Name)
        #
        # EDC Column Term Paths
        $ProjectsTermGUID = "26c82d5a-c6e8-4f13-adaa-f723d15599a1"
        $ProjectsTermSharedProp = "EdcProjectID"
        #
        $ReportTypeTermPath = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|Reports And Dashboards|" 
        $DivisionTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|ReachAudience|All EDC|"
        $PortfolioTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|EDC Portfolios|"
        $ProjectNameTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|EDC Projects|"
        $ProjectIdTermBase = "Site Collection - educationdevelopmentcenter.sharepoint.com/sites/intranet/|EDC ProjectCodes|"
        #$US_Division_GUID = "8023e3fc-8381-476c-a431-be5a6be36c38"
       #$IDD_Division_GUID = "1edb936b-62e4-4c92-862d-2bdd32da1bee"
        ## make array of Portfolio names
        #
        # 
		$ModifiedAge = (get-date).Adddays(-$Days)

		#Email Log  toggle $TRUE=ON $FALSE=off
		$SendEmailLog = $FALSE # set to '$TRUE' to enable
		$SmtpServer = "mail-relay.ad.edc.org" #"10.54.6.70"
		$EmailTo = "bduncan@edc.org"
		$EmailCc = "jjones@cloudproserv.com"
        #
        ##########################################################################################################
		# START Edit Variables to access Sharepoint PnPOnline
        ##########################################################################################################
        #
        # Set UpdateSPO to TRUE to enable
		$UpdateSPO = $TRUE
        # Configure PnPOnline Global Variablese
        $TenantUserName = "Cp365admin@educationdevelopmentcenter.onmicrosoft.com" # Tenant Administrator username
        #$TenantPassword = cat "C:\Scripts\key\365CPadmin.txt" | convertto-securestring # Tenant Administrator password
        $TenantPassword = '~xH~%RWXfJ6{Q&y(' | convertto-securestring -AsPlainText -Force
        $TenantCredentials = new-object -typename System.Management.Automation.PSCredential -argumentlist $TenantUserName, $TenantPassword
        #
        <# original account
        # Configure PnPOnline Global Variablese
        $TenantUserName = "adprofilesync@edc.org" # Tenant Administrator username
        $TenantPassword = cat "C:\Scripts\key\adprofilesync.txt" | convertto-securestring # Tenant Administrator password
        $TenantCredentials = new-object -typename System.Management.Automation.PSCredential -argumentlist $TenantUserName, $TenantPassword
        #>

        ##########################################################################################################
        # End Edit PnPOnline config
        ##########################################################################################################
        #
        ##########################################################################################################
		# START Edit Variables to access SQL DB connect
        ##########################################################################################################
        #
        # Vars
        $DB_SERVER = "costpoint-db2\datawarehouse"
        $DB_NAME = "DivReporting"
        $DB_UserName = "adprofilesync_reporting" # DB username
        $DB_Pass = 'Ni0c24$Noav8923xuW'
        #
        ##########################################################################################################
        # End SQL DB connect
        ##########################################################################################################
        #
        ##########################################################################################################
        # Start SQL DB connect
        ##########################################################################################################
        #
        $StartTime = (get-date)
        Write-Host "Starting Script at: $StartTime" -ForegroundColor Green
        #
        #Get the files we need to move.
        # Set Filters
        $ProjectID_Filter = "11568" # Enter Project ID of files to update
        $Divison_Filter = "IDD" # Enter Project ID of files to update
        $ReportPeriod_Filter = "5" 
        #Get the files we need to move.
        write-host "Getting the files from SQL we need to process…"
        $DB_QUERY = "SELECT ProjectID, Level1ProjectName, PublishedID, FiscalYear, Period, ExcelFileName, PDName, PDPersonID, PDEmailAddress, DFMEmailAddress, PortfolioName, PortfolioLeaderEmailAddress, DivisionName, DivisionLeaderEmailAddress, PushedToCloud  FROM [DivReporting].[dbo].[Reporting_PublishLog] WHERE ((Period ='$ReportPeriod_Filter') AND (FiscalYear = '2019'))"
        
        # #Period ='$ReportPeriod_Filter' " # #PushedToCloud = 'N'" #ProjectID = '$ProjectID_Filter'" #(PushedToCloud = 'N') AND (ProjectID = '$ProjectID_Filter')

        $SQL_Records = Invoke-SQLcmd -ServerInstance $DB_SERVER -Database $DB_NAME -Query $DB_QUERY -username $DB_UserName -password $DB_Pass # -Credential $DB_Credential
        #
        ##########################################################################################################
        # END SQL DB connect
        ##########################################################################################################
        #
        # Recreate array based on ExcelFileName
        $SQLRecordFiles = $SQL_Records | % {$_.ExcelFileName}
        #
        ##########################################################################################################
        # Start Gather files and Upload to 0365
        ##########################################################################################################
		if ($GatherFiles -eq $TRUE){
        #Set files count to 0
		$LocalFilesCount = 0
		$NetworkFilesCount = 0
		$AllFilesCount = 0
		$SucessCount = 0
		$FailCount = 0
		#Load required powershell Sessions and arrays
		[Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
		#Create working directories
		if (!(Test-Path -PathType Container $WorkingPath)){
			New-Item $WorkingPath -type Directory
			New-Item "$WorkingPath\Uploaded" -type Directory
			New-Item "$WorkingPath\Failed" -type Directory
            New-Item "$WorkingPath\Original" -type Directory
		}
        #
		#Gather Local files
		$LocalFiles = get-childitem -Path $WorkingPath -filter $TypeFilter | where {!$_.PSIsContainer} | where-object {$_.LastWriteTime -gt $ModifiedAge}
		$LocalCount = $LocalFiles | measure-object
		$LocalFilesCount = $LocalCount.count

		if ($LocalFilesCount -gt 0){
			foreach ($LocalFile in $LocalFiles){
				$LocalName = [io.path]::GetFileNameWithoutExtension($LocalFile)
				$LocalFilesNames += "$LocalName, "
			}
		}

		#Gather Network Files
		$NetworkFiles = get-childitem -Path $SourcePath -filter $TypeFilter | where {!$_.PSIsContainer} | where-object {$_.LastWriteTime -gt $ModifiedAge}
		$NetworkCount = $NetworkFiles | measure-object
		$NetworkFilesCount = $NetworkCount.count
		if ($NetworkFilesCount -gt 0){
			foreach ($NetworkFile in $NetworkFiles){
				$NetworkName = [io.path]::GetFileNameWithoutExtension($NetworkFile)
				$NetworkFilesNames += "$NetworkName, "
				}
			$NetworkFiles | copy-item -destination $WorkingPath
		}
	}else{
                    Write-Host "Gather Files is disabled" -ForegroundColor red
                    }
	}
	Process{
    if ($GatherFiles -eq $TRUE){
	$AllFilesCount = $LocalFilesCount + $NetworkFilesCount
    }else{
    $AllFilesCount = "1"
    $NetworkFilesCount ="0"
    } 	
	if ($AllFilesCount -gt 0){
             #
             # If files exist to process, establish PnPOnline connection
             if ($UpdateSPO -eq $TRUE){
              # Establish PnPOnline Session 
               Connect-PnPOnline -Url $Target365Web -Credentials $TenantCredentials -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
              }
              #
			$AllFiles = get-childitem -Path $WorkingPath -filter $TypeFilter | where {!$_.PSIsContainer}
            #
            if ($UploadFiles -eq $TRUE){
            #
            Write-Host "Found $NetworkFilesCount files to upload ..." -ForegroundColor Green
            #
            foreach ($SQLitem in $SQL_Records){
                   # $sqlFile = $SQLitem.ExcelFileName
                    $File = $SQLitem.ExcelFileName -creplace '(?s)^.*\\', ''
                    if ( Test-Path -Path $WorkingPath\$File ){
                    $ProjectID = $SQLitem.ProjectID
                    $Level1ProjectName = ($SQLitem.Level1ProjectName)
                    $ReportNewName = $ProjectID + "-" + $Level1ProjectName -join ""
                    # Save a backup copy of source file locally before doing anything
                    Write-Host "making local backup of $File ..." -ForegroundColor White 
				    copy-item "$WorkingPath\$File" "$WorkingPath\Original\$File" -force
                    #
                    # upload file to SPO list and set properties
                    Write-Host "Uploading $sqlFileName to Site.." -ForegroundColor Cyan
                    # upload file to SP library and set Title
                    $f1 = Add-PnPFile -Path "$WorkingPath\$File" -Folder $Target365Lib -Values @{"Title" = "$ReportNewName";}

                    #>
                    }
                   
                }
            }else{
                    Write-Host "Upload Files is disabled" -ForegroundColor red
                    }
            # Pause before 
            # Get item ID
             Write-Host "Checking for Files in $Target365LibURL ..." -ForegroundColor White
            $SPlistItems = Get-PnPListItem -List $Target365Lib
            #
            #
			foreach ($SQLitem in $SQL_Records){
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
                    #
                 if ( -not ([string]::IsNullOrEmpty($File))){      
                   foreach ($SPListitem in $SPlistItems) {
                    #
                    $SPitemName = $SPListitem.FieldValues.FileLeafRef
                    $SPitemID = $SPListitem.FieldValues.ID
                    $SPitemProjectCode = $SPListitem.FieldValues.EDC_x0020_Project_x0020_ID
                    # Determin IDs by matching SP list item name to Excel file name from SQL
                 if ( $SPitemName -eq $File ) {
                    #
                    # check
                    Write-Host "Found $File in SP..." -ForegroundColor Green
                    $itemStartTime = (get-date)
                    $itemAllFields = $SPListitem.FieldValues.ID
                    Write-Host "  SP list item ID is: $itemAllFields" -ForegroundColor White
                    Write-Host "  Getting info for $Level1ProjectName at: $itemStartTime" -ForegroundColor Yellow
                    #
                    # If set to True: Set item metadata validation and mapping from SQL to SOP
                 if ( $SetFileMetadata -eq $TRUE) { 
                   #
                   if ( -not ([string]::IsNullOrEmpty($File))) {
                   $UpdateFileContentType = Set-PnPListItem -List $Target365Lib -Identity $SPitemID -ContentType "$ListContentType" #-Values @{"Title" = "$ReportNewName"} #-SystemUpdate
                   Write-Host "  ContentType is: $ListContentType " -ForegroundColor White
                   }else{
                   Write-Host "ContentType $ListContentType is not available" -ForegroundColor Red
                   }
                   #Set EDC Division Name * working but returning two values
                   if ( -not ([string]::IsNullOrEmpty($File))) {
                        if ( -not ([string]::IsNullOrEmpty($DivisionName))) {
                        Write-Host "  EDC Division is: $DivisionName" -ForegroundColor White
                        }else{
                                Write-Host "EDC Division is not Avalilable: $DivisionName" -ForegroundColor Red
                        }
                        Write-Host "  Divison Leader is: $DivisionLeaderEmailAddress" -ForegroundColor White
                        Write-Host "  Division Financial Manager is: $DFMEmailAddress" -ForegroundColor White
                        if ( -not ([string]::IsNullOrEmpty($PortfolioName))) {
                            if ($EdcPortfolios -contains $PortfolioName) {
                                Write-Host "  EDC Portfolio is: $PortfolioName" -ForegroundColor White
                                $PortfolioTermPath = $PortfolioTermBase, $PortfolioName -join ""
                            }else{
                                Write-Host "  EDC Portfolio $PortfolioName is not Avalilable! It must be created first in Termstore " -ForegroundColor Red        
                            }
                        }else{
                            if ($DivisionName -contains "IDD") {
                                $PortfolioName = $DivisionName
                                Write-Host "  EDC Portfolio is: $PortfolioName" -ForegroundColor White
                                $PortfolioTermPath = $PortfolioTermBase, $PortfolioName -join ""
                            }else{
                                Write-Host "  EDC Portfolio $PortfolioName is not Avalilable! It must be created first in Termstore " -ForegroundColor Red
                            }
                        }
                        Write-Host "  EDC Portfolio is: $PortfolioName" -ForegroundColor White
                        Write-Host "  Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                        Write-Host "  EDC Project Name is: $Level1ProjectName" -ForegroundColor White
                        Write-Host "  Project Leader is: $PDEmailAdress" -ForegroundColor White
                        Write-Host "  Project ID is: $ProjectID" -ForegroundColor White
                        Write-Host "  Fiscal Year is: $FiscalYear" -ForegroundColor White
                        Write-Host "  Project report period is: $Period" -ForegroundColor White
                        Write-Host "  Project Published ID is: $PublishedID" -ForegroundColor White

                        $UpdateMeta = Set-PnPListItem -List $Target365Lib -Identity $SPitemID -Values @{"EDC_x0020_ReportType"="$ReportTypePath";"EDC_x0020_Division"="$DivisionTermPath";"EDC_x0020_Portfolio"="$PortfolioTermPath";"EDC_x0020_Project"="$ProjectNameTermPath";"EDC_x0020_Project_x0020_ID"="$ProjectID";"EDC_x0020_Fiscal_x0020_Year"="$FiscalYear";"EDC_x0020_Report_x0020_Perios"="$Period";"EDC_x0020_Report_x0020_Published_x0020_ID"="$PublishedID";"EDC_x0020_Project_x0020_Director"="$PDLoginName";"EDC_x0020_Portfolio_x0020_Leader"="$PortfolioLeaderLoginName";"EDC_x0020_Division_x0020_Leader"="$DivisionLeaderLoginName";"EDC_x0020_Division_x0020_Financial_x0020_Manager"="$DFMLoginName"} #-SystemUpdate
                        }else{
                                Write-Host "EDC Division is not Avalilable: $DivisionName" -ForegroundColor Red
                        }
                  }else{
                    Write-Host "Set Metadata is disabled" -ForegroundColor red
                    }
                    #
                    # Set Permisssions on File in Sharepoint Library
                 if ( $SetFilePermissions -eq $TRUE) {
                    #
                    Write-Host "  Setting permissions... " -ForegroundColor Yellow
                    # Set PD and EDC Leadership Team  access for the item:
                    #
                    $ReportUser = "$PDEmailAdress" # set this to the user email value you want to use.  Value for Prodject director from DB is '$PDEmailAdress'
                    $LeadershipGroup = "Reports-EDC-LeadershipTeam" # Set to SP EDC leadership Team group on 
                    #
                    Write-Host "  Setting Project Director permissions to: $ReportUser ... " -ForegroundColor White
                    Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -User $ReportUser -AddRole $SpPermSet
                    Write-Host "  Setting EDC Leadership Group permissions... " -ForegroundColor White
                    Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $LeadershipGroup -AddRole $SpPermSet
                    #
                    # Set Division Permsissions:
                    #
                 if ( -not ([string]::IsNullOrEmpty($DivisionName))) {
                    if ( $DivisionName -eq "IDD" ){
                       $DivSPgroup = "IDD"
                       }
                    if ( $DivisionName -eq "U.S. DIVISION" ){
                       $DivSPgroup = "USD"
                       }
                    if ( $DivisionName -eq "USD" ){
                       $DivSPgroup = "USD"
                       }

                     $DivisionLeadGroup = "Reports-" + $DivSPgroup + "-DivisionLeads" -join ""
                      Write-Host "  Setting Division Leaders permissions to: $DivisionLeadGroup " -ForegroundColor White
                     Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $DivisionLeadGroup -AddRole $SpPermSet
                   }
                    #
                    # Set Portfolio Permsissions:
                    #
                 if ( -not ([string]::IsNullOrEmpty($PortfolioName))) {
                   
                    if ( $DivSPgroup -eq "USD" ) {
                     $PortfolioLeadGroup = "Reports-" + $DivSPgroup + "-" + $PortfolioName + "-PortfolioLeads" -join ""
                     Write-Host "  Setting Portfolio permissions to: $PortfolioLeadGroup ... " -ForegroundColor White
                     Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $PortfolioLeadGroup -AddRole $SpPermSet
                     }
                    if ( $DivisionName -eq "IDD" ){
                        #  Defing IDD Portfolio Mappings
                        $IDD_Unit1_Portfolio ="Reports-IDD-Unit1-PortfolioLeads"
                        $IDD_Unit2_Portfolio ="Reports-IDD-Unit2-PortfolioLeads"
                        $IDD_Unit3_Portfolio ="Reports-IDD-Unit3-PortfolioLeads"
                        #
                        If ( $PortfolioLeaderEmailAddress -eq "sross@edc.org" ){
                             #Write-Host "Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                             Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $IDD_Unit1_Portfolio -AddRole $SpPermSet
                             Write-Host "  Setting Portfolio permission to: $IDD_Unit1_Portfolio" -ForegroundColor White
                             }
                        If ( $PortfolioLeaderEmailAddress -eq "snogueirasanca@edc.org" ){
                             #Write-Host "Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                             Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $IDD_Unit2_Portfolio -AddRole $SpPermSet
                             Write-Host "  Setting Portfolio permission to: $IDD_Unit2_Portfolio" -ForegroundColor White
                             }
                        If ( $PortfolioLeaderEmailAddress -eq "sjames@edc.org" ){
                             #Write-Host "Portfolio Leader is: $PortfolioLeaderEmailAddress" -ForegroundColor White
                             Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $IDD_Unit3_Portfolio -AddRole $SpPermSet
                             Write-Host "  Setting Portfolio permission to: $IDD_Unit3_Portfolio" -ForegroundColor White
                             }
                      }
                   }
                    #
                    # Set Division Financial Manager Leads Permsissions:
                    <#
                 if ( -not ([string]::IsNullOrEmpty($DivisionName))) {
                     $FinancialLeadGroup = "Reports-" + $DivSPgroup + "-FinancialLeads" -join ""
                     Write-Host "Setting Financial Manager permission to: $FinancialLeadGroup" -ForegroundColor White
                     Set-PnPListItemPermission -List $Target365Lib -Identity $SPitemID -Group $FinancialLeadGroup -AddRole $SpPermSet
                   }
                   #>
                   $itemEndTime = (get-date)
                   Write-Host "Item finished at: $itemEndTime" -ForegroundColor Yellow
                   }else{
                    Write-Host "Set File Permissions is disabled" -ForegroundColor red
                    }
                   }
                 }
					#Save a copy as Imported
                    if ($UploadFiles -eq $TRUE){
					move-item "$WorkingPath\$File" "$WorkingPath\Uploaded\$File" -force
                    }
                    #
                    <# Set Flags on SQL Datbase to show it has been successfully uploaded
                    $SQLConfirmQuery = "UPDATE [DivReporting].[dbo].[Reporting_PublishLog] SET PushedToCloud = 'Y' WHERE PublishedID = $SQLitem.PublishedID"
                    $SQLConfirmItemProcessed = Invoke-SQLcmd -ServerInstance $DB_SERVER -Database $DB_NAME -Query $SQLConfirmQuery -username $DB_UserName -password $DB_Pass # -Credential $DB_Credentia  
                    
                    #>
					#Logging
                    #
					$SucessCount = $SucessCount +1
					$SucessFilesNames += "$File, "
				}
				else{
					#Logging
					$FailCount = $FailCount +1
					$FailedFilesNames += "$File, "
                    Write-Host "$File not found in the working dirctory!  ..." -ForegroundColor Red 
					#IF fail move Working file to failed dir
                  if ($UploadFiles -eq $TRUE){
					move-item "$WorkingPath\$File" "$WorkingPath\Failed\$File" -force
                   } 				
			}
            
            }
        if ($UpdateSPO -eq $TRUE){
            # Dispose of the PnPOnline Session
               Disconnect-PnPOnline
            }
        }
        Write-Host "EDC Financial Reports Sync completed on $(get-date)" -ForegroundColor Green
        Write-Host "..." 
        Write-Host "..." 
        }
	End{ 
        ##########################################################################################################
        # End Gather files and Upload to 0365
        ##########################################################################################################
		#
        ##########################################################################################################
        # Start Logging and Notification
        ##########################################################################################################
        #
		Add-Content $Logfile "-------------------------------------------"
		Add-Content $Logfile "New job started $(get-date)"
		Add-Content $Logfile "Local Path: $WorkingPath"
		Add-Content $Logfile "Network Path: $SourcePath"
		Add-Content $Logfile "Modified Age: $ModifiedAge"
		Add-Content $Logfile "Filter: $TypeFilter"
		Add-Content $Logfile "Local Files Found ($LocalFilesCount): $LocalFilesNames"
		Add-Content $Logfile "Network Files Found ($NetworkFilesCount): $NetworkFilesNames"
		Add-Content $Logfile "Import SUCCESS ($SucessCount): $SucessFilesNames"
		Add-Content $Logfile "Import FAILED ($FailCount): $FailedFilesNames"
		if ($SendEmailLog -eq $TRUE){
			Add-Content $Logfile "Email log was sent"
		}
		else{
		Add-Content $Logfile "Email log was NOT sent"
		}

		#Load Email Variables
		$EmailFrom = "Edc-FinancialReportSync-noreply@edc.org"
		$EmailSubject = "EDC Financial Report Sync - $AllFilesCount Processed"
		If ($AllFilesCount -gt 0){
		$EmailBody = "EDC Financial Report Sync completed on $(get-date). `
`
$AllFilesCount new items(s) found for processing (modified since $ModifiedAge). `
`
$SucessCount items(s) imported sucessfully: $SucessFilesNames `
$FailCount items(s) were NOT imported: $FailedFilesNames `
`
Please see the attached log for full details `
`
Regards, `
`
EDC 365Admin Scripts"
		}
		else{
		$EmailBody = "EDC Financial Reports Sync completed on $(get-date).  `
`
There were no new items found in $SourcePath (modified since $ModifiedAge). `
`
Regards, `
`
EDC 365Admin Scripts" 
		}

		#Send Email Log
		if ($SendEmailLog -eq $TRUE){
			write-host "Sending email log..."
			Send-MailMessage -To $EmailTo -From $EmailFrom -Subject $EmailSubject -SmtpServer $SmtpServer -body $EmailBody -attachment $Logfile
		}
		else{
            write-Host "Send Log is Disabled" -ForegroundColor Red 
            write-Host "Email body that would be sent..." 
			write-host $EmailBody
		}
	}
}
##########################################################################################################
# End Logging and Notification
##########################################################################################################
#Load Arguments and call Function
# $HelpText = @"
# Missing or invalid arguments. Correct syntax is Set-ADPhotos <SourcePath> <Days>

# For example .\Set-ADPhotos.ps1 '\\Server1\sharename' 1
# "@

# if ($args[0] -ne $NULL){
# 	$SourcePath = $args[0]
# }
# else{
# 	write-host $HelpText
# 	exit
# }
# if ($args[1] -ne $NULL){
# 	$Days = $args[1]
# }
# else{
# 	$Days = 1
# }

#REM Set-Reports $SourcePath $Days
Set-Reports '\\COSTPOINT-DB2\DivReporting\PDMonthlyReports\Reports' 30
