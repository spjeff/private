$user = "conjjones@morleybuilders.com"
$pass = "9445..FdomGoal"
$url = "https://morleybuilders.sharepoint.com/"

Connect-PnPOnline -Url $url -Interactive
Get-PnPContext
Get-PnPAppAuthAccessToken

