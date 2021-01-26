# Provision document library and folder structure
# Source CSV = GoFreshHomes-Create-Document-Libraries
# Destination URL = https://gofreshhomes.sharepoint.com/sites/Sandbox

# https://gofreshhomes.sharepoint.com/sites/Dataroomdocuments/_layouts/15/appregnew.aspx
#
# The app identifier has been successfully created.
# Client Id:  	97eb3212-7013-4266-8963-94b7961ae665
# Client Secret:  	aFjJsj1Mx1cEfAv1cetYlofcmZsSF589XKog1lvOBeE=
# Title:  	PowerShell
# App Domain:  	localhost
# Redirect URI:  	https://localhost

# Modules
# from https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets?view=sharepoint-ps
Import-Module "SharePointPnPPowerShellOnline" -ErrorAction SilentlyContinue | Out-Null

function  Main {
    # Connect
    $url            = "https://gofreshhomes.sharepoint.com/sites/VREPM"
    $ClientId       = "c2a1580d-b191-4371-8fba-e80ac3b410ad"
    $ClientSecret   = "YTifhe97GHqK38/zXar0nkKX0vgMoE7+1kK/VIAwmXc="
    Connect-PNPOnline -Url $url -ClientId $ClientId -ClientSecret $ClientSecret
    
    # Create library if missing
    $rows = Import-Csv "GoFreshHomes-Create-Document-Libraries.csv"
    $libs = $rows | Select-Object "Library" -Unique
    foreach ($row in $libs) {

        # Create Library if missing
        $title = $row.Library
        Write-Host $title -ForegroundColor Green
        $found = Get-PnPList $title
        if (!$found) {
            $web = Get-PNPWeb
            $found = New-PNPList -Title $title -Template "DocumentLibrary" -Web $web
        }
        $sru    = $found.RootFolder.ServerRelativeUrl 
        $fru    = $found.RootFolder.Name

        # Create Folder1 if missing
        $match  = $rows |? {$_.Library -eq $title}
        $subs   = $match | Select-Object "Folder1" -Unique
        foreach ($s in $subs) {
            $folder1 = $s.Folder1
            Write-Host $folder1 -ForegroundColor Green
            $path = $sru
            $found = Get-PnPFolder "$path/$folder1" -ErrorAction SilentlyContinue
            if (!$found) {
                Add-PNPFolder -Name $folder1 -Folder $fru
            }
        
            # Create Folder2 if missing
            $match  = $rows |? {$_.Library -eq $title}
            $subs   = $match | Select-Object "Folder2" -Unique
            foreach ($s in $subs) {
                $folder2 = $s.Folder2
                Write-Host $folder2 -ForegroundColor Green
                $path = "$sru/$folder1"
                $found = Get-PnPFolder "$path/$folder2" -ErrorAction SilentlyContinue
                if (!$found) {
                    $found = Add-PNPFolder -Name $folder2 -Folder "$fru/$folder1"
                }

                # Create subfolder if missing

                # CREATE
                #OLD $subs    = "Tenant,Finance,Archive,History,Other".Split(",")
                $subs = "Tenant,Asset-Unit".Split(",")
                foreach ($s in $subs) {
                    Write-Host $s -ForegroundColor Green
                    $path = "$sru/$folder1/$folder2"
                    $found = Get-PnPFolder "$path/$s" -ErrorAction SilentlyContinue
                    if (!$found) {
                        Add-PNPFolder -Name $s -Folder "$fru/$folder1/$folder2"
                    }
                }

                # DELETE
                $subs    = "Tenant,Finance,Archive,History,Other".Split(",")
                foreach ($s in $subs) {
                    Write-Host $s -ForegroundColor Yellow
                    $path = "$sru/$folder1/$folder2"
                    $found = Get-PnPFolder "$path/$s" -ErrorAction SilentlyContinue
                    if (!$found) {
                        Remove-PNPFolder -Name $s -Folder "$fru/$folder1/$folder2"
                    }
                }


            }
        }
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
