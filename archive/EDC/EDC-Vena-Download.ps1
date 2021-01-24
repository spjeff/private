<#
.DESCRIPTION
	Download remote XLS spreadsheets from Office 365 save to local network folder UNC.
	
.NOTES  
	File Name:  EDC-Vena-Download.ps1
	Author   :  Jeff Jones <jjones@cloudproserv.com>
	Author   :  Bob Duncan <bduncan@edc.org>
	Version  :  1.1
	Modified :  2019-04-21
#>


# Config
#region CONFIG
$DestinationPath = "L:\VenaTransfer"
$DestinationPath = "C:\TEMP"

# Config - Office 365
$Target365Web = "https://educationdevelopmentcenter.sharepoint.com/teams/afinternal/technology/DevTech/VenaImplementation/"
$Target365Lib = "DataTransfer/FromVena"
$TenantUserName = "cp365admin@educationdevelopmentcenter.onmicrosoft.com"
$TenantPassword = '~xH~%RWXfJ6{Q&y(' | ConvertTo-SecureString -AsPlainText -Force
$TenantCredentials = New-Object -typename System.Management.Automation.PSCredential -argumentlist $TenantUserName, $TenantPassword
#endregion CONFIG


# Modules
Import-Module SharePointPnPPowerShellOnline -ErrorAction SilentlyContinue | Out-Null


# Logic
function DownloadFiles() {
    $DestinationPath
    # Connect source
    Connect-PnPOnline -Url $Target365Web -Credentials $TenantCredentials
    $folder = Get-PnPFolder -RelativeUrl $Target365Lib
    $folderColl = Get-PnPFolderItem -FolderSiteRelativeUrl $Target365Lib -ItemType File  

    # Confirm folder
    if (!(Test-Path -Path $DestinationPath)) {
        $dest = New-Item $DestinationPath -Type Directory 
    }

    # Loop download
    $total = $folderColl.Count
    for ($i = 0; $i -lt $total; $i++) {
        $file = $folderColl[$i]
        Get-PnPFile -ServerRelativeUrl $file.ServerRelativeUrl -Path $DestinationPath -FileName $file.Name -AsFile
    }
}


# Main
Start-Transcript
$DestinationPath
DownloadFiles
Stop-Transcript