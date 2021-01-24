# Configure
$tenant = "fmacpt"
$user = "sada6ujyjx@fmacpt.onmicrosoft.com"
Import-Module AzureADPreview
Connect-AzureAD

function Main() {
    # Collect data
    $collApp = @()
    $collPermUser = @()
    $collPermApp = @()
    $apps = Get-AzureADApplication
    foreach ($a in $apps) {
        $collApp += a
        Write-Host $a | ft -a

        # Get Service Principal using objectId
        $sp = Get-AzureADServicePrincipal -ObjectId $a.ObjectId

        if ($sp) {
            # Get all delegated permissions for the service principal
            $spOAuth2PermissionsGrants = Get-AzureADOAuth2PermissionGrant -All $true| Where-Object { $_.ResourceId -eq $sp.ObjectId }
            $collUser += $spOAuth2PermissionsGrants

            # Get all application permissions for the service principal
            $spApplicationPermissions = Get-AzureADServiceAppRoleAssignedTo -ObjectId $sp.ObjectId -All $true  #| Where-Object { $_.PrincipalType -eq "ServicePrincipal" }
            $collApp += $spApplicationPermissions
        }
    }

    # Save CSV
    $collApp |  Export-Csv "D:\Report-AzureAD-AppReg-Permissions-collApp.csv" -NoTypeInformation -Force
    $collPermUser | Export-Csv "D:\Report-AzureAD-AppReg-Permissions-collPermUser.csv" -NoTypeInformation -Force
    $collPermApp | Export-Csv "D:\Report-AzureAD-AppReg-Permissions-collPermApp.csv" -NoTypeInformation -Force
}

Start-Transcript
Main
Stop-Transcript
