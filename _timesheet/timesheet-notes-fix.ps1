# Input full CSV 
# Format daily work notes into 5 even blocks for timesheet

function ProcessClient ($client, $clientRows) {
    # Append collect text
    $txt = @()
    foreach ($row in $clientRows) {
        $txt += $row.Task
    }

    # Count max length and clean whitespace
    $length = 0
    $coll = @()
    foreach ($line in $txt) {
        $line = $line.Trim()
        if (!$line.EndsWith(".")) {
            $line += "."
        }
        $coll += $line
        $length += $line.Length
    }
    # $collfull = $coll -join " "

    # Break into daily blocks
    $j=0
    Write-Host "length=$length"
    $daylength = $length/5
    Write-Host "daylength=$daylength"
    $daynotes = @('* ','* ','* ','* ','* ')
    for ($i=0; $i -le 4; $i++) {
        $note = ''
        $notelength = 0


        # if ($coll[$j] -gt $daylength) {
        #     # Reduce long
        #     $from = [int](($i * $daylength)+1)
        #     $to = [int]((($i+1) * $daylength)-5)
        #     "FROM $from TO $to LEN $($collfull.length)"
        #     $note = $collfull.Substring($from, $to-$from)
        # } else {
            while ($notelength -lt $daylength) {
            
                # Append short
                $note += $coll[$j] + " "
                $j++
                $notelength += $note.length
                $j
                
            }
        # }

        # Update daily note
        $daynotes[$i] += $note

    }

    # Write final TXT
    $daynotes | Out-File "$client.log" -Force
}

function Main() {
    # Find recent Friday
    # $sourceFile = "C:\Documents\Work\ztime\time2021.accdb"
    # $recentFriday = Get-Date
    # while ($recentFriday.DayOfWeek -ne "Friday") {
    #     $recentFriday = $recentFriday.AddDays(-1)
    # }
    # $recentFriday

    # Query time LOG
    # $acccess = New-Object
    # $query = "SELECT * FROM [Time] WHERE [Date] <= '" + $recentFriday.ToShortDateString() +"' AND [Date] > '" + $recentFriday.AddDays(-7).ToShortDateString() +"' "

    # Clear .LOG files
    # from https://stackoverflow.com/questions/502002/how-do-i-move-a-file-to-the-recycle-bin-using-powershell
    Import-Module -Name "Recycle"
    Remove-ItemSafely "*.LOG"

    # Read lines
    $csv = Import-Csv "time.csv"
    $groups = $csv | Group "Client"
    foreach ($client in $groups) {
        # LOG per client
        $clientName = $client.Name
        $clientRows = ($csv |? {$_.Client -eq $clientName})
        ProcessClient $clientName $clientRows
    }
}

Main