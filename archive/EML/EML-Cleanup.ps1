# from https://medium.com/ng-sp/sharepoint-add-in-permission-xml-cheat-sheet-64b87d8d7600
$url = "https://emlpayments-admin.sharepoint.com/"
$clientid = "0249ae2b-04c7-4aec-9c15-14be53d23256"
$clientsecret = "PmuWvqhnlINfl+u3w0O7hsI53EM/MYJ7/2kWRoUL19k="
$threshold = [datetime]"07/06/2020"

Connect-PnPOnline -Url $url -ClientId $clientid -ClientSecret $clientsecret
$coll = @()
$teams = Get-PnPTenantSite |? {$_.Template -eq "TEAMCHANNEL#0"}
foreach ($t in $teams) {

    if ($t.Url -eq "https://emlpayments.sharepoint.com/sites/msteams721-U") {
        $t.Url
        # $obj =  New-Object PSObject -Property @{
        #     Url = $t.Url
        # }
        # $coll += $obj

        Write-Host $t.Url -Fore Yellow
        Connect-PnPOnline -Url $t.Url -ClientId $clientid -ClientSecret $clientsecret
        $ctx = Get-PnPContext
        $list = Get-PNPList "Documents"
        $list
        $field = Get-PNPField "Modified" -List $list
        $field.Indexed = 1
        $field
        $field.Indexed
        $field.Update()
        $ctx.ExecuteQuery()

        $query = "<View Scope='RecursiveAll'><ViewFields><FieldRef Name='Title'/><FieldRef Name='Modified'/></ViewFields><Query><Where><Geq><FieldRef Name='Modified'/><Value Type='DateTime'>2020-07-06</Value></Geq></Where></Query></View>"
        $docs = Get-PNPListItem -List $list -Query $query
        Write-Host $list.ItemCount "//"  $docs.Count
        $docs | select name, modified | ft -a
        foreach ($d in $docs) {
            $obj =  New-Object PSObject -Property @{
                ServerRelativeUrl = $d.ServerRelativeUrl
                Modified = $d.Modified
                ModifiedBy = $d.ModifiedBy
            }
            $coll += $obj
        }
    }

}
$coll | Export-Csv "EML-Cleanup.csv" -NoTypeInformation -Force

