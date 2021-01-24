# Import
Import-Module SharePointPnPPowerShellOnline -ErrorAction SilentlyContinue | Out-Null

# Config
$siteurl = "https://spjeff-admin.sharepoint.com"
$appid = "4aee3837-fe5c-4204-8810-0bad20dc8793"
$appsecret = "jkK/OUgcL2g/qtSbnLyn6uiO2qGtnfvK5nvGc7TB0Zg="

# Connect
$am = New-Object "OfficeDevPnP.Core.AuthenticationManager"
$ctx = $am.GetAppOnlyAuthenticatedContext($siteurl, $appid, $appsecret)
$ctx
