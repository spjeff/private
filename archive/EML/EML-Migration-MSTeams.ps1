# Import
Import-Module "SharePointPnPPowerShellOnline" -WarningAction SilentlyContinue | Out-Null

# Configure
$user   = "jjones@emlpayments.com"
$pw     = "K#92srpB7"
$url    = "https://emlpayments-admin.sharepoint.com"
[SecureString]$secpw = ConvertTo-SecureString $pw -AsPlainText -Force
[System.Management.Automation.PSCredential]$global:cred = New-Object System.Management.Automation.PSCredential($user, $secpw)
Connect-PnPOnline -Url $url -Credentials $global:cred
$teamURLs = @("https://emlpayments.sharepoint.com/sites/AIR-A",
"https://emlpayments.sharepoint.com/sites/AIR-E",
"https://emlpayments.sharepoint.com/sites/AIR-G",
"https://emlpayments.sharepoint.com/sites/AIR-U",
"https://emlpayments.sharepoint.com/sites/AM-A",
"https://emlpayments.sharepoint.com/sites/AM-E",
"https://emlpayments.sharepoint.com/sites/AM-G",
"https://emlpayments.sharepoint.com/sites/AM-U",
"https://emlpayments.sharepoint.com/sites/BN-A",
"https://emlpayments.sharepoint.com/sites/BN-E",
"https://emlpayments.sharepoint.com/sites/BN-G",
"https://emlpayments.sharepoint.com/sites/BN-U",
"https://emlpayments.sharepoint.com/sites/msteams-A",
"https://emlpayments.sharepoint.com/sites/msteams-E",
"https://emlpayments.sharepoint.com/sites/msteams-G",
"https://emlpayments.sharepoint.com/sites/msteams-U",
"https://emlpayments.sharepoint.com/sites/CFRP-A",
"https://emlpayments.sharepoint.com/sites/CFRP-E",
"https://emlpayments.sharepoint.com/sites/CFRP-G",
"https://emlpayments.sharepoint.com/sites/CFRP-U",
"https://emlpayments.sharepoint.com/sites/CP-A",
"https://emlpayments.sharepoint.com/sites/CP-E",
"https://emlpayments.sharepoint.com/sites/CP-G",
"https://emlpayments.sharepoint.com/sites/CP-U",
"https://emlpayments.sharepoint.com/sites/CS-A",
"https://emlpayments.sharepoint.com/sites/CS-E",
"https://emlpayments.sharepoint.com/sites/CS-G",
"https://emlpayments.sharepoint.com/sites/CS-U",
"https://emlpayments.sharepoint.com/sites/CSR-A",
"https://emlpayments.sharepoint.com/sites/CSR-E",
"https://emlpayments.sharepoint.com/sites/CSR-G",
"https://emlpayments.sharepoint.com/sites/CSR-U",
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
"https://emlpayments.sharepoint.com/sites/msteams721-A",
"https://emlpayments.sharepoint.com/sites/msteams721-E",
"https://emlpayments.sharepoint.com/sites/msteams721-G",
"https://emlpayments.sharepoint.com/sites/msteams721-U",
"https://emlpayments.sharepoint.com/sites/GC-A",
"https://emlpayments.sharepoint.com/sites/GC-E",
"https://emlpayments.sharepoint.com/sites/GC-G",
"https://emlpayments.sharepoint.com/sites/GC-U",
"https://emlpayments.sharepoint.com/sites/HR-A",
"https://emlpayments.sharepoint.com/sites/HR-E",
"https://emlpayments.sharepoint.com/sites/HR-G",
"https://emlpayments.sharepoint.com/sites/HR-U",
"https://emlpayments.sharepoint.com/sites/msteams349-A",
"https://emlpayments.sharepoint.com/sites/msteams349-E",
"https://emlpayments.sharepoint.com/sites/msteams349-G",
"https://emlpayments.sharepoint.com/sites/msteams349-U",
"https://emlpayments.sharepoint.com/sites/msteams252-A",
"https://emlpayments.sharepoint.com/sites/msteams252-E",
"https://emlpayments.sharepoint.com/sites/msteams252-G",
"https://emlpayments.sharepoint.com/sites/msteams252-U",
"https://emlpayments.sharepoint.com/sites/msteams663-A",
"https://emlpayments.sharepoint.com/sites/msteams663-E",
"https://emlpayments.sharepoint.com/sites/msteams663-G",
"https://emlpayments.sharepoint.com/sites/msteams663-U",
"https://emlpayments.sharepoint.com/sites/msteams368-A",
"https://emlpayments.sharepoint.com/sites/msteams368-E",
"https://emlpayments.sharepoint.com/sites/msteams368-G",
"https://emlpayments.sharepoint.com/sites/msteams368-U",
"https://emlpayments.sharepoint.com/sites/PM354-A",
"https://emlpayments.sharepoint.com/sites/PM354-E",
"https://emlpayments.sharepoint.com/sites/PM354-G",
"https://emlpayments.sharepoint.com/sites/PM354-U",
"https://emlpayments.sharepoint.com/sites/msteams171-A",
"https://emlpayments.sharepoint.com/sites/msteams171-E",
"https://emlpayments.sharepoint.com/sites/msteams171-G",
"https://emlpayments.sharepoint.com/sites/msteams171-U",
"https://emlpayments.sharepoint.com/sites/TD-A",
"https://emlpayments.sharepoint.com/sites/TD-E",
"https://emlpayments.sharepoint.com/sites/TD-G",
"https://emlpayments.sharepoint.com/sites/TD-U",
"https://emlpayments.sharepoint.com/sites/TI-A",
"https://emlpayments.sharepoint.com/sites/TI-E",
"https://emlpayments.sharepoint.com/sites/TI-G",
"https://emlpayments.sharepoint.com/sites/TI-U",
"https://emlpayments.sharepoint.com/sites/TIS-A",
"https://emlpayments.sharepoint.com/sites/TIS-E",
"https://emlpayments.sharepoint.com/sites/TIS-G",
"https://emlpayments.sharepoint.com/sites/TIS-U")


function ProcessList($site, $title) {
    Write-Host $site.Url -Fore Yellow
    Connect-PnPOnline -Url $site.Url -Credentials $global:cred
    $ctx = Get-PnPContext
    $web = Get-PNPWeb
    if ($web) {
        $list = Get-PNPList "Shared Documents"
        if ($list) {
            # Get Rootfolder
            $root = $list.RootFolder
            $ctx.Load($root)
            $ctx.ExecuteQuery()
            $rurl = $root.ServerRelativeUrl
            $r = $site.Url.substring($site.Url.length-1,1)
            $folder = Get-PNPFolder -Url "$rurl/$r" -ErrorAction SilentlyContinue

            # Loop Subfolders
            $subfolders = $folder.Folders
            try {
                $ctx.Load($subfolders)
                $ctx.ExecuteQuery()
            } catch {}
            foreach ($sub in $subfolders) {
                # Collect Tags
                $hash = @{
                    "Name"    = $sub.Name
                    "Url"		= $sub.ServerRelativeUrl
                    "ItemCount" = $sub.ItemCount
                }
                $row = New-Object -Type PSObject -Property $hash
                $global:coll += $row
            }
		}
    }
}

function Main() {
    # Loop CSV
    $global:coll = @()
    foreach ($t in $teamURLs) {
        $s = Get-PnPTenantSite $t
        ProcessList $s "Documents"
    }
    # Save to CSV
    $global:coll | Export-Csv "EML-Migration-MSTeams-Report.csv" -NoTypeInformation -Force
}
Main
