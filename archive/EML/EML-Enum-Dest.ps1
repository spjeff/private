param($team)

#region Imports
Import-Module "SharePointPnPPowerShellOnline" -WarningAction SilentlyContinue | Out-Null
#endregion Imports

#region Variables
$user = "jjones@emlpayments.com"
$pw = "K#92srpB7"
$url = "https://emlpayments-admin.sharepoint.com"
#endregion Variables

#region Credentials
[SecureString]$secpw = ConvertTo-SecureString $pw -AsPlainText -Force
[System.Management.Automation.PSCredential]$global:cred = New-Object System.Management.Automation.PSCredential($user, $secpw)
Connect-PnPOnline -Url $url -Credentials $global:cred
#endregion Credentials


$teamURLs = @("https://emlpayments.sharepoint.com/sites/AIR-A",
    "https://emlpayments.sharepoint.com/sites/AIR-E",
    "https://emlpayments.sharepoint.com/sites/AIR-G",
    "https://emlpayments.sharepoint.com/sites/AIR-U",
    "https://emlpayments.sharepoint.com/sites/AM-A",
    "https://emlpayments.sharepoint.com/sites/AM-E",
    "https://emlpayments.sharepoint.com/sites/AM-G",
    "https://emlpayments.sharepoint.com/sites/AM-U",
    # "https://emlpayments.sharepoint.com/sites/BN-A",
    # "https://emlpayments.sharepoint.com/sites/BN-E",
    # "https://emlpayments.sharepoint.com/sites/BN-G",
    # "https://emlpayments.sharepoint.com/sites/BN-U",
    # "https://emlpayments.sharepoint.com/sites/msteams-A",
    # "https://emlpayments.sharepoint.com/sites/msteams-E",
    # "https://emlpayments.sharepoint.com/sites/msteams-G",
    # "https://emlpayments.sharepoint.com/sites/msteams-U",
    "https://emlpayments.sharepoint.com/sites/CFRP-A",
    "https://emlpayments.sharepoint.com/sites/CFRP-E",
    "https://emlpayments.sharepoint.com/sites/CFRP-G",
    "https://emlpayments.sharepoint.com/sites/CFRP-U",
    # "https://emlpayments.sharepoint.com/sites/CP-A",
    # "https://emlpayments.sharepoint.com/sites/CP-E",
    # "https://emlpayments.sharepoint.com/sites/CP-G",
    # "https://emlpayments.sharepoint.com/sites/CP-U",
    "https://emlpayments.sharepoint.com/sites/CS-A",
    "https://emlpayments.sharepoint.com/sites/CS-E",
    "https://emlpayments.sharepoint.com/sites/CS-G",
    "https://emlpayments.sharepoint.com/sites/CS-U",
    # "https://emlpayments.sharepoint.com/sites/CSR-A",
    # "https://emlpayments.sharepoint.com/sites/CSR-E",
    # "https://emlpayments.sharepoint.com/sites/CSR-G",
    # "https://emlpayments.sharepoint.com/sites/CSR-U",
    "https://emlpayments.sharepoint.com/sites/CSS-A",
    "https://emlpayments.sharepoint.com/sites/CSS-E",
    "https://emlpayments.sharepoint.com/sites/CSS-G",
    "https://emlpayments.sharepoint.com/sites/CSS-U",
    "https://emlpayments.sharepoint.com/sites/msteams850-A",
    "https://emlpayments.sharepoint.com/sites/msteams850-E",
    "https://emlpayments.sharepoint.com/sites/msteams850-G",
    "https://emlpayments.sharepoint.com/sites/msteams850-U",
    "https://emlpayments.sharepoint.com/sites/EC-A",
    "https://emlpayments.sharepoint.com/sites/EC-E",
    "https://emlpayments.sharepoint.com/sites/EC-G",
    "https://emlpayments.sharepoint.com/sites/EC-U",
    "https://emlpayments.sharepoint.com/sites/ET-A",
    "https://emlpayments.sharepoint.com/sites/ET-E",
    "https://emlpayments.sharepoint.com/sites/ET-G",
    "https://emlpayments.sharepoint.com/sites/ET-U",
    # "https://emlpayments.sharepoint.com/sites/msteams721-A",
    # "https://emlpayments.sharepoint.com/sites/msteams721-E",
    # "https://emlpayments.sharepoint.com/sites/msteams721-G",
    # "https://emlpayments.sharepoint.com/sites/msteams721-U",
    "https://emlpayments.sharepoint.com/sites/GC-A",
    "https://emlpayments.sharepoint.com/sites/GC-E",
    "https://emlpayments.sharepoint.com/sites/GC-G",
    "https://emlpayments.sharepoint.com/sites/GC-U",
    # "https://emlpayments.sharepoint.com/sites/HR-A",
    # "https://emlpayments.sharepoint.com/sites/HR-E",
    # "https://emlpayments.sharepoint.com/sites/HR-G",
    # "https://emlpayments.sharepoint.com/sites/HR-U",
    "https://emlpayments.sharepoint.com/sites/msteams349-A",
    "https://emlpayments.sharepoint.com/sites/msteams349-E",
    "https://emlpayments.sharepoint.com/sites/msteams349-G",
    "https://emlpayments.sharepoint.com/sites/msteams349-U",
    # "https://emlpayments.sharepoint.com/sites/msteams252-A",
    # "https://emlpayments.sharepoint.com/sites/msteams252-E",
    # "https://emlpayments.sharepoint.com/sites/msteams252-G",
    # "https://emlpayments.sharepoint.com/sites/msteams252-U",
    # "https://emlpayments.sharepoint.com/sites/msteams663-A",
    # "https://emlpayments.sharepoint.com/sites/msteams663-E",
    # "https://emlpayments.sharepoint.com/sites/msteams663-G",
    # "https://emlpayments.sharepoint.com/sites/msteams663-U",
    "https://emlpayments.sharepoint.com/sites/msteams368-A",
    "https://emlpayments.sharepoint.com/sites/msteams368-E",
    "https://emlpayments.sharepoint.com/sites/msteams368-G",
    "https://emlpayments.sharepoint.com/sites/msteams368-U",
    # "https://emlpayments.sharepoint.com/sites/PM354-A",
    # "https://emlpayments.sharepoint.com/sites/PM354-E",
    # "https://emlpayments.sharepoint.com/sites/PM354-G",
    # "https://emlpayments.sharepoint.com/sites/PM354-U",
    "https://emlpayments.sharepoint.com/sites/msteams171-A",
    "https://emlpayments.sharepoint.com/sites/msteams171-E",
    "https://emlpayments.sharepoint.com/sites/msteams171-G",
    "https://emlpayments.sharepoint.com/sites/msteams171-U",
    # "https://emlpayments.sharepoint.com/sites/TD-A",
    # "https://emlpayments.sharepoint.com/sites/TD-E",
    # "https://emlpayments.sharepoint.com/sites/TD-G",
    # "https://emlpayments.sharepoint.com/sites/TD-U",
    "https://emlpayments.sharepoint.com/sites/TI-A",
    "https://emlpayments.sharepoint.com/sites/TI-E",
    "https://emlpayments.sharepoint.com/sites/TI-G",
    "https://emlpayments.sharepoint.com/sites/TI-U",
    "https://emlpayments.sharepoint.com/sites/TIS-A",
    "https://emlpayments.sharepoint.com/sites/TIS-E",
    "https://emlpayments.sharepoint.com/sites/TIS-G",
    "https://emlpayments.sharepoint.com/sites/TIS-U")

