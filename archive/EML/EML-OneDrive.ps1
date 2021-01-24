$url = "https://emlpayments-admin.sharepoint.com/"
Connect-PnPOnline -Url $url -UseWebLogin
$sites = Get-PnPTenantSite -IncludeOneDriveSites
$sites | ogv

