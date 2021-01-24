Start-Trascript
"START"
Get-Date

Import-Module SharePointPnPPowerShellOnline


# Config
$url = "https://barberialexlive-admin.sharepoint.com"
$appid = "4c2c2cbd-6cfe-4781-9c54-dfeda4349968"
$appsecret = "2GymIEKHgaM3TP2kCPCN7mIh0XnVwsE33muuq4Y+V0k="
$urlToken = "https://rdt-login-dev.azurewebsites.net/api/LoginWithEmailAndPassword"
$urlTeams = "https://rdt-settings-dev.azurewebsites.net/api/GetTeamsForOneDriveAuth"
$urlPersonal = "https://barberialexlive-my.sharepoint.com/personal"

function ParseJSON() {
    # Input
    $hash = '{EmailAddress: "service@arbwebapps.com",Password: "Lumber123"}'
    $resp = Invoke-WebRequest -Method POST -Uri $urlToken -Body $hash -UseBasicParsing
    $j = ConvertFrom-Json $resp.Content
    $token = $j.Record.Token

    # Headers
    $headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
    $headers.Add("Authorization", $token)
    $resp = Invoke-WebRequest -Method GET -Uri $urlTeams -Headers $headers -UseBasicParsing
    $j = ConvertFrom-Json $resp.Content

    # Loop Webs
    foreach ($row in $j.Record) {
        # Login
        $row
        $prefix = $row.OneDriveEmail.Split("@")[0]
        $prefix

        if ($prefix) {
            $url = $urlPersonal + "/" + $prefix + "_84sales_com"
            $url
            Connect-PnPOnline -Url $url -AppId $appid -AppSecret $appsecret
        
            # Loop Users
            foreach ($u in $row.Users) {
                $web = Get-PnPWeb
                Write-Host "Grant $u"
                Set-PnPWebPermission -Identity $web -User $u -AddRole "Full Control"
            }
        }
    }
}

# Main
ParseJSON


"END"
Get-Date
Stop-Transcript