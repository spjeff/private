<#
.DESCRIPTION
    Setup O365 App ID / App Secret / Exchange Calendar permission to support
    other data migration script (BTF-Calendar-Export.ps1) for storing Azure SQL event data
    with start/end dates and keyword search.

.NOTES
	File Name:  BTF-Calendar-Setup.ps1
    Author   :  Jeff Jones  <jeff.jones@butterflytech.net>
                Galen Keene <galen.keene@butterflytech.net>
	Version  :  1.1
    Modified :  2020-05-17

    https://github.com/spjeff/spjeff-active-directory-angularjs-singlepageapp-master/blob/master/AppCreationScripts/Configure.ps1
#>


# This script creates the Azure AD applications needed for this sample and updates the configuration files
# for the visual Studio projects from the data in the Azure AD applications.
#
# Before running this script you need to install the AzureAD cmdlets as an administrator. 
# For this:
# 1) Run Powershell as an administrator
# 2) in the PowerShell window, type: Install-Module AzureAD
#
# Before you run this script
# 3) With the Azure portal (https://portal.azure.com), choose your active directory tenant, then go to the Properties of the tenant and copy
#    the DirectoryID. This is what we'll use in this script for the tenant ID
# 
# To configurate the applications
# 4) Run the following command:
#      $apps = ConfigureApplications -tenantId [place here the GUID representing the tenant ID]
#    You will be prompted by credentials, be sure to enter credentials for a user who can create applications
#    in the tenant
#
# To execute the samples
# 5) Build and execute the applications. This just works
#
# To cleanup
# 6) Optionnaly if you want to cleanup the applications in the Azure AD, run:
#      CleanUp $apps
#    The applications are un-registered


param([PSCredential]$Credential = "", [string]$TenantId = "")
Import-Module AzureAD

# Replace the value of an appsettings of a given key in an XML App.Config file.
Function ReplaceSetting([string] $key, [string] $newValue) {
    # from https://mcpmag.com/articles/2018/08/08/replace-text-with-powershell.aspx
    $fileName = "BTF-Calendar-Export.ps1" 
    $content = Get-Content $fileName -Raw
    $content = $content -replace $key, $newValue
    $content | Set-Content $fileName -Force
}

# Updates the config file for a client application
Function UpdateTodoListServiceConfigFile([string] $tenantId, [string] $appId, [string] $appSecret) {
    ReplaceSetting -key "token:tenantId" -newValue $tenantId
    ReplaceSetting -key "token:appId" -newValue $appId
    ReplaceSetting -key "token:appSecret" -newValue $appSecret
}

Function ConfigureApplications {
    <#
.Description
This function creates the Azure AD applications for the sample in the provided Azure AD tenant and updates the
configuration files in the client and service project  of the visual studio solution (App.Config and Web.Config)
so that they are consistent with the Applications parameters
#>
    [CmdletBinding()]
    param(
        [PSCredential] $Credential,
        [Parameter(HelpMessage = 'Tenant ID (This is a GUID which represents the "Directory ID" of the AzureAD tenant into which you want to create the apps')]
        [string] $tenantId
    )

    process {
        # $tenantId is the Active Directory Tenant. This is a GUID which represents the "Directory ID" of the AzureAD tenant 
        # into which you want to create the apps. Look it up in the Azure portal in the "Properties" of the Azure AD. 

        # Login to Azure PowerShell (interactive if credentials are not already provided: 
        # you'll need to sign-in with creds enabling your to create apps in the tenant)
        if (!$Credential) {
            $creds = Connect-AzureAD -TenantId $tenantId
        }
        else {
            if (!$TenantId) {
                $creds = Connect-AzureAD -Credential $Credential
            }
            else {
                $creds = Connect-AzureAD -TenantId $tenantId -Credential $Credential
            }
        }

        if (!$tenantId) {
            $tenantId = $creds.Tenant.Id
        }
        $tenant = Get-AzureADTenantDetail
        $tenantName = $tenant.VerifiedDomains[0].Name

        # Create the SPA Active Directory Application and it's service principal 
        Write-Host "Creating the AAD appplication ($spaName)"
        $spaClientAadApplication = New-AzureADApplication -DisplayName $spaName `
            -Homepage $spaRedirectUri `
            -ReplyUrls $spaRedirectUri `
            -PublicClient $spaIsPublicClient `
            -IdentifierUris $spaAppIdURI `
            -Oauth2AllowImplicitFlow $true
        $spaClientServicePrincipal = New-AzureADServicePrincipal -AppId $spaClientAadApplication.AppId -Tags { WindowsAzureActiveDirectoryIntegratedApp }
        Write-Host "Created"

        # Update the config files in the application
        Write-Host "Updating the PowerShell code"
        UpdateTodoListServiceConfigFile -tenantId $tenantName `
            -audience $spaClientAadApplication.AppId

        # Grant Exchange Online folder permission
        $users = Get-ADUsers
        foreach ($u in $users) {
            $upn = $u.Login
            Add-MailboxFolderPermission -Identity "$upn:\Contacts" –User $adminUser –AccessRights "Owner"
        }

        # Completes
        Write-Host "Done"
    }
}

# Run interactively (will ask you for the tenant ID)
ConfigureApplications -Credential $Credential -tenantId $TenantId