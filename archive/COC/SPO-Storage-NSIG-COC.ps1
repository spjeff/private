"START"

<#

The app identifier has been successfully created.
Client Id:  	9b78b2b6-6c8d-4a9a-ad6f-5f8d6f376f60
Client Secret:  	5n38w9mCaq+v8d1UI/B03GyogaiURc/sZG5s1mQ5Xlg=
Title:  	SPO-Storage
App Domain:  	localhost
Redirect URI:  	https://localhost

#>

# Modules
Import-Module "SharePointPnPPowerShellOnline"
Import-Module "Microsoft.PowerShell.Utility"

# Config
$url        = "https://cityofchesapeake-admin.sharepoint.com/"

# App ID and Secret from Azure Automation secure string "Credential" storage
# from https://stackoverflow.com/questions/28352141/convert-a-secure-string-to-plain-text
# from https://sharepointyankee.com/2018/02/23/azure-automation-credentials/


# $cred = Get-AutomationPSCredential "SPO-Storage-NSIG-COC"
# $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($cred.Password)
# $UnsecurePassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
# $clientId      = $cred.UserName
# $clientSecret  = $UnsecurePassword

$clientId      = "9b78b2b6-6c8d-4a9a-ad6f-5f8d6f376f60"
$clientSecret  = "5n38w9mCaq+v8d1UI/B03GyogaiURc/sZG5s1mQ5Xlg="

$clientId
$clientSecret

# PNP Get Sites
Connect-PnPOnline -Url $url -AppId $clientId -AppSecret $clientSecret
$sites = Get-PnPTenantSite
$table = $sites | Select-Object Url,Template,StorageUsage,StorageMaximumLevel,LockState,Owner,OwnerEmail,OwnerLoginName,OwnerName
$table | Format-Table -AutoSize

# Format HTML
$CSS = @'
<style>
table {
    border: 1px solid black;
}
th {
    background: #DAE0E6;
    padding-right: 10px;
}
tr:nth-child(even) {
    background: #F1F1F1;
}
</style>
'@
$csv = "SPO-Storage.csv"
$table | Export-CSV $csv -Force -NoTypeInformation
$html = ($table | ConvertTo-HTML -Property * -Head $CSS) -Join ""
$totalStorageUsage = $table | Measure-Object "StorageUsage" -Sum
$html += "<p>Count Sites        = $($sites.Count)</p>"
$html += "<p>Total Storage (MB) = $($totalStorageUsage.Sum)</p>"

# Send Email
# $cred = Get-AutomationPSCredential "SPO-Storage-NSIG-COC-EXO"
$cred = Get-Credential


$cred |ft -a
$cred.UserName
$cred.Password
$recip  = @($cred.UserName, "bgay@cityofchesapeake.net", "avanderberg@cityofchesapeake.net")
$subj   = "SPO-Storage"
Send-MailMessage -To $recip -from $cred.UserName -Subject $subj -Body $html -BodyAsHtml -smtpserver "smtp.office365.com" -UseSSL -Credential $cred -Port "587" -Attachments $csv

"FINISH"
