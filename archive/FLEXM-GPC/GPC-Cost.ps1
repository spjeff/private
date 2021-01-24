$url = "https://genplastics.sharepoint.com/sites/SupplyChain2"

Connect-PnPOnline $url -UseWebLogin
$web = Get-PnPWeb
$list = Get-PnPList "POReq_Master"

$csv = Import-Csv "GPC-TotalCost.csv"
foreach ($c in $csv) {
    $item = Get-PnPListItem -List $list -Id $c.Id
    $TotalCost = $c.TotalCost

    Set-PnPListItem -List $list -Identity $c.Id -Values @{"TotalCost"=$TotalCost} -SystemUpdate
    Write-Host $item.Id $TotalCost
}