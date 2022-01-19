# Last Updated 11-23-2021

# Config
$TenantName = "0a9449ca-3619-4fca-8644-bdd67d0c8ca6"

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
    Invoke-WebRequest -Uri $uri -Method "GET" -ContentType "application/json; charset=utf-8" -Headers @{"key" = "VWco7wDsB#RXIn7Dnu(LIjE55Nv43i_UVHBU5vYYRNln" } -UseBasicParsing
}
function CleanString($before, $crlf) {
    $temp = $before -replace '[\u201C-\u201D]+', ''
    $temp = $temp.replace('â€œ','')
    $temp = $temp.replace('â€','')
    $temp = $temp.replace('"','\"')
    if ($crlf) {
        $temp = $temp.replace("`r`n", "")
    }
    $temp = $temp.Trim()
    return $temp
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

        
        $match = $global:events | ? { $_.location.displayName -eq $Location }
        $Subject
        if ($match) {
            $found = $true
        }

        # Timezone offset (-5 summer DST enabled / -6 winter DST disabled)
        # https://www.tutorialspoint.com/how-to-check-if-the-date-is-adjusted-by-daylight-saving-time-using-powershell
        if ((Get-Date).IsDaylightSavingTime()) {
            # Winter
            $cst = -5
        } else {
            # Summer
            $cst = -6
        }
        
        $StartTime = (get-date $Start).AddHours($cst)
        $EndTime = (get-date $End).AddHours($cst)

        # Add if don't already have
        if (!$found) {
            "CREATE  $Subject"

            # Color Coding
            switch -wildcard ($pc) {
                "USCHI*" { $categories = 'DNT'; }
                "WSTP*" { $categories = 'Yellow category'; }
                "WAZ*" { $categories = 'Yellow category'; }
                "IOS*" { $categories = 'Blue category'; }
                "NGV*" { $categories = 'NGC'; }
                "ITE*" { $categories = 'NGC'; }
                "10-*" { $categories = 'WGU'; }
                "W10-*" { $categories = 'BLK'; }
                "WXLT*" { $categories = 'FMB'; }
            }
            
            # JSON body
            $StartTimeStr = $StartTime.ToString("yyyy-MM-ddTHH:mm:ss")
            $EndTimeStr = $EndTime.ToString("yyyy-MM-ddTHH:mm:ss")
            $Subject = CleanString $Subject $true
            $Body = CleanString $Body

            # from https://stackoverflow.com/questions/44597175/creating-a-json-string-powershell-object
            $obj = [ordered]@{
                subject    = $Subject
                body       = @{
                    content = $Body
                }
                start      = @{
                    dateTime = $StartTimeStr
                    timeZone = "Central Standard Time"
                }
                end        = @{
                    dateTime = $EndTimeStr
                    timeZone = "Central Standard Time"
                }
                location   = @{
                    displayName = $Location
                }
                #categories = @($categories)
            }

            # Optional cateogry
            if ($categories) {
                $obj.categories = @($categories)
            }

        
            # $json = '{"subject":"' + $Subject + '","body":{"content":"' + $Body + '"},"start":{"dateTime":"' + $StartTimeStr + '",
            # "timeZone":"Central Standard Time"},"end":{"dateTime":"' + $EndTimeStr + '","timeZone":"Central Standard Time"},
            # "location":{"displayName":"' + $Location + '"} ,"categories":[' + $categories + ']}';
            $json = $obj | ConvertTo-Json -Depth 10
            $json | Out-File "json.txt" -Encoding UTF8
            $json8 = (Get-Content "json.txt").replace("\n","")

            # MS Graph API Call
            $apiroot
            # try {
            $result = Invoke-RestMethod -Headers @{Authorization = "Bearer $($token.access_token)";Host="graph.microsoft.com";"Content-Type"= "application/json" } -Uri $apiroot -Method "POST" -Body $json8 
                $result
            # } catch {
            #     "ERROR"
            # } 
            #-Proxy "http://localhost:8888"
            
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
    $today = (Get-Date).AddDays(-2).ToString("yyyy-MM-dd")
    $apiget = $apiroot + "?`$top=999&`$filter=start/dateTime ge '" + $today + "'&`$select=subject,body,bodyPreview,organizer,attendees,start,end,location,categories"
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