Install-Module SharePointPnPPowerShellOnline -Force
Import-Module SharePointPnPPowerShellOnline

$adminUrl = "https://educationdevelopmentcenter-admin.sharepoint.com/"
Write-Host "Login"
Connect-PnPOnline -Url $adminUrl -UseWebLogin

$sites = Get-PnPTenantSite
$sites | Format-Table -AutoSize
$sites | Export-Csv "EDC-SPO-Classic-Modern.csv"

