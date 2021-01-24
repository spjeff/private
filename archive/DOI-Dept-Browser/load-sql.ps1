$srv = ".\sqlexpress"
$database = "DeptBrowser"


# delete FROM [dbo].[DeptBrowser]

$txt = Get-Content "mongo-export-full.json" | Out-String
$rows = ConvertFrom-Json $txt
$rows.Count
foreach ($r in $rows) {

    $c = $r.created_on.ToString().replace('@{$date=','').replace('}','')
    $u = $r.updated_on.ToString().replace('@{$date=','').replace('}','')


    $tsql = "INSERT INTO DeptBrowser ([name],[email],[phone],[org],[created_on],[updated_on],[email_addresses],[phones]) VALUES ('$($r.name)','$($r.email)','$($r.phone)','$($r.org)','$($c)','$($u)','$($r.email_addresses)','$($r.phones)')"
    $tsql
    Invoke-Sqlcmd -Query $tsql -ServerInstance $srv -Database $database
}