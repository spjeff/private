# PNP Connect
# https://pnp.github.io/powershell/articles/connecting.html
# https://pnp.github.io/powershell/articles/authentication.html
# https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/register-pnpazureadapp?view=sharepoint-ps
# https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
# https://mmsharepoint.wordpress.com/2018/12/19/modern-sharepoint-authentication-in-azure-automation-runbook-with-pnp-powershell/

# Folder
cd "C:\Documents\GitHub\private\_awesome-calendar\TimeSummary"

# Scope
$tenant = "spjeffdev"
$clientFile = "PnP-PowerShell-Client.txt"

# Connect
$clientId = Get-Content $clientFile
$password = "pass@word1"
$secPassword = $password | ConvertTo-SecureString -AsPlainText -Force
Connect-PnPOnline -ClientId $clientId -Url "https://$tenant.sharepoint.com/sites/TimeLog" -Tenant "$tenant.onmicrosoft.com" -CertificatePath '.\PnP-PowerShell.pfx' -CertificatePassword $secPassword
Get-PnPTenantSite | Format-Table -AutoSize

# Walk date backward
$lastFriday = (Get-Date).AddDays(-1)
while ($lastFriday.DayOfWeek -ne "Friday") {
    $lastFriday = $lastFriday.AddDays(-1)
}
$lastFriday
$threshold = $lastFriday.ToString("yyyy-MM-dd")

# Source
$caml = "<View><ViewFields><FieldRef Name='ID'/><FieldRef Name='Date'/><FieldRef Name='Client'/><FieldRef Name='Note'/></ViewFields><Query><Where><Gt><FieldRef Name='Created'/><Value Type='DateTime'>$threshold</Value></Gt></Where></Query></View>"
$caml
$rows = Get-PnPListItem "TimeLog" -Query $caml
$rows.Count

# Loop
$log = @()
foreach ($r in $rows) {
    $Date = $r.FieldValues["Date"]
    $Client = $r.FieldValues["Client"]
    $Note = $r.FieldValues["Note"]
    $log += [PSCustomObject]@{"Date"=$Date; "Client"=$Client; "Note"=$Note}
}

# Group
$groups = $log | Group Client
$groups | Select Name |ft -a

# Summary
foreach ($g in $groups) {

    # Append weekly Note
    $length = 0
    $note = ""
    $client = $g.Name
    $match = $log |? {$_.Client -eq $client}
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
        $note = ''
        $notelength = 0
        
        # Next day
        while ($notelength -lt $daylength) {
            # Append short
            $matchNote = $match[$j].Note
            if ($matchNote) {
                $note += $matchNote + ". "
                
            } else {
                break
            }
            $notelength += $note.length
            $j++
            $j
        }

        # Update daily note
        $daynotes[$i] += $note
    }

    # Found for Insert/Update
    # T00:00:00Z
    $caml = "<View><Query><Where><And><Eq><FieldRef Name='Date'/><Value Type='Text'>$($threshold)</Value></Eq><Eq><FieldRef Name='Client'/><Value Type='Choice'>$client</Value></Eq></And></Where></Query></View>"
    $caml
    $found = Get-PnPListItem -List "TimeSummary" -Query $caml
    $found
    $found.Count


    $hash = @{"Date"=$threshold; "Client"=$Client; "Note"=$daynotes[0]; "Note2"=$daynotes[1]; "Note3"=$daynotes[2]; "Note4"=$daynotes[3]; "Note5"=$daynotes[4]}
    if ($found.Count) {
        # Update
        Set-PnPListItem -List "TimeSummary" -Values $hash -Identity $found.Id
    } else {
        # Insert
        Add-PnPListItem -List "TimeSummary" -Values $hash 
    }
}
