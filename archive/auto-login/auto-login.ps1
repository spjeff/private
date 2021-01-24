<#
.SYNOPSIS
	Auto Login - Open URL and login to website automatically.

.DESCRIPTION
	Invoke Internet Explorer COM object with populated user name and password then clicks submit button to continue.

.NOTES
	File Name		: auto-login.ps1
	Author			: Jeff Jones
	Version			: 0.15
	Last Modified	: 11-30-2017
#>

Param (
    [Parameter(Mandatory = $false, HelpMessage = "Create desktop icon")]
    [switch] $install
)

# global variables
$path = $MyInvocation.MyCommand.Path

function launch() {
    # URL
    $url = "https://incite.consumercare.net/bi/login"

    # Parameters
    $xe = New-Object -Com "InternetExplorer.Application"
    $xe.visible = $true
    $xe.silent = $true
	
    # Open Page
    $xe.Navigate($url)
    while ($xe.Busy) {
        [System.Threading.Thread]::Sleep(10)
    } 
    Start-Sleep 2

    # Populate text boxes
    $inputs = $xe.Document.IHTMLDocument3_getElementsByTagName("Input")
    $user = ($inputs |? {$_.id -eq "textfield-1012-inputEl"})
    $user.value = "login"
    $pass = ($inputs |? {$_.id -eq "textfield-1013-inputEl"})
    $pass.value = "pass"

    # Click submit
    $btn = $xe.Document.IHTMLDocument3_getElementByID("button-1015")
    $btn.Click()
}

function install() {
    # Create desktop shortcut
    $folder = [Environment]::GetFolderPath("Desktop")
    $Target = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
    $ShortcutFile = "$folder\View INCITE Reports.lnk"
    $WScriptShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
    $Shortcut.Arguments = $path
    $Shortcut.IconLocation = "imageres.dll, 22"
    $Shortcut.TargetPath = $Target
    $Shortcut.Save()
}

# Main
if ($install) {
    install
}
else {
    launch
}