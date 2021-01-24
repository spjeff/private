# Saved Creds
$cred = Get-AutomationPSCredential -Name "jj"

# Connect
$url = "https://firstmidwest.sharepoint.com"
Connect-PNPOnline $url -Credential $cred
$web = Get-PNPWeb
$web
$l = $web | Get-PNPLists
$l