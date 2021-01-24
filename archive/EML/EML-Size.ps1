#region Imports
Import-Module "SharePointPnPPowerShellOnline" -WarningAction SilentlyContinue | Out-Null
#endregion Imports

#region Variables
#$user   = "jjones@emlpayments.com"
$user = "jjones@storefinancial.com"
#$pw     = "K#92srpB7"
$pw = "Asdf.123"
$url    = "https://emlpayments-admin.sharepoint.com"
#endregion Variables

#region Credentials
[SecureString]$secpw = ConvertTo-SecureString $pw -AsPlainText -Force
[System.Management.Automation.PSCredential]$global:cred = New-Object System.Management.Automation.PSCredential($user, $secpw)
Connect-PnPOnline -Url $url -Credentials $global:cred
#endregion Credentials

function ProcessList($s, $title) {
    Write-Host $s.Url
    Connect-PnPOnline -Url $s.Url -Credentials $global:cred
    $web = $null
    $web = Get-PnpWeb
    if ($web) {
        $l = Get-pnpList "Shared Documents"
        if ($l) {
            $hash = @{
                "WebTitle"      = $s.Title
                "ListTitle"     = $l.Title
                "URL"           = $s.Url
                "ItemCount"     = $l.ItemCount
                "GB"            = $s.StorageUsage
            }
        }
        $row = New-Object -Type PSObject -Property $hash
        $global:coll += $row
    }
}

function Main() {
    $global:coll = @()
    $sites = Get-PnPTenantSite |? {$_.Template -eq "TEAMCHANNEL#0"}
    $sites | Export-Csv "EML-Sites.csv" -NoTypeInformation -Force
    foreach ($s in $sites) {
        ProcessList $s "Documents"
    }
    $global:coll | Export-Csv "EML-Size.csv" -NoTypeInformation -Force
    Start-Process .\EML-Size.csv
}
Start-Transcript
Main
Stop-Transcript