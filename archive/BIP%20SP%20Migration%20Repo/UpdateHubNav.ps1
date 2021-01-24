<#
.DESCRIPTION
    Updates the Hub Navigation by scannning all Hub sites for matching Navigation nodes by Title, deleting those nodes, updating the site design and reapplying it.

.EXAMPLE
	.\UpdateHubNav.ps1
	
.NOTES  
	File Name:  UpdateHubNav.ps1
    Author   :  Galen Keene
	Version  :  1.3
	Modified :  2020-08-19
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $False, Position = 1, ValueFromPipeline = $false, HelpMessage = 'Use -DeleteNavNodes -d parameter to add remove tabs on all Hub sites in O365 tenant')]
    [Alias("d")]
    [switch]$DeleteNavNodes,

    [Parameter(Mandatory = $False, Position = 2, ValueFromPipeline = $false, HelpMessage = 'Use -UpdateNavNodes -u parameter to push navigation tabs into all Hub sites in O365 tenant')]
    [Alias("u")]
    [switch]$UpdateNavNodes
)

# App Registration from https://medium.com/ng-sp/sharepoint-add-in-permission-xml-cheat-sheet-64b87d8d7600

#region Config-DeleteHubNavNodes
# Connecting to SharePoint Online Tenant
$appId      = "fe4cace9-70bc-40cd-8e00-e7c2617304ed"
$appSecret  = "cU9Hba3SreXU40xXKoGY+n+vbd0pPljsG+4KOWD7Hk0="
$orgName    = "keeneonsharepoint"
$orgurl     = "https://$orgName-admin.sharepoint.com"
#endregion

#region Config-UpdateHubNavNodes
$HubNavSitescriptlocation   = "BIP-HubNav-SiteScript.json"
$HubNavSiteScriptVersion    = "8"
$HubNavSiteScriptTitle      = "BIP-HubNav-SiteScript"
$BIPHubSiteDesignTitle      = "BIP Hub Communication Site Design"
$navloc                     = "TopNavigationBar"
#endregion

Function DeleteHubNavNodes() {
    # Loop Hubs
    $hubs = Get-PnPHubSite
    foreach ($h in $hubs) {
        # Connect single hub
        if ($h.SiteUrl) {
            # Attempt connection
            Write-Host $h.SiteUrl -Fore Yellow
            $failConnect = $false
            try {
                $connect = Connect-PnPOnline -Url $h.SiteUrl -ClientId $appId -ClientSecret $appSecret
            } catch {
                $failConnect = $true
            }
            
            if (!$failConnect) {
                $web = Get-PnPWeb -ErrorAction SilentlyContinue
                # Match URLs to confirm Hub site connected
                if ($web.Url -eq $h.SiteUrl) {
                    Write-Host "Processing $($h.SiteUrl)" -Fore Green

                    # Set Variables
                    $navdeptid = Get-PnPNavigationNode -Location $navloc | Where-Object {$_.Title -eq "Departments"}
                    $navresid = Get-PnPNavigationNode -Location $navloc | Where-Object {$_.Title -eq "Resources"}
                    $navsupid = Get-PnPNavigationNode -Location $navloc | Where-Object {$_.Title -eq "Support"}

                    # Remove HubSite Navigation
                    if ($navdeptid) {
                        Remove-PnPNavigationNode -Identity $navdeptid.Id -Force
                    }
                    if ($navresid) {
                        Remove-PnPNavigationNode -Identity $navresid.Id -Force
                    }
                    if ($navsupid) {
                        Remove-PnPNavigationNode -Identity $navsupid.Id -Force
                    }

                    # SPWeb save
                    $ctx = Get-PnPContext
                    $ctx.ExecuteQuery()
                
                }
            }
        }
    }
}
Function UpdateHubNavNodes() {

    # Lookup Site Design
    $HubNavSiteScriptObj    = Get-PnPSiteScript | Where-Object {$_.Title -eq $HubNavSiteScriptTitle}
    $sitedesign             = Get-PnPSiteDesign | Where-Object {$_.Title -eq $BIPHubSiteDesignTitle}
    $sitedesignid           = $sitedesign.Id

    # Update BIP Hub Nav Site Script 
    Get-Content $HubNavSitescriptlocation -Raw | Set-PnPSiteScript -Identity $HubNavSiteScriptObj.Id -Version $HubNavSiteScriptVersion

    # Re-Apply BIP Hub Communication Site Design 
    $hubs = Get-PnPHubSite
    foreach ($h in $hubs) {
        $runs = Get-PnPSiteDesignRun -WebUrl $h.SiteUrl
        if ($runs) {
            # Display Current Site Design Runs
            Write-Host $h.SiteUrl
            $runs | Format-List

            # Filter by ID
            $match = $runs | Where-Object {$_.SiteDesignID -eq $sitedesignid}
            if ($match) {
                # Push update
                Write-Host "Add-PnPSiteDesignTask $sitedesignid" -Fore Yellow
                Add-PnPSiteDesignTask -SiteDesignId $sitedesignid -WebUrl $s.Url
            }
        }
    }
}

Function Main() {
    Connect-PnPOnline -Url $orgurl -ClientId $appId -ClientSecret $appSecret

    # Menu - Required choice
    if (!$DeleteNavNodes -and !$UpdateNavNodes) {
        Write-Host " --- Required parameter missing.  Run again with either -DeleteNavNodes or -UpdateNavNodes" -Fore Red
    }

    # Menu - Route with choice
    if ($DeleteNavNodes) {
        DeleteHubNavNodes
    }
    if ($UpdateNavNodes) {
        UpdateHubNavNodes
    }
}

# Open Log
$prefix = $MyInvocation.MyCommand.Name
$host.UI.RawUI.WindowTitle = $prefix
$stamp = Get-Date -UFormat "%Y-%m-%d-%H-%M-%S"
Start-Transcript "$PSScriptRoot\log\$prefix-$stamp.log"
$start = Get-Date

Main

# Close Log
$end = Get-Date
$totaltime = $end - $start
Write-Host "`nTime Elapsed: $($totaltime.tostring("hh\:mm\:ss"))"
Stop-Transcript