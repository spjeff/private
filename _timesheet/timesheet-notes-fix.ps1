# Input full CSV 
# Format daily work notes into 5 even blocks for timesheet


function ProcessClient ($client, $clientRows) {
    # Read source
    # $file = "timesheet"
    # $txt = Get-Content "$file.txt"

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

    # Break into daily blocks
    $j=0
    $daylength = $length/5
    $daynotes = @('* ','* ','* ','* ','* ')
    for ($i=0; $i -le 4; $i++) {
        $note = ''
        $notelength = 0
        while ($notelength -lt $daylength) {
            $note += $coll[$j] + " "
            $j++
            $notelength += $note.length
        }
        $daynotes[$i] += $note
    }

    # Write final TXT
    $daynotes | Out-File "$client.log" -Force
}

function Main() {
    # Find recent Friday
    $sourceFile = "C:\Documents\Work\ztime\time2021.accdb"
    $recentFriday = Get-Date
    while ($recentFriday.DayOfWeek -ne "Friday") {
        $recentFriday = $recentFriday.AddDays(-1)
    }
    $recentFriday

    # Query time LOG
    # $acccess = New-Object
    # $query = "SELECT * FROM [Time] WHERE [Date] <= '" + $recentFriday.ToShortDateString() +"' AND [Date] > '" + $recentFriday.AddDays(-7).ToShortDateString() +"' "

    # Clear LOG
    Remove-Item "*.LOG"

    # Read lines
    $csv = Import-Csv "time.csv"
    $groups = $csv | Group Client
    foreach ($client in $groups) {
        # LOG per client
        $clientName = $client.Name
        $clientRows = ($csv |? {$_.Client -eq $clientName})
        ProcessClient $clientName $clientRows
    }
}
Main