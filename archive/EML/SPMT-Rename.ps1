# from https://support.microsoft.com/en-us/office/invalid-file-names-and-file-types-in-onedrive-and-sharepoint-64883a5d-228e-48f5-b3d2-eb39e07630fa?ui=en-us&rs=en-us&ad=us
$sourceFolders = @("")
$chars = '"*:<>?/\|'

function Main() {
foreach ($s in $sourceFolders) {
    $files = Get-ChildItem $s -Recurse -Filter $chars
    foreach ($f in $files) {
            #  Have invalid characters
            Write-Host $f.Name + " -- " + $newname -Fore Yellow
            $newname = $f.Name.Replace("""*:<>?/\|","_");
            Rename-Item $f.Name $newname
        }
    }
}
Start-Transcript
Main
Stop-Transcript