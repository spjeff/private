# from https://joshheffner.com/bulk-assign-licenses-in-office-365-using-powershell/

Start-Transcript

Import-Module MSOnline
Connect-MsolService
Get-MsolAccountSku | ft -AutoSize

$SKUOld = "tenantname:ENTERPRISEPACK"
$SKUNew = "tenantname:ENTERPRISEPACK"

"CURRENT STATE"
$coll = @()
$users = Get-MsolUser -All 
foreach ($u in $users) {
    "---"
    $u | ft -a
    $lic = Get-MsolUserLicense
    $lic | ft -a
    if ($lic -eq "") {
        $coll += $u.UserPrincipalName
    }
}
$coll | Export-Csv "EDC-Assign-M365-License-UPN.csv"

"FUTURE STATE"
$users = Get-MsolUser -All 
foreach ($c in $coll) {
    "---"
    $SKU = 
    Remove-MsolUserLicense -UserPrincipalName $c -RemoveLicenses $SKUOld
    Set-MsolUserLicense -UserPrincipalName $c -AddLicenses $SKUNew
    $lic | ft -a
}

Stop-Transcript
