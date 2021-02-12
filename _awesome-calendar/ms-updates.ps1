# from https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/retrieving-outlook-calendar-entries
# from https://devblogs.microsoft.com/scripting/hey-scripting-guy-how-can-i-display-my-office-outlook-appointments-without-starting-office-outlook/

Function Get-OutlookCalendar
{
    # Look forward two weeks
    $dte    = Get-Date
	$week   = $dte.AddDays(14)

    # Load the required .NET types
    [Reflection.Assembly]::LoadWithPartialname("Microsoft.Office.Interop.Outlook") | Out-Null
    
    # Outlook object model
    $outlook = New-Object -ComObject "Outlook.Application"

    # Connect to the appropriate location
    $namespace  = $outlook.GetNameSpace("MAPI")
    $Calendar   = [Microsoft.Office.Interop.Outlook.OlDefaultFolders]::olFolderCalendar
    $folder     = $namespace.getDefaultFolder($Calendar)

    # Get calendar items
    $items      = $folder.items
    $items |
    Foreach-Object {
        Write-Progress -activity "Inspecting $($items.count) calendar appointments"  -Status "Processing ..." `
        -PercentComplete ($i/$items.count*100)
        if($_.Subject -ne "b" -AND (($_.Start -ge $dte -AND $_.Start -le $week) -OR ($_.IsRecurring -eq $true -AND ($_.Start -le $week -OR $_.End -ge $dte))))
        {
            $obj = New-Object -TypeName "PSCustomObject" -Property @{
                
                Start=$_.Start;
                StartUTC=$_.StartUTC;
                End=$_.End;
                EndUTC=$_.EndUTC;
                Categories=$_.Categories;
                Subject=$_.Subject;
                Location=$_.Location;
                #RTFBody=$_.RTFBody;
                Body=$_.Body;
                IsRecurring=$_.IsRecurring;
                Organizer=$_.Organizer;
                #Recipients=$_.Recipients;
                OptionalAttendees=$_.OptionalAttendees;
                RequiredAttendees=$_.RequiredAttendees;
                ResponseStatus=$_.ResponseStatus;
                AllDayEvent=$_.AllDayEvent;
                ReminderMinutesBeforeStart=$_.ReminderMinutesBeforeStart;
                RecurrenceState=$_.RecurrenceState;
                PC=$env:COMPUTERNAME;
                GlobalAppointmentID = $_.GlobalAppointmentID;

            }
            return $obj
        }
        $i++
    }
}

Function Set-CloudEvents($json) {
    # Write events to EXO calendar
    Write-Host "CloudEvents"
    $local = "ms-updates-prev.txt"
    try {
        # Skip if same as before
        $prev = Get-Content $local -ErrorAction SilentlyContinue -Encoding UTF8 | Out-String
        if ($prev.Trim() -eq $json.Trim()) {
            Write-Host "Skip" -ForegroundColor "Cyan"
            return
        }
    } catch {}

    # Dynamic URL
    # "https://msupdate5.com/api/events"
    $uri = "https://www.spjeff.com/feed/"
    $uri

    # Upload HTTP POST with JSON body
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $result = Invoke-WebRequest -Uri $uri -Body $json -Method "POST" -ContentType "application/json; charset=utf-8" -Headers @{"Pc"=$env:computername}
    $result.StatusCode
    if ($result.StatusCode -ge 200 -and
        $result.StatusCode -lt 300
    ) {
        $json | Out-File $local -Force
    }
}

function Main() {
    # Read calendar
    $events =  Get-OutlookCalendar
    $total  =  $events.Count
    Write-Host "Found $total" -Fore "Yellow"

    # JSON text file
    $localjson = $local.Replace("prev","curr")
    $json = ConvertTo-Json $events
    $json | Out-File $localjson -Force
    $json = Get-Content $localjson -ErrorAction SilentlyContinue -Encoding UTF8 | Out-String

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

    # Upload to SQL Azure
    Set-CloudEvents $json
}

# Optional HTTP 407 proxy 
# http://woshub.com/using-powershell-behind-a-proxy/
if ($env:computername -like "NGV*") {
    $wcl    =   New-Object System.Net.WebClient
    $creds  =   Get-Credential
    $wcl.Proxy.Credentials = $creds
}

# Main loop
Start-Process "OUTLOOK.EXE"
While ($true) {
    Main
    Get-Date
    Write-Host "Wait 15 minutes ... "
    Start-Sleep (60 * 15)
}
