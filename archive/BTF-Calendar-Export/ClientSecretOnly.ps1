# from https://www.thelazyadministrator.com/2019/07/22/connect-and-navigate-the-microsoft-graph-api-with-powershell/

# Config
$tenantName = "butterflytech.net"
$clientId = "f356be36-ed44-4d33-83fc-ea1dad935067"
$clientSecret = "mYhwYW8O3n_.v~~RdDrrOAio8rb9_NIOg."
$eventFilter = "?`$top=999&`$filter=start/dateTime ge '2020-03-01' and end/dateTime le '2020-03-05'"

# Manual Config - SQL Azure
$sqlInst = "btf-events.database.windows.net"
$sqlDb = "btf-events"
$sqlUser = "btf-events-sa"
$sqlPass = "piQK6rasRWF09JzAp8Ev"

function GetToken() {
    $ReqTokenBody = @{
        Grant_Type    = "client_credentials"
        Scope         = "https://graph.microsoft.com/.default"
        client_Id     = $clientID
        Client_Secret = $clientSecret
    } 
    $resp = Invoke-RestMethod -Uri "https://login.microsoftonline.com/$TenantName/oauth2/v2.0/token" -Method "POST" -Body $ReqTokenBody
    $global:token = $resp.access_token
}

function CallGraph($apiUrl) {
    $Data = Invoke-RestMethod -Headers @{Authorization = "Bearer $($global:token)" } -Uri $apiUrl -Method "GET"
    return $Data
}

function Main() {
    # $apiUrl = "https://graph.microsoft.com/v1.0/Users/galen.keene@butterflytech.net/calendar/events"
    # $apiUrl = "https://graph.microsoft.com/v1.0/Users/bruce.jacobson@butterflytech.net/calendar/events"
    # $apiUrl = 'https://graph.microsoft.com/v1.0/Groups/'
    # $apiUrl = 'https://graph.microsoft.com/v1.0/Users/'

    # Access Token
    GetToken

    # Users
    $users = (CallGraph 'https://graph.microsoft.com/v1.0/Users/').Value
    $internalUsers = $users | ? { $_.userPrincipalName -notlike '*#EXT#*' -and $_.mail }
    $users.count
    $internalUsers.count

    # Calendar Events
    foreach ($u in $internalUsers) {
        # Get events for one user
        $upn = $u.userPrincipalName
        $events = CallGraph "https://graph.microsoft.com/v1.0/Users/$upn/calendar/events$eventFilter"

        # Paging loop (999 per HTTP GET)
        do {
            foreach ($r in $events.Value) {
                # Attendees
                $attend = ""
                $r.attendees | % { $attend += $_.type + '-' + $_.status.response + '-' + $_.emailclsAddress.address + '-' + $_.emailAddress.name + ',' }

                # SQL
                $id = $r.id
                $subject = $r.subject.replace("'", "''")
                $bodyPreview = $r.bodyPreview.replace("'", "''")
                $attend = $attend.replace("'", "''")
                $start = [datetime]$r.start.dateTime
                $end = [datetime]$r.end.dateTime
                $attendeesCount = $r.attendees.count
                $organizername = $r.organizer.emailAddress.name
                $organizeraddress = $r.organizer.emailAddress.address
                $tsql = "INSERT INTO [Events] VALUES ('$id','$subject','$bodyPreview','$start','$end','$attend',$attendeesCount,'$organizername','$organizeraddress','$upn')"
                Invoke-Sqlcmd -Database $sqlDb -ServerInstance $sqlInst -Username $sqlUSer -Password $sqlPass -Query $tsql
            }

            # If next page available, HTTP GET to fetch data
            if ($events) {
                if ($events.'@Odata.NextLink') {
                    $events = Invoke-RestMethod -Headers @{Authorization = "Bearer $($global:token)" } -Uri $events.'@Odata.NextLink' -Method "GET" -ContentType "application/json"
                }
            }
            
            # Loop while have next page HTTP GET avaialble
        }  while ($events -and $events.'@Odata.NextLink')
    }
}
Main