function ProcessSite($surl) {
    Write-Host $surl -Fore Yellow
    Connect-PnPOnline -Url $surl -Credentials $global:cred
    $web = $null
    $web = Get-PnpWeb
    if ($web) {
        $l = Get-pnpList "Documents"
        if ($l) {


            # from https://veronicageek.com/office-365/sharepoint-online/retrieve-files-with-a-specific-name-in-a-sharepoint-online-site-using-powershell-pnp/2019/06/
            # from https://veronicageek.com/sharepoint/sharepoint-2013/get-nested-folders-files-count-folder-size-and-more-in-spo-document-libraries-using-powershell-pnp/2019/09/
            # from https://www.sharepointdiary.com/2019/03/fix-get-pnplistitem-attempted-operation-prohibited-because-it-exceeds-list-view-threshold-enforced-by-administrator.html

            $files = Get-PnPListItem -List $l -Fields "FileRef", "File_x0020_Type", "FileLeafRef" -PageSize 5000
            foreach ($file in $files) {
                $hash = @{
                    "SiteURL"         = $surl
                    "FileRef"         = $file["FileRef"]
                    "File_x0020_Type" = $file["File_x0020_Type"]
                    "FileLeafRef"     = $file["FileLeafRef"]
                }
                $row = New-Object -Type PSObject -Property $hash
                $global:coll += $row
            }



        }
        
    }
}

function Main() {
    $global:coll = @()
    # Single team
    if ($team) {
        ProcessSite "https://emlpayments.sharepoint.com/sites/$team-A"
        ProcessSite "https://emlpayments.sharepoint.com/sites/$team-E"
        ProcessSite "https://emlpayments.sharepoint.com/sites/$team-U"
        ProcessSite "https://emlpayments.sharepoint.com/sites/$team-G"
    }

    # Misc small
    if (!$team) {
        foreach ($t in $teamURLs) {
            ProcessSite $t
        }
        $global:coll | Export-Csv "EML-Enum-Dest.csv" -NoTypeInformation -Force
        Start-Process .\EML-Enum-Dest.csv
    }

}
Start-Transcript
Main
Stop-Transcript