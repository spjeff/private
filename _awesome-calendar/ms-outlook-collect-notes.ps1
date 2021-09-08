# from https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/retrieving-outlook-calendar-entries
# from https://devblogs.microsoft.com/scripting/hey-scripting-guy-how-can-i-display-my-office-outlook-appointments-without-starting-office-outlook/

Function Get-OutlookCalendar
{
    # Look forward two weeks
    $dte    = Get-Date
	$week   = $dte.AddDays(-7)

    # Load the required .NET types
    [Reflection.Assembly]::LoadWithPartialname("Microsoft.Office.Interop.Outlook") | Out-Null
    
    # Outlook object model
    $outlook = New-Object -ComObject "Outlook.Application"

    # Connect to the appropriate location
    $namespace  = $outlook.GetNameSpace("MAPI")
    $sent       = [Microsoft.Office.Interop.Outlook.OlDefaultFolders]::olFolderSentMail
    $folder     = $namespace.getDefaultFolder($sent)

    # Get calendar items
    $items      = $folder.items
    $items |
    Foreach-Object {
        Write-Progress -activity "Inspecting $($items.count) sent mail"  -Status "Processing ..." -PercentComplete ($i/$items.count*100)
        if($_.SentOn -ge $week)
        {
            # Max 100
            $max = 120
            $body = $_.Body;
            if ($body.Length -gt $max) {
                $body = $body.Substring(0, $max);
            }

            # Append
            $obj = New-Object -TypeName "PSCustomObject" -Property @{
                Subject = $_.Subject;
                Body    = $body;
                SentOn  = $_.SentOn
            }
            return $obj
        }
        $i++
    }
}

<#
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
#>

function Main() {
    # Read calendar
    $events =  Get-OutlookCalendar
    $total  =  $events.Count
    Write-Host "Found $total" -Fore "Yellow"
}

# Main loop
Start-Process "OUTLOOK.EXE"
While ($true) {
    Main
    Get-Date
    Write-Host "Wait 15 minutes ... "
    Start-Sleep (60 * 15)
}
