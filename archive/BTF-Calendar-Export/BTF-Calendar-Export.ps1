<#
.DESCRIPTION
	Download O365 calendar event data into SQL azure for keyword pattern matching analysis with start/end dates and keyword search.

.NOTES
	File Name:  BTF-Calendar-Export.ps1
    Author   :  Jeff Jones  <jeff.jones@butterflytech.net>
                Galen Keene <galen.keene@butterflytech.net>
	Version  :  1.2
    Modified :  2020-06-14

    https://docs.microsoft.com/en-us/previous-versions/office/office-365-api/api/version-2.0/complex-types-for-mail-contacts-calendar
#>


Import-Module AzureAD

# Config.  Replace when rung "BTF-Calendar-Setup.ps1"
# $clientID		= "token:appId"
# $tenantName		= "token:tenantId"
# $ClientSecret	= "token:appSecret"
$clientID = "f356be36-ed44-4d33-83fc-ea1dad935067"
$tenantName = "4e2929f0-010c-4115-ac50-301dbd17936a"
$ClientSecret	= "mYhwYW8O3n_.v~~RdDrrOAio8rb9_NIOg."

# NEED TO REPLACE VALUES WITH CLIENT OFFICE 365 TENANT
# $Username		= "user@company.com"
# $Password		= "password"
# $sqlInst      = "---SQL-instance---.database.windows.net"
# $sqlDb    	= "---SQL-database---"
# $sqlUser      = "---SQL-user---"
# $sqlPass      = "---SQL-password---"
$Username = "jeff.jones@butterflytech.net"
$Password = "JDQGoHO3NPC6i1O"
$sqlInst = "btf-events.database.windows.net"
$sqlDb = "btf-events"
$sqlUser = "btf-events-sa"
$sqlPass = "piQK6rasRWF09JzAp8Ev"

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

function readCalendar($token) {
    # Loop all users
    $api = "https://graph.microsoft.com/v1.0/users"
    $users = $null
    $users = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $api -Method "GET" -ContentType "application/json"
    foreach ($u in $users.value) {

        # https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location
        # All events for user
        $upn = $u.userPrincipalName
        $api = "https://graph.microsoft.com/v1.0/users/$upn/events?`$top=999&`$filter=start/dateTime ge '2020-03-01' and end/dateTime le '2020-06-05'"
        $events = $null
        $events = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $api -Method "GET" -ContentType "application/json"

        if ($upn -like '*#EXT#*') {
            do {
            foreach ($r in $events.value) {
                # Default
                $totalExemptHours = 0
                $totalNonExemptHours = 0

                # Attendees
                $attend = ""
                $r.attendees | % { $attend += $_.type + '-' + $_.status.response + '-' + $_.emailclsAddress.address + '-' + $_.emailAddress.name + ',' }

                # Duration (Hours)
                $hours = 0
                $hours = [datetime]$r.end.dateTime - [datetime]$r.start.dateTime

                # Exempt Totals
                $r.attendees | % { 
                    # Check if current user in ExemptEmployees SQL table
                    $found = $null
                    $found = $global:ExemptEmployees | ? { $_.address -eq $upn }
                    if ($found) {
                        $totalExemptHours += $hours
                    }
                    else {
                        $totalNonExemptHours += $hours
                    }
                }
                

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

                $tsql = "INSERT INTO [Events] VALUES ('$id','$subject','$bodyPreview','$start','$end','$attend',$attendeesCount,'$organizername','$organizeraddress','$upn',$totalExemptHours,$totalNonExemptHours)"
                $tsql

                # INSERT
                Invoke-Sqlcmd -Database $sqlDb -ServerInstance $sqlInst -Username $sqlUSer -Password $sqlPass -Query $tsql
            }
            if ($events.'@Odata.NextLink') {
                $events = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $events.'@Odata.NextLink' -Method "GET" -ContentType "application/json"
            }
            }  while ($events.'@Odata.NextLink')
        }
    }

}

function readExempt() {
    $tsql = "SELECT * FROM [dbo].[ExemptEmployees]"
    $global:ExemptEmployees = Invoke-Sqlcmd -Database $sqlDb -ServerInstance $sqlInst -Username $sqlUSer -Password $sqlPass -Query $tsql
}
function CreateSQLTable() {
    $tsql = "CREATE TABLE [dbo].[Events]( [id] [varchar](8000) NULL, [subject] [varchar](8000) NULL, [bodyPreview] [varchar](8000) NULL, [start] [datetime] NULL, [end] [datetime] NULL, [attend] [varchar](8000) NULL, [attendeesCount] [int] NULL, [organizername] [varchar](8000) NULL, [organizeraddress] [varchar](8000) NULL ) ON [PRIMARY]"
    Invoke-Sqlcmd -Database $sqlDb -ServerInstance $sqlInst -Username $sqlUSer -Password $sqlPass -Query $tsql -ErrorAction SilentlyContinue | Out-Null
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
    readExempt
    readCalendar $token
    Write-Host "TOTAL SCANNED:  $global:userCount"
    Stop-Transcript

    # Log Cleanup
    $threshold = (Get-Date).AddDays(-30)
    Get-ChildItem "$PSScriptRoot\log" | ? { $_.LastWriteTime -lt $threshold } | Remove-Item -Force -Confirm:$false
}
Main