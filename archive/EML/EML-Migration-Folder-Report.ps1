$coll=@()
$top = "E:\FTP"


$topfolder = gci "$top\*" -Directory
foreach ($t in $topfolder) {
	if ($t.Name -ne "Template" -and $t.Name -ne "_Template") {
		$t.Fullname
		$regionfolders = gci "$($t.Fullname)\*" -Directory
		foreach ($r in $regionfolders) {
			$r.Fullname
			$folders = gci "$($r.Fullname)\*" -Directory
			foreach ($u in $folders) {
				$u.Fullname
				# $userfolders = gci "$($f.Fullname)\*" -Directory
				# foreach ($u in $userfolders) {
				# $u.Fullname
				$FullnameShort = $u.Fullname
				$FullnameShort = $FullnameShort.Replace($top,"")
				
				$obj = New-Object PSObject -Property @{Fullname=$u.Fullname; Name=$u.Name; FullnameShort=$FullnameShort; Region=$r.Name;};
				$coll += $obj
				#}
			}
		}
	}
}


$pc = $env:COMPUTERNAME
$coll | Export-Csv "EML-Migration-Folder-Report-$pc.csv" -NoTypeInformation -Force

