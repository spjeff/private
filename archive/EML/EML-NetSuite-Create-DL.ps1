$url = "https://emlpayments.sharepoint.com/sites/NetSuiteFiles"
Connect-PnPOnline $url -UseWebLogin
$csv = Import-Csv "EML-NetSuite-Create-DL2.csv"

# $ListTemplateInternalName = "EML-Enum-Dest"
# $Context = Get-PnPContext
# $Web = $Context.Site.RootWeb
# $ListTemplates = $Context.Site.GetCustomListTemplates($Web)
# $Context.Load($Web)
# $Context.Load($ListTemplates)
# Execute-PnPQuery

# $ListTemplate = $ListTemplates | Where-Object { $_.InternalName -eq $ListTemplateInternalName }

foreach ($row in $csv) {

    $row
    New-pnplist -Title $row.DisplayName -Url $row.Name -Template "DocumentLibrary"
    $list = Get-PNPList $row.DisplayName
    $p = Get-PnPField "Policy" -Group "Custom Columns"
    $pe = Get-PnPField "Policy Expiration" -Group "Custom Columns"

    Add-PnPField -List $list -Field $p
    Add-PnPField -List $list -Field $pe
}


# Disconnect-PnPOnline
