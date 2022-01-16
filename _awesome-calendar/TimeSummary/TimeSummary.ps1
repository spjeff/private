# PNP Connect
# https://pnp.github.io/powershell/articles/connecting.html
# https://pnp.github.io/powershell/articles/authentication.html
# https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/register-pnpazureadapp?view=sharepoint-ps
# https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
# https://mmsharepoint.wordpress.com/2018/12/19/modern-sharepoint-authentication-in-azure-automation-runbook-with-pnp-powershell/

if ($host.Runspace) { if ($host.Runspace[0].GetType().Name -eq "LocalRunspace") { $local = $true; "LOCAL" } } else { "RUNBOOK" }

# Folder
if ($local) {
    cd "C:\Documents\GitHub\private\_awesome-calendar\TimeSummary"
}

# Scope
$tenant     = "spjeffdev"
$clientFile = "PnP-PowerShell-Client.txt"
$clientId   = "583e9a09-8836-44f3-8366-1cb438f0dd8c"
$password   = "pass@word1"


if (!$local) {
    # Azure Certificate
    "Azure Certificate"
    $secPassword = $password | ConvertTo-SecureString -AsPlainText -Force
    $cert = Get-AutomationCertificate -Name "PNP-PowerShell-$tenant"
    "CERT"
    $cert
    $pfxCert = $cert.Export("pfx" , $password ) # 3=Pfx
    $certPath = "PNP-PowerShell-$tenant.pfx"
    $certPath
    Set-Content -Value $pfxCert -Path $certPath -Force -Encoding Byte 
}

# Connect
$secPassword = $password | ConvertTo-SecureString -AsPlainText -Force
Connect-PnPOnline -ClientId $clientId -Url "https://$tenant.sharepoint.com/sites/TimeLog" -Tenant "$tenant.onmicrosoft.com" -CertificatePath ".\PnP-PowerShell-$tenant.pfx" -CertificatePassword $secPassword
Get-PnPTenantSite | Format-Table -AutoSize

# Walk date backward
$lastFriday = (Get-Date).AddDays(-1)
while ($lastFriday.DayOfWeek -ne "Friday") {
    $lastFriday = $lastFriday.AddDays(-1)
}
$lastFriday
$threshold  = $lastFriday.ToString("yyyy-MM-dd")
$weekEnding = $lastFriday.AddDays(7).ToString("yyyy-MM-dd")

# Source
$caml = "<View><ViewFields><FieldRef Name='ID'/><FieldRef Name='Date'/><FieldRef Name='Client'/><FieldRef Name='Note'/></ViewFields>" +
"<Query><Where><Gt><FieldRef Name='Created'/><Value Type='DateTime'>$threshold</Value></Gt>" +
"</Where></Query></View>"

# Query
$rows = Get-PnPListItem "TimeLog" -Query $caml
Write-Host "TimeLog=$($rows.Count)" -Fore "Yellow"
Write-Host $caml -Fore "Yellow"

# Loop
$log = @()
foreach ($r in $rows) {
    $Date   = $r.FieldValues["Date"]
    $Client = $r.FieldValues["Client"]
    $Note   = $r.FieldValues["Note"]
    $log    += [PSCustomObject]@{"Date" = $Date; "Client" = $Client; "Note" = $Note }
}

# Group
$groups = $log | Group-Object "Client"
$groups | Select-Object "Name" | ft -a

# Summary
foreach ($g in $groups) {

    # Append weekly Note
    $length = 0
    $note   = ""
    $client = $g.Name
    $match  = $log | ? { $_.Client -eq $client }
    foreach ($m in $match) {
        $line = $m.Note
        if (!$line.EndsWith(".")) {
            $line += "."
        }
        $length += $line.Length
        $note += $line
    }
          

    # Break into daily blocks
    $j = 0
    Write-Host "length=$length"
    $daylength = $length / 5
    Write-Host "daylength=$daylength"
    $daynotes = @('* ', '* ', '* ', '* ', '* ')
    for ($i = 0; $i -le 4; $i++) {
        # Default
        $note = ""
        $notelength = 0
        
        # Next day
        while ($notelength -lt $daylength) {
            # Append short
            $matchNote = $match[$j].Note
            if ($matchNote) {
                $note += $matchNote + ". "
                $notelength += $matchNote.length
            }
            else {
                break
            }
            $j++
        }

        # Friday catch all
        if ($i -eq 4 -and $j -lt $match.length) {
            while ($j -lt $match.length) {
                $daynotes[$i] += $match[$j].Note
                $j++
            }
        }

        # Update daily note
        $daynotes[$i] += $note
    }

    # Found for Insert/Update
    # T00:00:00Z
    $caml = "<View><Query><Where><And><Eq><FieldRef Name='WeekEnding'/><Value Type='Text'>$($weekEnding)</Value></Eq><Eq><FieldRef Name='Client'/><Value Type='Choice'>$client</Value></Eq></And></Where></Query></View>"
    $found = Get-PnPListItem -List "TimeSummary" -Query $caml
    Write-Host $caml -Fore "Yellow"
    $hash = @{"WeekEnding" = $weekEnding; "Client" = $Client; "Note" = $daynotes[0]; "Note2" = $daynotes[1]; "Note3" = $daynotes[2]; "Note4" = $daynotes[3]; "Note5" = $daynotes[4] }
    if ($found.Count) {
        # Update
        Set-PnPListItem -List "TimeSummary" -Values $hash -Identity $found.Id
    }
    else {
        # Insert
        Add-PnPListItem -List "TimeSummary" -Values $hash 
    }
}
