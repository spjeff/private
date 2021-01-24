# Configuration
$webUrl = "https://doimspp.sharepoint.com/sites/bor-tsc"
$appID = "f33085f2-6471-4d38-917d-86f21447320d"
$appSecret = "JVxi0pByKEErHOfJTQYxWPyu5qWDnaHFg6uaW7/Mxb4="

function Main() {
    # Office 365 Connection
    Connect-PNPOnline -Url $webUrl -AppId $appID -AppSecret $appSecret
    Get-PnPWeb
    $list = Get-PNPList -Identity "PNPTest"

    # Loop remove all rows
    $items = Get-PnPListItem -List $list
    foreach ($item in $items) {
        Remove-PnPListItem -List $list -Identity $item.Id -Force
    }

    # Loop add new rows
    $d = (Get-Date)
    Add-PnPListItem -List $list -Values @{"Title"="Hello world $d"}
}

# Main
Start-Transcript
Main
Stop-Transcript