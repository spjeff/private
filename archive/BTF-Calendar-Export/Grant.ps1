Import-Module AzureAD
Connect-AzureAD
$readUser = "jeff.jones@butterflytech.net"
$upn = "galen.keene@butterflytech.net"
$UserCredential = Get-Credential


$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri "https://outlook.office365.com/powershell-liveid/" -Credential $UserCredential -Authentication "Basic" -AllowRedirection
Import-PSSession $Session -DisableNameChecking


Add-MailboxFolderPermission -Identity "$($upn):\Calendar" -User $readUser -AccessRights "Owner" #"ReadItems"
