cls
$before = Read-Host "Input Outlook emails "
$split = $before.Split("<")
$coll=@()
foreach ($s in $split) {
    $new = $s.Split(">")[0].TrimEnd('>')
    if ($new.Contains("@")) {
        $coll += $new
    }
}

"---`r`n`r`n"
$after = $coll -join ";`r`n"
$after