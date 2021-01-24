Add-PSSnapin microsoft.sharepoint.powershell

function FixPerms($permissions) {
    #$FullControlRole = $web.RoleDefinitions["Full Control"]
    #$ReadRole = $web.RoleDefinitions["AddOnly"]
    
    foreach ($assignment in $permissions) {
        $assignment.RoleDefinitionBindings.RemoveAll()    
        #$assignment.RoleDefinitionBindings.Remove($FullControlRole);
        #$assignment.RoleDefinitionBindings.Add($ReadRole);
        $assignment.Update()        
    }   
    write-host "Fixed permissions"     
}

function AddGroup($thing) {
  #Add SP group with Full Control
    $FullControlRole = $web.RoleDefinitions["Contribute"]

    $groups = "myConnection Owners".split(",")
    foreach($g in $groups) {
        $group = $web.SiteGroups[$g]
        $groupRole = New-Object Microsoft.SharePoint.SPRoleAssignment($group)
        $groupRole.RoleDefinitionBindings.Add($FullControlRole)
        $thing.RoleAssignments.Add($groupRole)  
        write-host "Added group"
    }
}

$systemlibs = @("")
$web = get-spweb "https://myconnection.aarcorp.com"
$lib = $web.lists["GuidesForm"]
   
   
    #Check all files
    # Initialize Tracking
    $start = Get-Date
    $i = 0
    $total = $lib.ItemCount
	$active = 0
	$notactive = 0
	
	# Loop
    foreach ($item in $lib.items) {
        
	# Progress Tracking
	$i++
	$prct = [Math]::Round((($i / $total) * 100.0), 2)

	$elapsed = (Get-Date) - $start
	$totalTime = ($elapsed.TotalSeconds) / ($prct / 100.0)
	$remain = $totalTime - $elapsed.TotalSeconds
	$eta = (Get-Date).AddSeconds($remain)

	# Display
	$file = $item.ID
	Write-Progress -Activity "Perms $file ETA $eta" -Status "$prct" -PercentComplete $prct
			
        # Check metadata field
		if ($item.Properties["Active"]) {
			$active++
			write-host "Inherit Active perms:" $item.ID $item.Name -Fore Yellow
			# ACTIVE - INHERIT PERM
			if ($item.HasUniqueRoleAssignments) {
				$item.ResetRoleInheritance();
			}
		
		} else {
			$notactive++
			# NOT ACTIVE - Set Owners group Full Control
			if (!$item.HasUniqueRoleAssignments) {
				#REM $item.BreakRoleInheritance($false);
			}
			if ($item.HasUniqueRoleAssignments -eq "False") {
				write-host "Fix item perms:"  $item.ID $item.Name -Fore Yellow
				$permissions = $item.RoleAssignments
				#REM FixPerms($permissions);
				#REM AddGroup($item);
			}
			
		}
        
}
write-host "`================"

write-host "active = $active" -Fore Green
write-host "notactive = $notactive" -Fore Green