# Config
# Tenant = "SPJEFF"
$TenantName     = "0a9449ca-3619-4fca-8644-bdd67d0c8ca6"

# Azure Credential
# $cred = Get-AutomationPSCredential "SPJEFF-SPO"
# $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($cred.Password)
# $UnsecurePassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
# $clientID      = $cred.UserName
# $clientSecret  = $UnsecurePassword

$clientID = "cb7a9679-fce9-4bce-8240-72add1e7ee0b"
$clientSecret = "J_86JyE5IGD~3hIOIR4_BCSVurOYF6i.i2"

# from https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/CallAnAPI/appId/cb7a9679-fce9-4bce-8240-72add1e7ee0b/objectId/57d31dd1-73f3-46d4-bd03-795462eeb293/isMSAApp//defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated/true
function AuthO365() {
    # Auth call
    $ReqTokenBody = @{
        grant_type    = "client_credentials"
        client_id     = $clientID
        client_secret = $clientSecret
        scope         = "https://graph.microsoft.com/.default"
    } 
    return Invoke-RestMethod -Uri "https://login.microsoftonline.com/$TenantName/oauth2/v2.0/token" -ContentType "application/x-www-form-urlencoded" -Method "POST" -Body $ReqTokenBody
}
Function Get-CloudEvents() {
    $dns = "https://msupdates5.azurewebsites.net"
    #REM $dns = "http://localhost:2069"
    $uri = "$dns" + "/api/events"
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $uri -Method "GET" -ContentType "application/json; charset=utf-8" -Headers @{"key"="VWco7wDsB#RXIn7Dnu(LIjE55Nv43i_UVHBU5vYYRNln"} -UseBasicParsing
}
function CleanString($before) {
    return $before -replace '[\u201C-\u201D]+', ''
}
function Add-Appointment() {
    [CmdletBinding()]
    param (
        [parameter(Mandatory = $true, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true)]
        $Start, 
        [parameter(Mandatory = $true, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true)]
        $End, 
        [parameter(Mandatory = $true, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true)]
        $Subject,
        $Body,
        $Location,
        $pc
    )

    # Match event
    $found = $false
    $match = $null
    "MATCH $($global:events.Count) --$Location-- "
    if ($global:events.Count -gt 0) {

        
        $match = $global:events |? {$_.location.displayName -eq $Location}
        $Subject
        if ($match) {
            $found = $true
        }

        # Timezone offset
        $cst = -6
        $StartTime = (get-date $Start).AddHours($cst)
        $EndTime = (get-date $End).AddHours($cst)

        # Add if don't already have
        if (!$found) {
            "CREATE  $Subject"

            # Color Coding
            switch ($pc) {
                "USCHIJEFFREJON3" {$categories = '"DNT"';}
                "WSTP-R90SR6KH-L" {$categories = '"Yellow category"';}
                "IOSLTDENJJONES" {$categories = '"Blue category"';}
            }
            
            # JSON body
            $StartTimeStr = $StartTime.ToString("yyyy-MM-ddTHH:mm:ss")
            $EndTimeStr = $EndTime.ToString("yyyy-MM-ddTHH:mm:ss")
            $Subject = CleanString $Subject
            $Body = CleanString $Body
            $json = '{"subject":"' + $Subject + '","body":{"content":"' + $Body + '"},"start":{"dateTime":"'+$StartTimeStr+'","timeZone":"Central Standard Time"},"end":{"dateTime":"'+$EndTimeStr+'","timeZone":"Central Standard Time"},"location":{"displayName":"'+$Location+'"} ,"categories":['+$categories+']}';

            # MS Graph API Call
            $apiroot
            $result = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $apiroot -Method "POST" -ContentType "application/json" -Body $json -UseBasicParsing
            $result
        }
    }

}

function Main() {

    # Read database
    $resp = Get-CloudEvents
    $rows = ConvertFrom-Json $resp.Content
    # $rows | ft -a
    "SOURCE=$($rows.count)"

    # Read local events
    $token = AuthO365
    $apiroot = "https://graph.microsoft.com/v1.0/users/spjeff@spjeff.com/calendar/events"
    $apiget = $apiroot + "?`$top=999&`$filter=start/dateTime ge '2021-01-01'&`$select=subject,body,bodyPreview,organizer,attendees,start,end,location,categories"
    # /events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location'

    # MS Graph API Call
    $apiget
    $result = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)" } -Uri $apiget -Method "GET" -ContentType "application/json" -UseBasicParsing
    $global:events = $result.value

    # Destination
    "DEST=$($global:events.Count)"

    # Create if missing
    foreach ($row in $rows) {
            $dtStartTime = [datetime]$row.Start
            $dtEndTime = [datetime]$row.End
            if ($dtStartTime -gt (Get-Date) -or $dtEndTime -gt (Get-Date)) {
                Add-Appointment -Start $row.Start -End $row.End -Subject $row.Subject.Trim() -location $row.GlobalAppointmentID -Body ("$($row.Location)`r`n$($row.Body)") -pc $row.PC.Trim()
            }
    }



}
Main