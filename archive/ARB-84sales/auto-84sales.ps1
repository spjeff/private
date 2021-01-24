<#
.DESCRIPTION
    Downloads source JSON from MongoDB for users who should have OneDrive permission access.
    Compares to Office 365 OneDrive destination and will:

    1) Grant if missing.  Users who lack perimssion and are listed in JSON user source.
    2) Revoke any excess.  Users who have perimssion and no longer in JSON user source.
	
	Contact information for support listed below.

.EXAMPLE
	.\auto-84sales.ps1
	
.NOTES  
	File Name:  auto-84sales.ps1
	Author   :  Jeff Jones      spjeff@spjeff.com
	Author   :  Alex Barberi    alex@arbwebapps.com
	Version  :  1.2
    Modified :  2020-05-11
    
    The app identifier has been successfully created.
    Client Id:  	36f8f579-bea5-4fbb-aaac-879cb6aeda55
    Client Secret:  	qPnhrvkJLHCcNRZKXWgE5nLxaxBJfSdwZC2uNVixxfw=
    Title:  	Auto-84sales-PowerShell
    App Domain:  	localhost
    Redirect URI:  	https://localhost

    <AppPermissionRequests AllowAppOnlyPolicy="true">
    <AppPermissionRequest Scope="http://sharepoint/content/tenant" Right="FullControl"/>
    </AppPermissionRequests>

#>

# Module
Import-Module "SharePointPnPPowerShellOnline" -ErrorAction SilentlyContinue | Out-Null

# Config
$urlAdmin   = "https://barberialexlive-admin.sharepoint.com"

# Auto-84sales-PowerShell
# from https://piyushksingh.com/2018/12/26/register-app-in-sharepoint/
# from https://www.sharepointdiary.com/2018/04/sharepoint-online-remove-user-group-from-list-permissions-using-powershell.html
$appid      = "36f8f579-bea5-4fbb-aaac-879cb6aeda55"
$appsecret  = "qPnhrvkJLHCcNRZKXWgE5nLxaxBJfSdwZC2uNVixxfw="

# URL
$urlToken       = "https://rdt-login-dev.azurewebsites.net/api/LoginWithEmailAndPassword"
$urlTeams       = "https://rdt-settings-dev.azurewebsites.net/api/GetTeamsForOneDriveAuth"
$urlPersonal    = "https://barberialexlive-my.sharepoint.com/personal"

function ParseJSON() {
    # Input
    $hash       = '{EmailAddress: "service@arbwebapps.com",Password: "Lumber123"}'
    $resp       = Invoke-WebRequest -Method "POST" -Uri $urlToken -Body $hash -UseBasicParsing
    $j          = ConvertFrom-Json $resp.Content
    $token      = $j.Record.Token

    # Headers
    $headers    = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
    $headers.Add("Authorization", $token)
    $resp       = Invoke-WebRequest -Method "GET" -Uri $urlTeams -Headers $headers -UseBasicParsing
    $j          = ConvertFrom-Json $resp.Content

    # Loop Webs
    foreach ($row in $j.Record) {
        # Parse UserPrincipalName (UPN) Login
        $prefix = $row.OneDriveEmail.Split("@")[0]
        Write-Host $row
        Write-Host $prefix

        if ($prefix) {
            # Format URL and Connect
            $url = $urlPersonal + "/" + $prefix + "_84sales_com"
            Write-Host $url
            Connect-PnPOnline -Url $url -AppId $appid -AppSecret $appsecret
        
            # Loop Users to GRANT
            foreach ($u in $row.Users) {
                $web = Get-PnPWeb
                Write-Host "Grant $u"
                #REM Set-PnPWebPermission -Identity $web -User $u -AddRole "Full Control"
                Write-Host "Set-PnPWebPermission $u"
            }

            # Loop Users to REVOKE
            $web = Get-PnPWeb -Includes "RoleAssignments"
            foreach ($u in $row.InactiveUsers) {
                $match = $web.RoleAssignments |? {$_.Login -eq  $u}
                if ($match) {
                    $ctx = Get-PnPContext
                    $web.RoleAssignments.GetByPrincipal($u).DeleteObject()
                    $ctx.ExecuteQuery()
                }
            }

            # END
        }
    }
}

function Main() {

    # Logging
    Start-Transcript
    Write-Host "START"
    Write-Host Get-Date

    # Permission grant/revoke
    ParseJSON

    # Logging
    Write-Host "END"
    Write-Host Get-Date
    Stop-Transcript
}
Main