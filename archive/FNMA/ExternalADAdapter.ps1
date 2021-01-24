<#
.DESCRIPTION
	This script provides provisioning functions used by IAM to manage AD, Exchange, and File systems.
	
	Requires ADsSecurity.dll (v1.0.0.1), CDO.dll (v6.5.6980.74), CDOEX.DLL (v6.0.6487.1).
'								Requires permissions to query Exchange servers and query drive size on remote servers
'								Requires permissions to create folders on remote servers
.EXAMPLE
' FUNCTION USAGE:
'		****IMPORTANT****
'			Note the number of arguments expected.  Any number less or greater than this number will cause the script to exit.
'			Note the order of the arguments, do not pass arguments in any other order than specified below.
'			Note that all arguments MUST be included in quotes and are separated by spaces.
'			Note that the first argument for any function MUST always be the name of the function you wish to call.
'			The script will return error codes for any function: 0=successful / 1=unsuccessful
'		****IMPORTANT****
'
' arg1 = "<function_name>"
'				Function Name:	CreateHomeDirectory
'					Number of arguments expected: 	2
'					Expected arguments:
' arg2 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com
' arg3 = Folder path to create in the format of \\fanniemae.com\corp\<region>\<sAMAccountName>
'					Example:
' <script_name>.ps1 "CREATEHOMEDIRECTORY" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com" "\\fanniemae.com\corp\dc\users\usr10\s6uezc"
'
'				Function Name:	GetExchangeStore
'					Number of arguments expected: 	0
'					Example:
' <script_name>.ps1 "GETEXCHANGESTORE"
'					Output:
'						CN=XSG1MBX3,CN=EXVXSG1,CN=InformationStore,CN=EXVX,CN=Servers,CN=First Administrative Group,CN=Administrative Groups,CN=FannieMaeX,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=fanniemaex,DC=com
'
'				Function Name:	ManageGroupMBXSG
'					Case CREATE
'						Number of arguments expected: 	2
'						Expected arguments:
'							arg2 = CREATE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'						Example:
' <script_name>.ps1 "MANAGEGROUPMBXSG" "CREATE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com"
'					Case DELETE
'						Number of arguments expected: 	3
'						Expected arguments:
'							arg2 = DELETE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'							arg4 = sAMAccountName
'						Example:
' <script_name>.ps1 "MANAGEGROUPMBXSG" "DELETE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com" "s6uezc"
'
'				Function Name:	ManagePCBackup
'					Case ENABLE
'						Number of arguments expected: 	2
'						Expected arguments:
'							arg2 = ENABLE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'						Example:
' <script_name>.ps1 "MANAGEPCBACKUP" "ENABLE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com"
'					Case DISABLE
'						Number of arguments expected: 	2
'						Expected arguments:
'							arg2 = DISABLE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'						Example:
' <script_name>.ps1 "MANAGEPCBACKUP" "DISABLE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com"
'
.NOTES  
	File Name:  ExternalADAdapter.ps1
	Author   :  Jeff Jones  - jeff_jones@fanniemae.com
	Version  :  1.0
	Modified :  2020-02-19
#>

[CmdletBinding()]
param (
    [string]$function,
    [string]$adsPath,
    [string]$adsPath2
)




Function Main() {
    if (!$function -or !$adsPath -or !$adsPath2) {
        # Missing Required Argument
        Exit
    }
    $workingFolder = $MyInvocation.MyCommand.Path
    $MailboxGroupsOU = "OU=Mailbox Groups,OU=Groups,DC="
    $UserRegion = ""

    #Constants used for E2K7 (Exchange 2007) changes	
    $DEFAULT_REGION = ";DC"
    $CONFIG_REGION_DELIMITER = ";|"
    $CONFIG_VALUE_DELIMITER = ";,"
    $MDBSIZE_VALUE_DELIMITER = ";|"
    $FILE_E2K7_CONFIG = ";ExchangeConfig.txt"
    $FILE_E2K7_DBSIZE = ";MDBSize.txt"
    $FILE_EXCL_DB = ";ExchangeExclDBConfig.txt"
    

}

Function FilesPrepared() {

}
Function ReadMBXSizesFile() {
    
}
Function GetServerFromFile() {
    
}
Function SetExchangeQuery() {
    
}
Function GetStoreFromExchange() {
    
}
Function CreateHomeDirectory() {

}
Function addace($dacl, $UserADsPath, $aceflags) {

}
Function ReorderDacl( $dacl ) {

}
Function DisablePCBackup($UserADsPath) {

}
Function EnablePCBackup($UserADsPath) {

}
Function GetBackupGroupToUse() { }
Function QCBackup() { }
Function GetPCBackupGroups() { }
Function AddMember() { }
Function RemoveMember() { }
Function EnumMembers() { }
Function ManageGroupMBXSG($sAction, $UserADsPath, $ssAMAccountName)
Function ParseADsPath() { }
Function LogLine() { }
Function CreateADOConnection() { }
Function GetUserGroupMembership() { }
Function ConvertAndSortADsPaths() { }
Function GetCN() { }
Function GetExcludeExchangeDB() { }

# Main
$stamp = (Get-Date).ToString().Replace("/", "-").Replace(":", "-")
Start-Transcript "ExternalADAdapter-$stamp.log"
Main
Stop-Transcript