# Config
$username = "conjjones@morleybuilders.com"
$password = "9445..FdomGoal"

# Azure App Registration
# https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Overview/quickStartType//sourceType/Microsoft_AAD_IAM/appId/cbc8f838-9be5-4448-805e-9e7f910ce1f7/objectId/21e712f4-0962-4c02-8b21-aca613f20b49/isMSAApp//defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated/true
$TenantName   = "449a3779-6d21-40ae-9236-6057401bcf35"
$clientID     = "cbc8f838-9be5-4448-805e-9e7f910ce1f7"
$clientSecret = "MuX7Q~GeGFQs6iV9Sn5J14J74MQ583Gm67YSW"


function AuthO365() {
    # Auth call
    # $ReqTokenBody = @{
    #     Grant_Type    = "client_credentials"
    #     client_Id     = $clientID
    #     Client_Secret = $clientSecret
    #     Scope         = "https://graph.microsoft.com/.default"
    # } 
    $ReqTokenBody = @{
        Grant_Type    = "password"
        username      = $username
        password      = $password
        # Scope         = "https://graph.microsoft.com/.default"
        client_Id     = $clientID
        Client_Secret = $clientSecret
        scope         = "Calendar.Read"
    } 
    return Invoke-RestMethod -Uri "https://login.microsoftonline.com/$TenantName/oauth2/v2.0/token" -Method "POST" -Body $ReqTokenBody
}


function Main () {
    $token = AuthO365
    Write-Host $token -Fore "Green"

    # All events for user
    $startDate = (Get-Date).ToString("yyyy-MM-dd")
    $api = "https://graph.microsoft.com/v1.0/users/me/events?`$top=999&`$filter=start/dateTime ge '$startDate'"
    Write-Host $api -ForegroundColor "Yellow"
    $events = $null
    $events = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $api -Method "GET" -ContentType "application/json"
    $events | ft -a

    # Insert SQL Azure
    #TBD
}
Main
