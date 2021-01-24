# Format daily work notes into 5 even blocks for timesheet

# Read source
$file = "timesheet"
$txt = Get-Content "$file.txt"

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
$daynotes | Out-File "$file-notes-fix.txt" -Force