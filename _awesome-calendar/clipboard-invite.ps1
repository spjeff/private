$coll=@()
$input = "Joel Blumenau <Joel.Blumenau@aarcorp.com>; Moses Heredia <Moses.Heredia@aarcorp.com>; David Kane <David.Kane@aarcorp.com>;Elizabeth Rydzewski <Elizabeth.Rydzewski@aarcorp.com>; Anna Czekaj <Anna.Czekaj@aarcorp.com>"
$splits = $input.Split(";")
foreach ($s in $splits) {
    $after = $s.Trim()
    $after = $s.substring($s.indexOf("<"),$s.length-$s.indexOf("<")-1).TrimEnd(">").TrimStart("<")
    "--$after--"
    $coll += $after 
}
Write-Host ($coll -join "; ") 
