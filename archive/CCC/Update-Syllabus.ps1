Import-Module SharePointPnPPowerShellOnline

Start-Transcript
$url = "https://cccedu.sharepoint.com/MXC/sip"
$app = "11a98606-94ad-43a9-b2e3-093b8538317c"
$secret = "QRdxSdwiDMtvdiPtqnE5VGADjijdLFqeOEJRyaq4b+U="
Connect-PnPOnline -Url $url -AppId $app -AppSecret $secret

<#
https://support.muhimbi.com/hc/en-us/articles/228090947-How-to-elevate-App-privileges-to-access-advanced-Features
<AppPermissionRequests AllowAppOnlyPolicy="true">
 <AppPermissionRequest Scope="http://sharepoint/content/sitecollection" Right="FullControl" />
</AppPermissionRequests>
#>

$old = Get-PnPListItem -List "Syllabus-030119" -PageSize 9999 -Fields "Course_x0020_ID,Course_x0020_Objectives,Student_x0020_Learning_x0020_Out".split(",")
$new = Get-PnPListItem -List "Syllabus-050619" -PageSize 9999 -Fields "Course_x0020_ID,Course_x0020_Objectives,Student_x0020_Learning_x0020_Out".split(",")

foreach ($n in $new) {
    $id = $n.Id
    $courseID = $n.FieldValues["Course_x0020_ID"]
    Write-Host "Checking $id ... " -NoNewline
    $match = $old |? { $_.FieldValues["Course_x0020_ID"] -eq $n.FieldValues["Course_x0020_ID"]}
    if ($match -is [array]) {
        $match = $match[0]
    }
    if ($match) {
        Write-Host " - FOUND - $courseID" -Fore Yellow
        $hash = @{"Course_x0020_Objectives" = $match.FieldValues["Course_x0020_Objectives"]; "Student_x0020_Learning_x0020_Out" = $match.FieldValues["Student_x0020_Learning_x0020_Out"] }
        $hash | ft
        Set-PnPListItem -Identity $id -List "Syllabus-050619" -Values $hash
    }
    else {
        Write-Host " -  NOT FOUND" -Fore Blue
    }
}
Stop-Transcript