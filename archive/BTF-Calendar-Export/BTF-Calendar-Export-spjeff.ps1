<#
.DESCRIPTION
	Download O365 calendar event data into SQL azure for keyword pattern matching analysis with start/end dates and keyword search.

.NOTES
	File Name:  BTF-Calendar-Export.ps1
    Author   :  Jeff Jones  <jeff.jones@butterflytech.net>
                Galen Keene <galen.keene@butterflytech.net>
	Version  :  1.1
    Modified :  2020-05-17

    https://docs.microsoft.com/en-us/previous-versions/office/office-365-api/api/version-2.0/complex-types-for-mail-contacts-calendar
#>



# Config
$clientID		= "2c27cd41-f13e-4de2-9a23-24f7076357bc"
$tenantName		= "spjeff.com"
$ClientSecret	= "Gg-bBjO9~3Wuf~l8so.1GyJ-qAk684mc3z"
$Username		= "spjeff@spjeff.com"
$Password		= "MyScbTG90IhOOQnTCnK"

$sqlInst        = "btf-events.database.windows.net"
$sqlDb    	    = "btf-events"
$sqlUser        = "btf-events-sa"
$sqlPass        = "piQK6rasRWF09JzAp8Ev"

function AuthO365() {
    # Auth call
    $ReqTokenBody = @{
        Grant_Type    = "Password"
        client_Id     = $clientID
        Client_Secret = $clientSecret
        Username      = $Username
        Password      = $Password
        Scope         = "https://graph.microsoft.com/.default"
    } 
    return Invoke-RestMethod -Uri "https://login.microsoftonline.com/$TenantName/oauth2/v2.0/token" -Method "POST" -Body $ReqTokenBody
}

function readCalendar($upn, $token) {
    # Loop all users
    $api = "https://graph.microsoft.com/v1.0/users"
    $users = $null
    $users = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $api -Method "GET" -ContentType "application/json"
    foreach ($u in $users.value) {

        # https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location
        # All events for user
        $upn = $u.userPrincipalName
        $api = "https://graph.microsoft.com/v1.0/users/$upn/events?`$top=999&`$filter=start/dateTime ge '2020-03-01' and end/dateTime le '2020-03-05'"
        $events = $null
        $events = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $api -Method "GET" -ContentType "application/json"

        do {
            foreach ($r in $events.value) {
                # Attendees
                $attend = ""
                $r.attendees | % { $attend += $_.type + '-' + $_.status.response + '-' + $_.emailclsAddress.address + '-' + $_.emailAddress.name + ',' }

                # SQL
                $id             = $r.id
                $subject        = $r.subject.replace("'", "''")
                $bodyPreview    = $r.bodyPreview.replace("'", "''")
                $attend         = $attend.replace("'", "''")
                $start          = [datetime]$r.start.dateTime
                $end            = [datetime]$r.end.dateTime
                $attendeesCount = $r.attendees.count
                $organizername      = $r.organizer.emailAddress.name
                $organizeraddress   = $r.organizer.emailAddress.address
                $tsql           = "INSERT INTO [Events] VALUES ('$id','$subject','$bodyPreview','$start','$end','$attend',$attendeesCount,'$organizername','$organizeraddress')"
                $tsql
                Invoke-Sqlcmd -Database $sqlDb -ServerInstance $sqlInst -Username $sqlUSer -Password $sqlPass -Query $tsql
            }
            if ($events.'@Odata.NextLink') {
                $events = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $events.'@Odata.NextLink' -Method "GET" -ContentType "application/json"
            }
        }  while ($events.'@Odata.NextLink')
    }
}

function processUsers($token) {
    # $users = Get-AADUsers
    # foreach ($user in $users) {
    # $upn = $user.UserPrincipalName
    $upn = "me"
    readCalendar $upn $token
    # }
}
function CreateSQLTable() {
    $tsql = "CREATE TABLE [dbo].[Events]( [id] [varchar](8000) NULL, [subject] [varchar](8000) NULL, [bodyPreview] [varchar](8000) NULL, [start] [datetime] NULL, [end] [datetime] NULL, [attend] [varchar](8000) NULL, [attendeesCount] [int] NULL, [organizername] [varchar](8000) NULL, [organizeraddress] [varchar](8000) NULL ) ON [PRIMARY]"
    Invoke-Sqlcmd -Database $sqlDb -ServerInstance $sqlInst -Username $sqlUSer -Password $sqlPass -Query $tsql
}

function Main () {
    $prefix = $MyInvocation.MyCommand.Name
    $stamp = (Get-Date).tostring().replace("/", "-").replace(":", "-")
    Start-Transcript "$PSScriptRoot\log\DEV-$prefix-$stamp.log"

    # Prepare SQL table
    CreateSQLTable

    # Calendar data
    $global:userCount = 0
    $token = AuthO365
    processUsers $token
    Write-Host "TOTAL SCANNED:  $global:userCount"
    Stop-Transcript

    # Log Cleanup
    $threshold = (Get-Date).AddDays(-30)
    Get-ChildItem "$PSScriptRoot\log" | ? { $_.LastWriteTime -lt $threshold } | Remove-Item -Force -Confirm:$false
}
Main