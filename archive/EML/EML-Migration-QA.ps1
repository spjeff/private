cls

# Loop Destination
$foundTotal = 0
$lookup = Import-Csv "EML-Migration-QA-MSTeams-Lookup.csv"
$dest = Import-Csv "EML-Migration-Destination-MSTeams-Report.csv"
foreach ($d in $dest) {
    Write-Host "Checking dest [$($d.Url)]"
    # Parse
    $destRegFolder = $d.Url.substring(1, $d.Url.LastIndexOf("/")-1)
    $destRegFolder
    $userFolder = $d.Url.Replace($destRegFolder,"")
    $status = "NOT FOUND"

    # Replace Root Folder
    $sources = @("EML-Migration-Source-Folder-Report-BOX-Common.csv",
    "EML-Migration-Source-Folder-Report-FLEX-DC-UK-Common.csv",
    "EML-Migration-Source-Folder-Report-FS02-US-Common.csv",
    "EML-Migration-Source-Folder-Report-SF-OFF-FS-01-AUS-Common.csv")
    foreach ($s in $sources) {
        # Build MSTeams URL
        Write-Host "Checking source [$s]"
        
        $rows = Import-Csv $s
        foreach ($r in $rows) {
            Write-Host "." -NoNewLine
            # Clean fullname path
            $fullname = $r.Fullname
            $fullnameRight = $fullname.substring($fullname.LastIndexOf("\")+1, $fullname.Length - $fullname.LastIndexOf("\")-1)

            $fullname = $r.FullnameShort
            # $fullname = $fullname.Replace('D:\EMH_Data\OneDrive Folder Structure\',"")
            # $fullname = $fullname.Replace('E:\BOX\EML Structure\',"")
            # $fullname = $fullname.Replace('E:\FTP\',"")
            # $fullname = $fullname.Replace('T:\',"")
            $fullnameLeft = $fullname.Replace("\"+$fullnameRight,"")
            $fullnameLeft = $fullnameLeft.TrimEnd("A")
            $fullnameLeft = $fullnameLeft.TrimEnd("E")
            $fullnameLeft = $fullnameLeft.TrimEnd("U")
            $fullnameLeft = $fullnameLeft.TrimEnd("G")
            $fullnameLeft = $fullnameLeft.TrimEnd('\')

            # Lookup MSTeams URL
            $match = $lookup |? {$_.SourcePath -eq $fullnameLeft}
            $destLastLetter = $match[0].TargetPath.substring($match[0].TargetPath.length-1,1)

            # Filter
            $rowfilter = $match[0].TargetPath + "/Shared Documents/" + $destLastLetter + "/" + $fullnameRight
            if ($d.Url -eq $rowfilter) {
                $status = "FOUND"
                Write-Host $status -Fore Green
                $foundTotal++
            }
        }
        $i++
    }

    # Save
    $d.Status = $status
}
Write-Host $foundTotal -Fore Green
$dest | Export-Csv "EML-Migration-Destination-MSTeams-Report2.csv" -NoTypeInformation -Force