# Configure
$tenant     = "morleybuilders"
$user       = "conjjones@morleybuilders.com"
$pass       = "9445..FdomGoal"
$url        = "https://morleybuilders.sharepoint.com"

#region Credentials
[SecureString]$SecurePass = ConvertTo-SecureString $pass -AsPlainText -Force
[System.Management.Automation.PSCredential]$PSCredentials = New-Object System.Management.Automation.PSCredential($user, $SecurePass)
$PSCredentials
#endregion Credentials


Connect-PnPOnline -Url $url -Credentials $PSCredentials
Get-PnPContext

$token = Get-PnPAccessToken
$token | fl