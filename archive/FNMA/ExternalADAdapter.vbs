FM@All: '==========================================================================
'
' NAME: ExternalADAdapter.vbs
'
' AUTHOR:  Edward Cevallos, Fannie Mae
' DATE  :  12/17/2006
' VERSION: 1.0.0004
'
' COMMENT: This script provides provisioning functions used by IAM to manage AD, Exchange, and File systems.
'
' REQUIREMENTS: Requires ADsSecurity.dll (v1.0.0.1), CDO.dll (v6.5.6980.74), CDOEX.DLL (v6.0.6487.1).
'								Requires permissions to query Exchange servers and query drive size on remote servers
'								Requires permissions to create folders on remote servers
'
' USAGE: ExternalADAdapater.vbs <function_name> "arg1" "arg2" "arg3"
' <function_name> = this is the name of the function as defined by the Select Case UCase(sFunctionName) function defined below
'					arg1, arg2, arg3, etc... = these are the arguments required by the function being called. Note that the iExpectedArgs variable below
'																			controls the number of arguments to expect and therefore any number below or greater than this is ignored
'
'
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
'
'				Function Name:	CreateHomeDirectory
'					Number of arguments expected: 	2
'					Expected arguments:
' arg2 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com
' arg3 = Folder path to create in the format of \\fanniemae.com\corp\<region>\<sAMAccountName>
'					Example:
' <script_name>.vbs "CREATEHOMEDIRECTORY" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com" "\\fanniemae.com\corp\dc\users\usr10\s6uezc"
'
'				Function Name:	GetExchangeStore
'					Number of arguments expected: 	0
'					Example:
' <script_name>.vbs "GETEXCHANGESTORE"
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
' <script_name>.vbs "MANAGEGROUPMBXSG" "CREATE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com"
'					Case DELETE
'						Number of arguments expected: 	3
'						Expected arguments:
'							arg2 = DELETE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'							arg4 = sAMAccountName
'						Example:
' <script_name>.vbs "MANAGEGROUPMBXSG" "DELETE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com" "s6uezc"
'
'				Function Name:	ManagePCBackup
'					Case ENABLE
'						Number of arguments expected: 	2
'						Expected arguments:
'							arg2 = ENABLE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'						Example:
' <script_name>.vbs "MANAGEPCBACKUP" "ENABLE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com"
'					Case DISABLE
'						Number of arguments expected: 	2
'						Expected arguments:
'							arg2 = DISABLE
' arg3 = ADsPath in the format of LDAP://<domain_controller_name>/CN=User,OU=Location,DC=fanniemae,DC=com (LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com)
'						Example:
' <script_name>.vbs "MANAGEPCBACKUP" "DISABLE" "LDAP://ADRSTOOL/CN=Edward Cevallos,OU=Regular,OU=Accounts,OU=DC,DC=fanniemae,DC=com"
'
'
'	**************************
'				DISCLAIMER:	Unapproved code changes will not be supported.  Please contact the Author of this script for approval.
'	**************************
'==========================================================================


'*******DO NOT MODIFY THESE LINES************
' #region Persistent fold Script Initialization
	If WScript.Arguments.Count = 0 Then WScript.Quit
	Dim workingFolder
		workingFolder = Left(WScript.ScriptFullName,InstrRev(Wscript.ScriptFullName,"\"))
	Dim domainController,strDomain,netBIOSName
	Const bOnErrorEnabled = True
	
	Dim MailboxGroupsOU
		MailboxGroupsOU = "OU=Mailbox Groups,OU=Groups,DC="

	Dim MBXSizesFile,MBXSortedFile,MBXLockFile,internalLogFile
	
	Dim UserRegion
		UserRegion = ""

	Dim FSO
		Set FSO = CreateObject("Scripting.FileSystemObject")
' #endregion

	'The first argument in the script should be the function requested. Modify the Select statement below to add/remove functions
	' iExpectedArgs below is the number of arguments expected argument AFTER the function name argument

	'controls the refresh frequency of the exchange store file. Do NOT set this number to less than 60.
	'Const FILE_REFRESH_MINUTES = 60
	
	'Constants used for E2K7 (Exchange 2007) changes	
	CONST DEFAULT_REGION = "DC"
	CONST CONFIG_REGION_DELIMITER = "|"
	CONST CONFIG_VALUE_DELIMITER = ","
	CONST MDBSIZE_VALUE_DELIMITER = "|"
	CONST FILE_E2K7_CONFIG = "ExchangeConfig.txt"
	CONST FILE_E2K7_DBSIZE = "MDBSize.txt"
	CONST FILE_EXCL_DB = "ExchangeExclDBConfig.txt"

	
	'FSO related constants
	CONST TristateUseDefault = -2, TristateTrue = -1, TristateFalse = 0
	CONST ForReading = 1, ForWriting = 2, ForAppending = 8	

	sFunctionName = UCase(WScript.Arguments.Item(0))
	internalLogFile = workingFolder & sFunctionName & ".log"
	Select Case UCase(sFunctionName)
		Case "CREATEHOMEDIRECTORY"
			iExpectedArgs = 2
If WScript.Arguments.Count <> iExpectedArgs + 1 Then WScript.Quit

			sADsPath = Trim(WScript.Arguments.Item(1))
			sFolderPath = Trim(WScript.Arguments.Item(2))
			If sADsPath = "" Or sFolderPath = "" Then WScript.Quit
			retVal = CreateHomeDirectory(sADsPath,sFolderPath)
		Case "MANAGEPCBACKUP"
			iExpectedArgs = 1
If WScript.Arguments.Count <> iExpectedArgs + 2 Then WScript.Quit
			sADsPath = Trim(WScript.Arguments.Item(2))
			If sADsPath = "" Then WScript.Quit
			Select Case UCase(WScript.Arguments.Item(1))
				Case "ENABLE"
					retVal = EnablePCBackup(sADsPath)
				Case "DISABLE"
					retVal = DisablePCBackup(sADsPath)
			End Select
		Case "GETEXCHANGESTORE"
			iExpectedArgs = 1
If WScript.Arguments.Count <> iExpectedArgs + 1 Then WScript.Quit

			'Read passed user region
			UserRegion = UCase(WScript.Arguments.Item(1))

			'Construct appropriate MBX file names, per User Region passed
			MBXSizesFile = workingFolder & "MBXSizes_" & UserRegion & ".txt"
			MBXSortedFile = workingFolder & "MBXSort_" & UserRegion & ".txt"
			MBXLockFile = workingFolder & "MBXSizes_" & UserRegion & ".lck"

			'sStorePath = (GetServerFromFile() & "")
			sStorePath = (ReadMBXSizesFile() & "")
			
			If sStorePath = "" Then sStorePath = (GetStoreFromExchange() & "")
If sStorePath <> "" Then
				If bOnErrorEnabled then On Error Resume Next
					WScript.StdOut.Write sStorePath
If Err.Number <> 0 Then
						Call LogLine(internalLogFile,"Please change default script host to cscript by running 'cscript //h:cscript' from a command prompt")
						retVal = False
					Else
						Wscript.Quit
					End If
				On Error GoTo 0
			Else
				retVal = False
			End If
			Set FSO = Nothing
		
		Case "GENERATEMBXFILE"
		
			iExpectedArgs = 1
If WScript.Arguments.Count <> iExpectedArgs + 1 Then WScript.Quit
		
			'Read passed user region
			UserRegion = UCase(WScript.Arguments.Item(1))

			'Construct appropriate MBX file names, per user region passed
			MBXSizesFile = workingFolder & "MBXSizes_" & UserRegion & ".txt"
			MBXSortedFile = workingFolder & "MBXSort_" & UserRegion & ".txt"
			MBXLockFile = workingFolder & "MBXSizes_" & UserRegion & ".lck"		
	
			'Invoke method to generate MBX Sizes file, per user region passed
			GetStoreFromExchange()
			
If Err.Number <> 0 Then
				Call LogLine(internalLogFile, "Error occurred in GENERATEMBXFILE")
				retVal = False
			Else
				Wscript.Quit
			End If
		
		Case "MANAGEGROUPMBXSG"
If WScript.Arguments.Count < 2 Then WScript.Quit
			Select Case UCase(WScript.Arguments.Item(1))
				Case "CREATE"
					iExpectedArgs = 1
If WScript.Arguments.Count <> iExpectedArgs + 2 Then WScript.Quit
					sADsPath = Trim(WScript.Arguments.Item(2))
					If sADsPath = "" Then WScript.Quit
					retVal = ManageGroupMBXSG("CREATE",sADsPath,"")
				Case "DELETE"
					iExpectedArgs = 2
If WScript.Arguments.Count <> iExpectedArgs + 2 Then WScript.Quit
					sADsPath = Trim(WScript.Arguments.Item(2))
					ssAMAccountName = Trim(WScript.Arguments.Item(3))
					If sADsPath = "" Or ssAMAccountName = "" Then WScript.Quit
					retVal = ManageGroupMBXSG("DELETE",sADsPath,ssAMAccountName)
			End Select
		Case Else
			WScript.Quit
	End Select
'*******DO NOT MODIFY THESE LINES************

Set FSO = Nothing
Select Case retVal
	Case True
		WScript.StdOut.Write "Success"
	Case Else
		WScript.StdOut.Write "Error"
End Select
WScript.Quit


'DO NOT MODIFY ANYTHING BELOW THIS LINE
' #region Persistent fold Constants
Const adUseClient = 3
Const adNumeric = 131
Const adDecimal = 14
Const adInteger = 3
Const adVarChar = 200
Const adDouble = 5

Const ERROR_NONE_MAPPED = 1332

Const MAX_RETRIES = 190 'controls number of times to try before exiting (in seconds)

Const ADS_RIGHT_GENERIC_READ        = &H80000000     'bit number 31
'Const RIGHT_FULL_FANNIEMAE = CLng(1245695)
'Const RIGHT_READ_ONLY = CLng(1179817)
Const RIGHT_FULL_FANNIEMAE = &H1301FF
Const RIGHT_READ_ONLY = &H1200A9
'RIGHT_READ_WRITE should equal RIGHT_FULL_FANNIEMAE
Const RIGHT_READ_WRITE = &H1301FF

'ADS Constants
Const ADS_ACETYPE_ACCESS_ALLOWED        = &h0
Const ADS_ACETYPE_ACCESS_ALLOWED_OBJECT = &h5
Const ADS_ACETYPE_ACCESS_DENIED         = &H1
Const ADS_ACETYPE_ACCESS_DENIED_OBJECT  = &H6
Const ADS_ACEFLAG_SUB_NEW               = 9
Const ADS_ACEFLAG_INHERIT_ACE      			= &h2
Const ADS_ACEFLAG_INHERITED_ACE         = &H10

Const ADS_RIGHT_DS_CREATE_CHILD        = &h1
Const ADS_RIGHT_DS_CONTROL_ACCESS = &h100

Const ADS_RIGHT_EXCH_READ_PERMISSIONS = 131072

Const ADS_GROUP_TYPE_GLOBAL_GROUP = &H2
Const ADS_GROUP_TYPE_DOMAIN_LOCAL_GROUP = &H4
Const ADS_GROUP_TYPE_UNIVERSAL_GROUP = &H8
Const ADS_GROUP_TYPE_SECURITY_ENABLED = &H80000000

Const ADS_SID_SAM = 2
Const ADS_SID_ACTIVE_DIRECTORY_PATH = 6

'Exchange property constants
Const SEND_AS = "{AB721A54-1E2f-11D0-9819-00AA0040529B}"
Const MANAGED_BY = "{0296C120-40DA-11D1-A9C0-0000F80367C1}"

Const PCBACKUP_DFS_SUFFIX = "\USERS\PCBackup\"
' #endregion

' #region Persistent fold GET EXCHANGE STORE FUNCTIONS
	Function FilesPrepared()
		FilesPrepared = False
		If FSO.FileExists(MBXSortedFile) AND Not(FSO.FileExists(MBXLockFile)) then
			Set SortFile = FSO.GetFile(MBXSortedFile)
				If FSO.FileExists(MBXSizesFile) then
					Set SizesFile = FSO.GetFile(MBXSizesFile)
If SizesFile.Size < SortFile.Size then
							SizesFile.Delete
							SortFile.Move MBXSizesFile
						Else
							SortFile.Delete
						End If
					Set SizesFile = Nothing
				End If
			Set SortFile = Nothing
		End If
	
		If FSO.FileExists(MBXLockFile) then
While Err.Number <> 0
				If bOnErrorEnabled then On Error Resume Next
					Set CheckLockFile = fso.GetFile(MBXLockFile)
				On Error Goto 0
				Sleep 2
			Wend
		End If
		Err.Clear
		Set CheckLockFile = Nothing
		FilesPrepared = True
	End Function
	
	
	'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	'Author: Maneesh Prakash
	'Date: 12/8/2010
	'Description: Reads the MBXSizes file for the passed region. 
	'Each row in this file is in the following format:
'<StorePath>vbTab<StoreName>vbTab<StoreSize>vbTab<TotalMailboxes>
'This method attempts to read the value of the <StorePath> attribute for the top row in the file. 
	'This method will render the GetServerFromFile() method obsolete.
	'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''	
	Function ReadMBXSizesFile()
		
		'Initialize return value to empty string
		ReadMBXSizesFile = ""
		
		'Declare and initialize local variables
		Dim strLine, storePath
		strLine = ""
		storePath = ""		
	
		'ensure the file exists
		If Not(FSO.FileExists(MBXSizesFile)) Then Exit Function
		
		'Ensure file has non-zero size
		If FSO.GetFile(MBXSizesFile).Size = 0 Then Exit Function
		
		'Open file and get the TextStream object
		Dim txtStream
		Set txtStream = FSO.OpenTextFile(MBXSizesFile, ForReading, FALSE)
		
		'Read the first line of the file
		strLine = txtStream.ReadLine
		
		'Close TextStream object
		txtStream.Close
		Set txtStream = Nothing
		
'Read the <StorePath> attribute
		storePath = Split(strLine,vbTab)(0)
		
If (storePath <> "") Then 
		 ReadMBXSizesFile = storePath
		End If
		
	End Function	
	
	' Note: this function is not used anymore
	Function GetServerFromFile()
		GetServerFromFile = ""
	
		If Not(FilesPrepared) Then Exit Function
		
		If Not(FSO.FileExists(MBXSizesFile)) Then Exit Function
		'If DateDiff("n",FSO.GetFile(MBXSizesFile).DateLastModified,Now) &gt;= FILE_REFRESH_MINUTES Then Exit Function
		If FSO.GetFile(MBXSizesFile).Size = 0 Then Exit Function
	
		Set MBXRS = CreateObject("ADODB.RecordSet")
			With MBXRS
				.Fields.Append "StorePath",adVarChar,1000
				.Fields.Append "StoreName",adVarChar,200
				.Fields.Append "StoreSize",adDouble
				.Fields.Append "TotalMailboxes",adInteger
				.CursorLocation = adUseClient
				.Open
			End With
	
			strAllLines = Split(FSO.OpenTextFile(MBXSizesFile,1,FALSE).ReadAll,vbCrLf)
			For Each line in strAllLines
If Trim(line) <> "" AND Instr(1,line,vbTab,vbTextCompare) <> 0 Then
					With MBXRS
						.AddNew
						.Fields("StorePath").Value = Split(line,vbTab)(0)
						.Fields("StoreName").Value = Split(line,vbTab)(1)
If Trim(Split(line,vbTab)(2)) <> "" then .Fields("StoreSize").Value = Split(line,vbTab)(2)
If Trim(Split(line,vbTab)(3)) <> "" Then .Fields("TotalMailboxes").Value = Split(line,vbTab)(3)
						.Update
					End With
				End If
			Next
	
			If Not(MBXRS.BOF) AND Not(MBXRS.EOF) Then
				With MBXRS
					.Sort = "StoreSize,TotalMailboxes,StorePath"
					.MoveFirst
					GetServerFromFile = .Fields("StorePath").Value
					.Fields("TotalMailboxes").Value = .Fields("TotalMailboxes").Value + 1
					.Sort = "StoreSize,TotalMailboxes,StorePath"
					.MoveFirst
				End With
	
				Set OutPutStream = fso.CreateTextFile(MBXSortedFile, 2)
					Do Until MBXRS.EOF
						OutPutStream.Writeline MBXRS.Fields("StorePath").Value & vbTab & MBXRS.Fields("StoreName").Value & vbTab & MBXRS.Fields("StoreSize").Value & vbTab & MBXRS.Fields("TotalMailboxes").Value
						MBXRS.MoveNext
					Loop
					OutPutStream.close
				Set OutPutStream = Nothing
			End If
		Set MBXRS = Nothing
	
		If FSO.FileExists(MBXSizesFile) Then Call FSO.GetFile(MBXSizesFile).Delete
		If FSO.FileExists(MBXSortedFile) Then Call FSO.GetFile(MBXSortedFile).Move(MBXSizesFile)
	End Function
	
	
	'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	'Author: Maneesh Prakash
	'Date: 10/25/2010
	'Description: creates the filters (where clause) for the query to be 
	'executed against AD for Exchange data, per passed region parameter
'Returns output string in the following format: "<Cluster Filter>||<Mailstore Filter>"
	'used/invoked by method GetStoreFromExchange
	'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	Function SetExchangeQuery()
	
		SetExchangeQuery = ""
	
		Dim sRegion
		Dim ExchangeConfigFile
		Dim allConfigText, allConfig, config
		Dim region, clusterName
		Dim defaultClusterName
		Dim regionMatch
		
		'Read input parameters passed to the script
		sRegion = UCase(WScript.Arguments.Item(1))
		
		ExchangeConfigFile = workingFolder & FILE_E2K7_CONFIG
		If Not(FSO.FileExists(ExchangeConfigFile)) Then Exit Function
		
		'open config file
		allConfig = Split(FSO.OpenTextFile(ExchangeConfigFile,1,FALSE).ReadAll,CONFIG_REGION_DELIMITER)
	
		Dim ClusterFilter
		ClusterFilter = "objectCategory='msExchExchangeServer' AND msExchCurrentServerRoles=2 AND msExchClusterStorageType=1 "
		
		regionMatch = False
		
		'parse the config file
		For Each config in allConfig
If config <> "" Then
				'each config entry is separated by a pipe
'config file is in the following format: <region>,<clustername>|<region>,<clustername>|.....
				region = Trim(Split(config,CONFIG_VALUE_DELIMITER)(0))
				clusterName = Trim(Split(config,CONFIG_VALUE_DELIMITER)(1))
			
				'parse the config file to append the check for the cluster name (begins with) 
				'pattern to the filters (where clause) where region matches the passed region
				If region = sRegion Then
					regionMatch = True
					ClusterFilter = ClusterFilter & "AND cn='" & clusterName & "*' "
				End if
				
				'determine cluster name corresponding to default region
				If region = DEFAULT_REGION Then
					defaultClusterName = clusterName
				End if
				
			End If
		Next
		
		'in case there is no match for the passed region, use the default cluster name (begins with) pattern
		If Not regionMatch Then
			ClusterFilter = ClusterFilter & "AND cn='" & defaultClusterName & "*' "
		End If
		
		SetExchangeQuery = ClusterFilter
	End Function

	Function GetStoreFromExchange()
		GetStoreFromExchange = ""
		
		'logic for adjusting query per user region
		Dim clusterFilter
		clusterFilter = SetExchangeQuery()

		Dim ExchangeRootDSE
Set rootDSE = GetObject("LDAP://rootDSE")
			strDomain = rootDSE.Get("defaultNamingContext")
			DomainController = Replace(Split(rootDSE.Get("serverName"), ",")(0),"CN=","")
			ExchangeRootDSE = rootDSE.Get("configurationNamingContext")
		Set rootDSE = Nothing

		Dim oStoresRS
		Set oStoresRS = CreateObject("ADODB.RecordSet")
			With oStoresRS
				.Fields.Append "StorePath",adVarChar,1000
				.Fields.Append "StoreName",adVarChar,200
				.Fields.Append "StoreSize",adDouble
				.Fields.Append "TotalMailboxes",adInteger
				.CursorLocation = adUseClient
				.Open
			End With
	
			'Let's get the Exchange clusters first by looking for all computer names beginning with "EXV" and of type msExchExchangeServer
			Set objCommand = CreateADOConnection()
			'The following line will only work in Acceptance/Production
objCommand.CommandText = "SELECT ADsPath,cn,ServerRole,msExchMonitoringMode FROM 'LDAP://" & ExchangeRootDSE & "' WHERE " & clusterFilter & " ORDER BY cn"
			Set ServerRecordSet = objCommand.Execute 'get clusters: EXVA,EXVB,EXVC,EXVD,EXVX
			Do Until ServerRecordSet.EOF
				objCommand.CommandText = "SELECT ADsPath,cn FROM '" & ServerRecordSet.Fields("ADsPath").Value & "' WHERE objectClass='msExchStorageGroup' ORDER BY cn"
				Set SGRecordSet = objCommand.Execute 'get storagegroups
					If SGRecordSet.RecordCount = 0 Then Call LogLine(internalLogFile,"Could not retrieve any msExchStorageGroup records from '" & ServerRecordSet.Fields("ADsPath").Value & "'.  This may be a permissions issue.")
					Do Until SGRecordSet.EOF
objCommand.CommandText = "SELECT ADsPath,cn FROM '" & SGRecordSet.Fields("ADsPath").Value & "' WHERE objectClass='msExchPrivateMDB' AND cn<>'*Arch*' AND cn<>'*Tar*' ORDER BY cn"
						Set StoreRecordSet = objCommand.Execute 'get stores
						Do Until StoreRecordSet.EOF
StoreADsPath = Replace(StoreRecordSet.Fields("ADsPath").Value, "LDAP://", "")
objCommand.CommandText = "SELECT ADsPath,cn FROM 'LDAP://" & strDomain & "' WHERE homeMDB='" & StoreADsPath & "'"
							Set MBXRecordSet = objCommand.Execute 'get mailboxes
If MBXRecordSet.RecordCount <> 0 Then

								'construct identity in the following format: ClusterName\StorageGroupName\DatabaseName
								Dim psIdentity, psClusterName, psStorageGroup, psDatabaseName
								psClusterName = ServerRecordSet.Fields("cn").Value
								psStorageGroup = SGRecordSet.Fields("cn").Value
								psDatabaseName = StoreRecordSet.Fields("cn").Value
								psIdentity = psClusterName & "\" & psStorageGroup & "\" & psDatabaseName							
								
								' parse file with pattern for excluded databases
								GetExcludeExchangeDB()

								'get firtt exclusion string
								'get svp string
								'if !(db equal to first OR db equal to SVP)
								Dim frstStr, scndStr
								frstStr = Mid(GetExcludeExchangeDB,1,1)
								scndStr = Mid(GetExcludeExchangeDB,Instr(GetExcludeExchangeDB,"|")+1,1)
								'WScript.Echo frstStr
								'WScript.Echo scndStr 

if (Left(psDatabaseName,1) <>frstStr AND Left(psDatabaseName,1) <>scndStr) Then

'if Left(psDatabaseName,1) <>GetExcludeExchangeDB Then
								'Parse text file containing MDB Sizes in order to find a match for this identity in the PowerShell output file
								'and thus determine the corresponding database size
								'Sample File Format
								'"MailPathProp"|"dbsizeformatted"
								'"EXRSIAMVD01\First Storage Group\Mailbox Database"|""
								'"EXRSIAMVD01\First Storage Group\SG1"|"25,630.00"
								'We attempt to parse the above format here for a matching Identity
								
								Dim DBSizeFile, mdbStoreSize, DBSizeRows, DBSizeRow, Identity, DBSize
								mdbStoreSize = 0
								DBSizeFile = workingFolder & FILE_E2K7_DBSIZE
								If (FSO.FileExists(DBSizeFile)) Then
									DBSizeRows = Split(FSO.OpenTextFile(DBSizeFile, ForReading, FALSE, TristateUseDefault).ReadAll, vbCrLf)
								
									For Each DBSizeRow in DBSizeRows
If Trim(DBSizeRow) <> "" Then
											'Remove " characters, if any, in the Identity and Size values
											Identity = Replace(Trim(Split(DBSizeRow,MDBSIZE_VALUE_DELIMITER)(0)), """", "")
											DBSize = Replace(Trim(Split(DBSizeRow,MDBSIZE_VALUE_DELIMITER)(1)), """", "")
										
											'check for match
If ((Identity = psIdentity) And (DBSize <> "")) Then
												mdbStoreSize = DBSize
											End If
										End If
									Next								

								'insert outout record into recordset to be written
								oStoresRS.AddNew
								oStoresRS("StorePath").Value = StoreADsPath
								oStoresRS("StoreName").Value = StoreRecordSet.Fields("cn").Value
								oStoresRS("StoreSize").Value = mdbStoreSize
								oStoresRS("TotalMailboxes") = MBXRecordSet.RecordCount
								oStoresRS.Update


								End If
								
								End If  'if db doesn't start with J								
							
							End If
							Set MBXRecordSet = Nothing
							StoreRecordSet.MoveNext
						Loop
						SGRecordSet.MoveNext
					Loop
				Set SGRecordSet = Nothing
				ServerRecordSet.MoveNext
			Loop
		
			Set objCommand = Nothing
			Set objConn = Nothing
			Set oDictionary = Nothing
			Set ServerRecordSet = Nothing
			Set StoreRecordSet = Nothing
		
			oStoresRS.Sort = "TotalMailboxes,StoreSize,StoreName"
			If Not(oStoresRS.BOF) Then oStoresRS.MoveFirst
			
			If Not(oStoresRS.EOF) then
				Set OutPutStream = FSO.OpenTextFile(MBXSortedFile, 2, True)
					Do Until oStoresRS.EOF
						OutPutStream.Writeline oStoresRS.Fields("StorePath").Value & vbTab & oStoresRS.Fields("StoreName").Value & vbTab & oStoresRS.Fields("StoreSize").Value & vbTab & oStoresRS.Fields("TotalMailboxes").Value
						oStoresRS.MoveNext
					Loop
					OutPutStream.close
				Set OutPutStream = Nothing
		
				If FSO.FileExists(MBXSizesFile) Then Call FSO.GetFile(MBXSizesFile).Delete
				If FSO.FileExists(MBXSortedFile) Then Call FSO.GetFile(MBXSortedFile).Move(MBXSizesFile)
			End If
	
			If Not(oStoresRS.BOF) Then oStoresRS.MoveFirst
			Do Until oStoresRS.EOF
				GetStoreFromExchange = oStoresRS.Fields("StorePath").Value
				Exit Do
			Loop
		Set oStoresRS = Nothing
	End Function
'END GET EXCHANGE STORE FUNCTIONS
' #endregion

' #region Persistent fold CREATE HOME DIRECTORY FUNCTIONS
	Function CreateHomeDirectory(UserADsPath,strPath)
		Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
		If domainController = "" Then
			Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
			CreateHomeDirectory = False : Exit Function
		End If
		If bOnErrorEnabled then On Error Resume Next
		If Not(FSO.FolderExists(strPath)) Then
			FSO.CreateFolder UCase(strPath)
If Err.Number <> 0 then
				Call LogLine(internalLogFile,"Failed to create home directory '" & strPath & "'.")
				CreateHomeDirectory = False : Exit Function
			End If
		End If
		
		Err.Clear
		Set sec = CreateObject("ADsSecurity")
If Err.Number <> 0 Then
				Call LogLine(internalLogFile,"ADsSecurity object could not be created.  Please register appropriate DLL.")
				Set sec = Nothing
				Call FSO.DeleteFolder(strPath,True)
				CreateHomeDirectory = False : Exit Function
			End If
			Err.Clear
		
Set sd = sec.GetSecurityDescriptor("FILE://" & strPath)
If Err.Number <> 0 Then
					Call LogLine(internalLogFile,"Failed to get SecurityDescriptor for '" & strPath & "'.  Folder deleted.")
					Set sec = Nothing
					Set sd = Nothing
					Call FSO.DeleteFolder(strPath,True)
					CreateHomeDirectory = False : Exit Function
				End If

				Set dacl = sd.DiscretionaryAcl
					On Error GoTo 0
					retVal = addace(dacl,UserADsPath,ADS_ACEFLAG_SUB_NEW)
					If retVal Then
						retVal = addace(dacl,UserADsPath,ADS_ACEFLAG_INHERIT_ACE)
						If retVal Then
							For Each ace In dacl ' for some reason if ace includes "NT AUTHORITY" then existing ace does not get readded to dacl
								If Instr(UCase(ace.trustee),"NT AUTHORITY\") Then
									newtrustee=right(ace.trustee, len(ace.trustee)-instr(ace.trustee, "\"))
									ace.trustee=newtrustee
								End If
							Next
				
							Call ReorderDacl(dacl)

							retryCount = 0
							Do
								If bOnErrorEnabled then On Error Resume Next
									sd.DiscretionaryAcl = dacl
									sec.SetSecurityDescriptor sd
								  If Err.Number = 0 Then
								  	Err.Clear
									  Exit Do
									Else
							 			retryCount = retryCount + 1
										If retryCount = MAX_RETRIES Then Exit Do
									End If
								On Error GoTo 0
							Loop Until retryCount &gt;= MAX_RETRIES

							If Err.Number = 0 Then
								CreateHomeDirectory = True
							Else
								Call LogLine(internalLogFile,"Failed to add ACL to '" & strPath & "' for " & "'" & normalizedADsPath & "'.  Folder deleted.")
								Call FSO.DeleteFolder(strPath,True)
								CreateHomeDirectory = False
							End If
						Else
							Call LogLine(internalLogFile,"Failed to set home directory permissions (ACE: 2) to '" & strPath & "' for " & "'" & normalizedADsPath & "'.  Folder deleted.")
							Call FSO.DeleteFolder(strPath,True)
							CreateHomeDirectory = False
						End If
					Else
						Call LogLine(internalLogFile,"Failed to set home directory permissions (ACE: 1) to '" & strPath & "' for " & "'" & normalizedADsPath & "'.  Folder deleted.")
						Call FSO.DeleteFolder(strPath,True)
						CreateHomeDirectory = False
					End If
				Set dacl = Nothing
			Set sd = Nothing
		Set sec = Nothing
	End Function
	
	Function addace(dacl,UserADsPath,aceflags)
		Set Sid = CreateObject("AdsSid")
			If bOnErrorEnabled then On Error Resume Next
				SID.SetAs ADS_SID_ACTIVE_DIRECTORY_PATH,CStr(UserADsPath)
If Err.Number <> 0 Then Call LogLine(internalLogFile,"Failed on 'SID.SetAs ADS_SID_ACTIVE_DIRECTORY_PATH," & CStr(UserADsPath) & "'")
				addace = False
			On Error GoTo 0 

		  Set ace = CreateObject("AccessControlEntry")
			  retryCount = 0
			  Do
			  	If bOnErrorEnabled then On Error Resume Next
			  	Err.Clear
				  ace.Trustee = Sid.GetAs(ADS_SID_SAM)
				  If Err.Number = 0 Then
				  	With ace
					  	.AccessMask = RIGHT_FULL_FANNIEMAE
					  	.AceType = ADS_ACETYPE_ACCESS_ALLOWED
					  	.AceFlags = aceflags
					  End With
					  dacl.AddAce ace
					  addace = True
					  Exit Do
					Else
			 			retryCount = retryCount + 1
						addace = False
						If retryCount = MAX_RETRIES Then Exit Do
					End If
					On Error GoTo 0
				Loop Until retryCount &gt;= MAX_RETRIES
				On Error GoTo 0
		  Set ace = Nothing
		Set Sid = Nothing
	End Function

	Sub ReorderDacl( dacl )
		Set newdacl = CreateObject("AccessControlList")
			Set ImpDenyDacl = CreateObject("AccessControlList") 'implicit deny ace
			Set InheritedDacl = CreateObject("AccessControlList")
			Set ImpAllowDacl = CreateObject("AccessControlList") 'implicit allow aces
			Set ImpDenyObjectDacl = CreateObject("AccessControlList")
			Set ImpAllowObjectDacl = CreateObject("AccessControlList")
			
			For Each ace In dacl
				If ((ace.AceFlags And ADS_ACEFLAG_INHERITED_ACE) = ADS_ACEFLAG_INHERITED_ACE)Then
					InheritedDacl.AddAce ace
				Else
					Select Case ace.AceType
						Case ADS_ACETYPE_ACCESS_ALLOWED : ImpAllowDacl.AddAce ace
						Case ADS_ACETYPE_ACCESS_DENIED : ImpDenyDacl.AddAce ace
						Case ADS_ACETYPE_ACCESS_ALLOWED_OBJECT : impAllowObjectDacl.AddAce ace
						Case ADS_ACETYPE_ACCESS_DENIED_OBJECT : ImpDenyObjectDacl.AddAce ace
						Case Else
					End Select
				End If
			Next
			
			' Combine the ACEs in the proper order : Implicit Deny, Implicit Deny Object, Implicit Allow, Implicit Allow Object, Inherited aces
			For Each ace In ImpDenyDacl : newdacl.AddAce ace : Next
			For Each ace In ImpDenyObjectDacl : newdacl.AddAce ace : Next
			For Each ace In ImpAllowDacl : newdacl.AddAce ace : Next
			For Each ace In impAllowObjectDacl : newdacl.AddAce ace : Next
			For Each ace In InheritedDacl : newdacl.AddAce ace : Next
			
			Set InheritedDacl     = Nothing
			Set ImpAllowDacl      = Nothing
			Set ImpDenyObjectDacl = Nothing
			Set ImpDenyDacl       = Nothing
			
			newdacl.AclRevision = dacl.AclRevision
			Set dacl = nothing
		  Set dacl = newdacl
		Set newdacl = Nothing
	End Sub
'END CREATE HOME DIRECTORY FUNCTIONS
' #endregion

' #region Persistent fold MANAGEPCBACKUP Functions

Function DisablePCBackup(UserADsPath)
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		DisablePCBackup = False : Exit Function
	End If
	
Set rootDSE = GetObject("LDAP://rootDSE")
		strDomain = rootDSE.Get("defaultNamingContext")
		netBIOSName = Replace(Split(strDomain,",DC=")(0),"DC=","",1,1,vbTextCompare)
	Set rootDSE = Nothing
	
	If bOnErrorEnabled then On Error Resume Next
		Set oUser = GetObject(UserADsPath)
If Err.Number <> 0 Then
				Call LogLine(internalLogFile,"Failed to get user object: '" & UserADsPath & "'")
				Set oUser = Nothing
				DisablePCBackup = False : Exit Function
			End If
			oUser.GetInfo()
			sAMAccountName = oUser.sAMAccountName
		Set oUser = Nothing
	On Error GoTo 0

	Set oMemberOf = CreateObject("Scripting.Dictionary")
		oMemberOf.CompareMode = vbTextCompare

	usersGroupMembership = GetUserGroupMembership(UserADsPath)
	Select Case TypeName(usersGroupMembership)
		Case "Variant()","String"
			If TypeName(usersGroupMembership) = "String" Then usersGroupMembership = Split(usersGroupMembership,VbCrLf)
			For Each memberOf In usersGroupMembership
If Left(UCase(memberOf),3) = "SG-" And InStr(1,UCase(memberOf),"-STORE",vbTextCompare) <> 0 And Right(UCase(memberOf),3) = "-FC" then oMemberOf.Add memberOf,""
			Next
		Case Else
	End Select
	
	For Each sBackupGroup In oMemberOf
		On Error GoTo 0
		Call RemoveMember(UserADsPath,sBackupGroup)
	Next

	Set oMemberOf = Nothing
	DisablePCBackup = True
End Function

Function EnablePCBackup(UserADsPath)
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		EnablePCBackup = False : Exit Function
	End If
	
Set rootDSE = GetObject("LDAP://rootDSE")
		strDomain = rootDSE.Get("defaultNamingContext")
		netBIOSName = Replace(Split(strDomain,",DC=")(0),"DC=","",1,1,vbTextCompare)
	Set rootDSE = Nothing
	
	If bOnErrorEnabled then On Error Resume Next
		Set oUser = GetObject(UserADsPath)
If Err.Number <> 0 Then
				Call LogLine(internalLogFile,"Failed to get user object: '" & UserADsPath & "'")
				Set oUser = Nothing
				EnablePCBackup = False : Exit Function
			End If
			oUser.GetInfo()
			sAMAccountName = oUser.sAMAccountName
			userRegion = oUser.Get("location")
		Set oUser = Nothing
	On Error GoTo 0

	If userRegion = "" Then
		Call LogLine(internalLogFile,"Value for 'location' attribute not present for user '" & UserADspath & "'")
		EnablePCBackup = False : Exit Function
	End If

	totGroups = 0
	Set oBackupGroups = CreateObject("Scripting.Dictionary")
		oBackupGroups.CompareMode = vbTextCompare
	Set oMemberOf = CreateObject("Scripting.Dictionary")
		oMemberOf.CompareMode = vbTextCompare
		
	PCBackupGroups = GetPCBackupGroups(userRegion,oBackupGroups)

	If Not(PCBackupGroups) Then
		Set oBackupGroups = Nothing
		Set oMemberOf = Nothing
		EnablePCBackup = False : Exit Function
	End If
	
	usersGroupMembership = GetUserGroupMembership(UserADsPath)
	Select Case TypeName(usersGroupMembership)
		Case "Variant()","String"
			If TypeName(usersGroupMembership) = "String" Then usersGroupMembership = Split(usersGroupMembership,VbCrLf)
			For Each memberOf In usersGroupMembership
				If oBackupGroups.Exists(memberOf) Then oMemberOf.Add memberOf,""
			Next
		Case Else
	End Select

	If oMemberOf.Count &gt; 1 Then
		For Each sBackupGroup In oBackupGroups
			sOutGroups = sOutGroups & "|" & sBackupGroup
		Next
		sOutGroups = Replace(sOutGroups,"|","",1,1,vbTextCompare)
		Call LogLine(internalLogFile,"User '" & UserADsPath & "' is already a member of the following PCBackup groups: " & sOutGroups)
		EnablePCBackup = False
	Else
		userAddedToGroup = False
		Select Case oMemberOf.Count
			Case 0
				backupGroupToUse = GetBackupGroupToUse(oBackupGroups)
				userAddedToGroup = AddMember(UserADsPath,backupGroupToUse)
			Case 1
				For Each sBackupGroup In oBackupGroups
					backupGroupToUse = sBackupGroup
				Next
				userAddedToGroup = True
		End Select			
	
		If userAddedToGroup Then
			EnablePCBackup = QCBackup(userRegion,UserADsPath,sAMAccountName,backupGroupToUse)
			If Not(EnablePCBackup) Then
				Call LogLine(internalLogFile,"Failed to create backup folder for '" & UserADsPath & "'. User removed from group '" & backupGroupToUse & "'")
				bUserRemoved = RemoveMember(UserADsPath,backupGroupToUse)
			End If
		Else
			Call LogLine(internalLogFile,"Failed to add user '" & UserADsPath & "' to group '" & backupGroupToUse & "'")
		End If
	End If
	
	Set oBackupGroups = Nothing
	Set oMemberOf = Nothing
End Function

Function GetBackupGroupToUse(oGroupsDictionary)
	GetBackupGroupToUse = ""
	Set oMembers = CreateObject("Scripting.Dictionary")
		oMembers.CompareMode = vbTextCompare

	smallestBackupGroup = ""
	intHigh = 999999

	For Each sBackupGroup In oGroupsDictionary
		oMembers.RemoveAll
		Call EnumMembers(sBackupGroup,"",oMembers)
If oMembers.Count < intHigh Then
			smallestBackupGroup = sBackupGroup
			intHigh = oMembers.Count
		End If
	Next
	GetBackupGroupToUse = smallestBackupGroup
	Set oMembers = Nothing
End Function

Function QCBackup(userRegion,UserADsPath,sAMAccountName,backupSGToUse)
	QCBackup = False
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		Exit Function
	End If
	aSections = Split(backupSGToUse,"-")
	storeName = backupSGToUse
	If UBound(aSections) &gt; 0 Then
		storeName = aSections(UBound(aSections)-1)
	End If

	DFSBackupDirectory = "\\" & netBIOSName & ".com\CORP\" & userRegion & PCBACKUP_DFS_SUFFIX & storeName
	Set FSO = CreateObject("Scripting.FileSystemObject")
	If FSO.FolderExists(DFSBackupDirectory) Then
		backupDirectory = DFSBackupDirectory & "\" & sAMAccountName
		QCBackup = CreateHomeDirectory(UserADsPath,backupDirectory)
	Else
		Call LogLine(internalLogFile,"Folder '" & DFSBackupDirectory & "' does not exist.")
	End If
End Function

Function GetPCBackupGroups(userRegion,oOutputDictionary)
	GetPCBackupGroups = False
	aGroups = ""
	Set objCommand = CreateADOConnection()
objCommand.CommandText = "SELECT cn FROM 'LDAP://" & DomainController & "/" & strDomain & "' WHERE cn='SG-" & userRegion & "-*-STORE*-FC' ORDER BY cn"
	Set oRS = objCommand.Execute
	
	Select Case oRS.RecordCount
		Case 0
			Call LogLine(internalLogFile,"Failed to get list of STORE*-FC groups for backup (no records found)")
		Case Else
			GetPCBackupGroups = True
			Do Until oRS.EOF
				oOutputDictionary.Add oRS.Fields("cn").Value,""
				oRS.MoveNext
			Loop
	End Select
	
	Set objCommand = Nothing
	Set oRS = Nothing
End Function

Function AddMember(UserADsPath,sGroupName)
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		AddMember = False : Exit Function
	End If
	
	If bOnErrorEnabled then On Error Resume Next
		Set oUser = GetObject(UserADsPath)
If Err.Number <> 0 Then
				Call LogLine("Failed to get user '" & UserADsPath & "'")
				AddMember = False : Exit Function
			End If
		Set oUser = Nothing
	On Error GoTo 0

	Set objCommand = CreateADOConnection()
objCommand.CommandText = "SELECT ADsPath,cn FROM 'LDAP://" & domainController & "/" & strDomain & "' WHERE objectClass='Group' AND objectCategory='Group' AND cn='" & Replace(Replace(sGroupName,"'","''"),"/","\/") & "' ORDER BY cn"
		Set oRS = objCommand.Execute
		If oRS.RecordCount = 1 Then
			Set objGroup = GetObject(oRS.Fields("ADsPath").Value)
				If bOnErrorEnabled then On Error Resume Next
					Err.Clear
					objGroup.Add UserADsPath
					Select Case Err.Number
						Case 0,-2147023518,-2147019886
							AddMember = True
						Case -2147504128
							AddMember = False
							Call LogLine(internalLogFile,"Failed to add user '" & UserADsPath & "' to '" & sGroupName & "' because the user does not exist.")
						Case Else
							AddMember = False
							Call LogLine(internalLogFile,"Failed to add '" & UserADsPath & "' to group '" & sGroupName & "'.")
					End Select
				On Error GoTo 0
			Set objGroup = Nothing
		Else
			AddMember = False
			Call LogLine(internalLogFile,"Cannot add '" & UserADsPath & "' to group '" & sGroupName & "' because the group does not exist.")
		End If
	Set objCommand = Nothing
End Function

Function RemoveMember(UserADsPath,sGroupName)
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		RemoveMember = False : Exit Function
	End If

	If bOnErrorEnabled then On Error Resume Next
		Set oUser = GetObject(UserADsPath)
If Err.Number <> 0 Then
				Call LogLine("Failed to get user '" & UserADsPath & "'")
				RemoveMember = False : Exit Function
			End If
		Set oUser = Nothing
	On Error GoTo 0

	Set objCommand = CreateADOConnection()
objCommand.CommandText = "SELECT ADsPath,cn FROM 'LDAP://" & domainController & "/" & strDomain & "' WHERE objectClass='Group' AND objectCategory='Group' AND cn='" & Replace(Replace(sGroupName,"'","''"),"/","\/") & "' ORDER BY cn"
		Set oRS = objCommand.Execute
		If oRS.RecordCount = 1 Then
			Set objGroup = GetObject(oRS.Fields("ADsPath").Value)
				Err.Clear
				If bOnErrorEnabled then On Error Resume Next
					objGroup.Remove UserADsPath
					Select Case Err.Number
						Case 0,-2147023518,-2147019886,-2147016651,-2147504128
							RemoveMember = True
						Case Else
							RemoveMember = False
							Call LogLine(internalLogFile,"Failed to remove user '" & UserADsPath & "' from '" & sGroupName & "'.")
					End Select
				On Error GoTo 0
			Set objGroup = Nothing
		Else
			RemoveMember = True
			Call LogLine(internalLogFile,"Cannot remove '" & UserADsPath & "' from group '" & sGroupName & "' because the group does not exist.")
		End If
	Set objCommand = Nothing
End Function

Function EnumMembers(strName, strOffset,objGroupList)
	Set objCommand = CreateADOConnection()
strBase = "<LDAP://" & strDomain & ">"
	strAttributes = "member"
	strFilter = "(&(ObjectCategory=group)(ObjectClass=group)(cn=" & strName & "))"

	blnLast = False
	intRangeStep = 999
	intLowRange = 0
	IntHighRange = intLowRange + intRangeStep

	Do While True
		If blnLast = True Then      ' If last query, retrieve remaining members.
			strQuery = strBase & ";" & strFilter & ";" & strAttributes & ";range=" & intLowRange & "-*;subtree"
		Else      ' If not last query, retrieve 1000 members.
			strQuery = strBase & ";" & strFilter & ";" & strAttributes & ";range=" & intLowRange & "-" & intHighRange & ";subtree"
		End If
		objCommand.CommandText = strQuery
		Set objRecordSet = objCommand.Execute
		intCount = 0

		Do Until objRecordSet.EOF
			For Each objField In objRecordSet.Fields
				If VarType(objField) = (vbArray + vbVariant) _
						Then
					For Each strDN In objField.Value
						If Not objGroupList.Exists(strDN) Then            ' Check dictionary object for duplicates.
objCommand.CommandText = "SELECT sAMAccountName,cn FROM 'LDAP://" & Replace(Replace(strDN,"'","''"),"/","\/") & "'"
							Set oUserRS = objCommand.Execute
							Username = ""
							cn = ""
If oUserRS.RecordCount <> 0 then
								Username = oUserRS.Fields("sAMAccountName").Value
								'cn = oUserRS.Fields("cn").Value
							End If
							objGroupList(strDN) = Username' & "|" & cn
							intCount = intCount + 1
						End If
					Next
				End If
			Next
			objRecordSet.MoveNext
		Loop

		If blnLast = True Then    ' If this is the last query, exit the Do While loop.
			Exit Do
		End If

		If intCount = 0 Then
			blnLast = True
		Else
			intLowRange = intHighRange + 1
			intHighRange = intLowRange + intRangeStep
		End If
	Loop
End Function
' END Manage PCBackup Functions
' #endregion 

' #region Persistent fold MANAGE GROUP MAILBOX SECURITY GROUP FUNCTIONS
Function ManageGroupMBXSG(sAction,UserADsPath,ssAMAccountName)
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Mailbox_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		ManageGroupMBXSG = False : Exit Function
	End If
	
	Select Case UCase(sAction)
		Case "CREATE"
			If bOnErrorEnabled then On Error Resume Next
Set oUserObject = GetObject("LDAP://" & domainController & "/" & normalizedADsPath)
					oUserObject.GetInfo()
If Err.Number <> 0 Then
						Call LogLine(internalLogFile,"Failed to get user object: '" & Mailbox_cn & "'")
						Set oUserObject = Nothing
						ManageGroupMBXSG = False : Exit Function
					End If
					sManagerADsPath = (oUserObject.Get("manager") & "")
					sMBXsAMAccountName = (oUserObject.Get("sAMAccountName") & "")
				Set oUserObject = Nothing
				If sManagerADsPath = "" Then
					Call LogLine(internalLogFile,"Manager is not set for user object: '" & Mailbox_cn & "'")
					ManageGroupMBXSG = False : Exit Function
				Else
Set oManager = GetObject("LDAP://" & domainController & "/" & sManagerADsPath)
						oManager.GetInfo()
						sManagersAMAccountName = oManager.sAMAccountName
						sManagerCN = oManager.cn
					Set oManager = Nothing
				End If
			On Error GoTo 0

strDomain = GetObject("LDAP://" & domainController & "/rootDSE").Get("defaultNamingContext")
			netBIOSName = Replace(Split(strDomain,",DC=")(0),"DC=","",1,1,vbTextCompare)
			Set objCommand = CreateADOConnection()
objCommand.CommandText = "SELECT ADsPath,cn,managedBy,canonicalName FROM 'LDAP://" & strDomain & "' WHERE objectClass='Group' AND objectCategory='Group' AND cn='" & Replace(Replace(Mailbox_cn,"'","''"),"/","\/") & "-Group-MBX'"
				Set GroupMBXGroupRS = objCommand.Execute
If GroupMBXGroupRS.RecordCount <> 0 Then
						agroupDN = GroupMBXGroupRS.Fields("canonicalName")
						Set GroupMBXGroupRS = Nothing
						Set objCommand = Nothing
						groupDN = agroupDN(0)
						groupDN = Replace(Mid(groupDN,Instr(1,groupDN,"/")+1,(InstrRev(groupDN,"/")-Instr(1,groupDN,"/"))-1),"/"," / ")
						Call LogLine(internalLogFile,"Security group already exists for '" & Mailbox_cn & "' in '" & groupDN & "'")
						ManageGroupMBXSG = False : Exit Function
					End If
				Set GroupMBXGroupRS = Nothing
			Set objCommand = Nothing

			If bOnErrorEnabled then On Error Resume Next
			Err.Clear
Set oGroupsOU = GetObject("LDAP://" & domainController & "/" & MailboxGroupsOU & netBIOSName & ",DC=com")
				Set objGroup = oGroupsOU.Create("group", "cn=" & Cstr(Mailbox_cn) & "-Group-MBX")
If Err.Number <> 0 Then
Call LogLine(internalLogFile,"Failed to create '" & Mailbox_cn & "' in '" & "LDAP://" & domainController & "/" & MailboxGroupsOU & netBIOSName & ",DC=com" & "'.")
						Set objGroup = Nothing
						Set oGroupsOU = Nothing
						ManageGroupMBXSG = False : Exit Function
					End If
				
					With objGroup
						.Put "sAMAccountName", Cstr(Mailbox_cn) & "-Group-MBX"
						.Put "groupType", ADS_GROUP_TYPE_GLOBAL_GROUP Or ADS_GROUP_TYPE_SECURITY_ENABLED
						.Put "managedBy", sManagerADsPath
						.Put "info", "GroupMailbox:" & CStr(sMBXsAMAccountName)
						.SetInfo
					End With
If Err.Number <> 0 then
						If Err.Number = -2147019886 then
							Call LogLine(internalLogFile,"Failed to create group because the account already exists: '" & Mailbox_cn & "'")
							Set objGroup = Nothing
							Set oGroupsOU = Nothing
							ManageGroupMBXSG = False : Exit Function
						Else
							Call LogLine(internalLogFile, "Error creating group '" & Mailbox_cn & "-GROUP-MBX.")
							Set objGroup = Nothing
							Set oGroupsOU = Nothing
							ManageGroupMBXSG = False : Exit Function
						End If
					End If
		
					objGroup_cn = CStr(objGroup.cn)
					objGroup_sAMAccountName = CStr(objGroup.sAMAccountName)
				
					Err.Clear
					With objGroup
.Add "LDAP://" & sManagerADsPath
						.SetInfo
					End With
				Set objGroup = Nothing

				Err.Clear
Set objMailbox = GetObject("LDAP://" & domainController & "/" & normalizedADsPath)
					Set oMBXSD = objMailbox.Get("ntSecurityDescriptor")
						Set oMBXSDdACL = oMBXSD.DiscretionaryACL
							Set objACE1 = CreateObject("AccessControlEntry")
								With objACE1
									.AccessMask = ADS_RIGHT_GENERIC_READ    'Enable Read permissions
									.AceType = ADS_ACETYPE_ACCESS_ALLOWED_OBJECT
									.Trustee = netBIOSName & "\" & objGroup_sAMAccountName
								End With
							oMBXSDdACL.AddAce objACE1
		
							Set objACE2 = CreateObject("AccessControlEntry")
								With objACE2
									.AccessMask = ADS_RIGHT_DS_CONTROL_ACCESS
									.AceType = ADS_ACETYPE_ACCESS_ALLOWED_OBJECT
									.Trustee    = netBIOSName & "\" & objGroup_sAMAccountName
									.ObjectType = SEND_AS
								End With
							oMBXSDdACL.AddAce objACE2
		
							objMailbox.Put "ntSecurityDescriptor", Array(oMBXSD) 'set object security
							objMailbox.SetInfo
If Err.Number <> 0 Then
								Call LogLine(internalLogFile,"Failed to set ACEs on group mailbox '" & normalizedADsPath & "'.  Security group deleted.")
								oGroupsOU.Delete "group","cn=" & objGroup_cn
								ManageGroupMBXSG = False
							Else
								ManageGroupMBXSG = True
							End If
							Err.Clear
							Set objACE1 = Nothing
							Set objACE2 = Nothing
						Set oMBXSDdACL = Nothing
					Set oMBXSD = Nothing
	
'					If ManageGroupMBXSG Then
'						Set oMBXMRSD = objMailbox.MailboxRights
'							Set oMBXMRSdACL = oMBXMRSD.DiscretionaryAcl
'								Set MBXACE = CreateObject("AccessControlEntry")
'									With MBXACE
'										.AccessMask = ADS_RIGHT_DS_CREATE_CHILD
'										.AceType = ADS_ACETYPE_ACCESS_ALLOWED
'										.AceFlags = ADS_ACEFLAG_INHERIT_ACE
'										.Trustee = netBIOSName & "\" & objGroup_sAMAccountName
'									End With
'								oMBXMRSdACL.AddAce MBXACE
'			
'								Set MBXACE2 = CreateObject("AccessControlEntry")
'									With MBXACE2
'										.AccessMask = ADS_RIGHT_EXCH_READ_PERMISSIONS
'										.AceType = ADS_ACETYPE_ACCESS_ALLOWED
'										.AceFlags = ADS_ACEFLAG_INHERIT_ACE
'										.Trustee = netBIOSName & "\" & objGroup_sAMAccountName
'									End With
'								oMBXMRSdACL.AddAce MBXACE2
'			
'								oMBXMRSD.DiscretionaryAcl = oMBXMRSdACL
'								objMailbox.MailboxRights = oMBXMRSD 'set mailbox security
'								objMailbox.SetInfo
' If Err.Number <> 0 then
'									Call LogLine(internalLogFile,"Failed to add mailbox rights to '" & Mailbox_cn & "'.")
'									ManageGroupMBXSG = False
'								End If
'								Set MBXACE = Nothing
'								Set MBXACE2 = Nothing
'							Set oMBXMRSdACL = Nothing
'						Set oMBXRSSD = Nothing
'					End If

				Set objMailbox = Nothing
			Set oGroupsOU = Nothing
		Case "DELETE"
strDomain = GetObject("LDAP://" & domainController & "/rootDSE").Get("defaultNamingContext")
			netBIOSName = Replace(Split(strDomain,",DC=")(0),"DC=","",1,1,vbTextCompare)
			sGroupADsPath = ""
			Set objCommand = CreateADOConnection()
objCommand.CommandText = "SELECT ADsPath,cn,managedBy,canonicalName FROM 'LDAP://" & strDomain & "' WHERE objectClass='Group' AND objectCategory='Group' AND cn='" & Replace(Replace(Mailbox_cn,"'","''"),"/","\/") & "-Group-MBX'"
				Set GroupMBXGroupRS = objCommand.Execute
					If GroupMBXGroupRS.RecordCount = 0 Then
objCommand.CommandText = "SELECT ADsPath,cn,managedBy,canonicalName FROM 'LDAP://" & strDomain & "' WHERE objectClass='Group' AND objectCategory='Group' AND info='GroupMailbox:" & Replace(Replace(ssAMAccountName,"'","''"),"/","\/") & "'"
						Set GroupMBXGroupRS = objCommand.Execute
If GroupMBXGroupRS.RecordCount <> 0 Then sGroupADsPath = GroupMBXGroupRS.Fields("ADsPath").Value
						Set GroupMBXGroupRS = Nothing
					Else
						sGroupADsPath = GroupMBXGroupRS.Fields("ADsPath").Value
					End If
				Set GroupMBXGroupRS = Nothing
			Set objCommand = Nothing

			If sGroupADsPath = "" then
				Call LogLine(internalLogFile,"Security group does not exist '" & Mailbox_cn & "-GROUP-MBX'")
				ManageGroupMBXSG = True : Exit Function
			End If

			sParentGroupOU = GetObject(sGroupADsPath).Parent
			Set oParentGroupOU = GetObject(sParentGroupOU)
				oParentGroupOU.Delete "group", "cn=" & Cstr(Mailbox_cn) & "-Group-MBX"
If Err.Number <> 0 Then
					Call LogLine(internalLogFile,"Failed to delete '" & Mailbox_cn & "-GROUP-MBX' in '" & sParentGroupOU & "'")
					Set objGroup = Nothing
					Set oParentGroupOU = Nothing
					ManageGroupMBXSG = False : Exit Function
				End If
			Set oParentGroupOU = Nothing
	End Select
End Function
'END MANAGE GROUP MAILBOX SECURITY GROUP FUNCTIONS
' #endregion

' #region Persistent fold Helper Functions
Function ParseADsPath(sADsPath,ByRef domainController,ByRef normalizedPath,ByRef sCN)
	GetDCFromADsPath = ""
	tempPath = sADsPath
If InStr(1,tempPath,"LDAP://",vbTextCompare) <> 0 AND Instr(1,tempPath,"CN=",vbTextCompare) <> 0 Then
tempPath = Replace(tempPath,"LDAP://","",1,1,vbTextCompare)
		cnStart = InStr(1,tempPath,"CN=",vbTextCompare)
		If cnStart &gt;= 2 Then
			cnStart = cnStart - 2
			sLeft = Mid(tempPath,1,cnStart)
		Else
			sLeft = ""
		End If
		sRight = Mid(tempPath,InStr(1,tempPath,"CN=",vbTextCompare))
		sTempCN = Mid(sRight,InStr(1,sRight, "CN=", vbTextCompare)+3,(InStr(InStr(1,sRight, "CN=", vbTextCompare) + 3, sRight, "=") - 3) - InStr(1, sRight, "CN=", vbTextCompare) - 3)
If InStr(1,sTempCN,"\/") <> 0 Then sTempCN = Replace(sTempCN,"\/","/")

		domainController = Trim(sLeft)
		normalizedPath = Trim(sRight)
		sCN = Trim(sTempCN)
	Else
		Exit Function
	End If
End Function

Function LogLine(StatusFile,strLine)
	SetLocale(1069)
	dtTimeNow = Now()
	If InStr(1,dtTimeNow,":") = 0 Then dtTimeNow = Date & " 00:00:00"
	
	Set ErrorFile = FSO.OpenTextFile(StatusFile,8,True)
		strErrorOutput = ""
If Err.Number <> 0 Then
			strErrorOutput = " [Error (Number/Description/Source): " & Err.Number & " / " & Trim(Replace(Replace(Err.Description,VbCrLf," "),vbLf," ")) & " / " & Err.Source & "]"
		End If

If (InStr(1,strLine,VbCrLf) <> 0) Then
			ErrorFile.Writeline VbCrLf & dtTimeNow & vbTab & Replace(strLine,VbCrLf,"") & strErrorOutput
		Else	
			ErrorFile.Writeline dtTimeNow & vbTab & Replace(strLine,VbCrLf,"") & strErrorOutput
		End If
		ErrorFile.Close
	Set ErrorFile = Nothing
	Err.Clear
	SetLocale(1033)
End Function

Function CreateADOConnection()
	Set objConnection = CreateObject("ADODB.Connection")
		With objConnection
			.Provider = "ADsDSOObject"
			.CommandTimeout = 0
			.ConnectionTimeout = 0
			.Open "Active Directory Provider"
		End With
		Set objCommand = CreateObject("ADODB.Command")
			With objCommand
				Set .ActiveConnection = objConnection
				.Properties("Timeout") = 0
				.Properties("Searchscope") = 2
				.Properties("Cache Results") = True
				.Properties("Page Size") = 100000
			End With
			Set CreateADOConnection = objCommand
		Set objCommand = Nothing
	Set objConnection = Nothing
End Function

Function GetUserGroupMembership(UserADsPath) 'As sorted Array
	Call ParseADsPath(UserADsPath,domainController,normalizedADsPath,Object_cn)
	If domainController = "" Then
		Call LogLine(internalLogFile,"Domain controller is not present in ADsPath: '" & UserADsPath & "'")
		GetUserGroupMembership = False : Exit Function
	End If
	GetUserGroupMembership = ""

	Set objCommand = CreateADOConnection()
objCommand.CommandText = "SELECT memberOf FROM 'LDAP://" & domainController & "/" & Replace(Replace(normalizedADsPath,"'","''"),"/","\/") & "'"

	Set oUserRS = objCommand.Execute
	If oUserRS.RecordCount = 0 Then
		Call LogLine(internalLogFile,"Failed to get group membership for user '" & UserADsPath & "' because the user does not exist.")
	Else
		UsermemberOf = oUserRS.Fields("memberOf")
		GetUserGroupMembership = ConvertAndSortADsPaths(UsermemberOf,vbCrLf)
	End If

	Set objCommand = Nothing
	Set oUserRS = Nothing
End Function
Function TrimChars(strLine,sChar)
	strTempLine = strLine
	If Len(strTempLine) &gt; 0 Then
		strTempLine = Replace(strTempLine,sChar,"",1,1,vbTextCompare)
		If Right(LCase(strTempLine),1) = LCase(sChar) Then
			strTempLine = Left(strTempLine,Len(strTempLine)-1)
		End If
	End If
	TrimChars = strTempLine
End Function

Function ConvertAndSortADsPaths(theInput,theDelimiter)
	Set oTempSorterRS = CreateObject("ADODB.RecordSet")
		oTempSorterRS.Fields.Append "TempString",200,1000
		oTempSorterRS.CursorLocation = 3
	oTempSorterRS.Open

	Select Case TypeName(theInput)
		Case "Variant()"
			For Each str In theInput
If Trim(str) <> "" then
					FixedCN = ""
					FixedCN = GetCN(str)
If FixedCN <> "" Then
						oTempSorterRS.AddNew
							oTempSorterRS("TempString").Value = FixedCN
						oTempSorterRS.Update
					End If
				End If
			Next
			oTempSorterRS.Sort = "TempString ASC"
			If Not(oTempSorterRS.BOF) then oTempSorterRS.MoveFirst
			Do Until oTempSorterRS.EOF
				aOut = aOut & theDelimiter & oTempSorterRS.Fields("TempString").Value
				oTempSorterRS.MoveNext
			Loop
			aOut = Replace(aOut,theDelimiter,"",1,1,vbTextCompare)
			ConvertAndSortADsPaths = Split(aOut,theDelimiter)
		Case "String"
			aOut = GetCN(theInput)
			ConvertAndSortADsPaths = Split(aOut,theDelimiter)
		Case Else
			ConvertAndSortADsPaths = theInput & ""
	End Select

	aOut = ""
	str = ""

	Set oTempSorterRS = Nothing
End Function

Function GetCN(UserADsPath)
	If UserADsPath = "" then Exit Function
	If Instr(1,UserADsPath,"CN=",vbTextCompare) = 0 then
		GetCN = ""
		Exit Function
	End If

	If bOnErrorEnabled then On Error Resume Next
		GetCN = Mid(UserADsPath,Instr(1,UserADsPath,"CN=",vbTextCompare)+3,Instr(UserADsPath,",")-Instr(1,UserADsPath,"CN=",vbTextCompare)-3)
If InStr(1,GetCN,"\/") <> 0 Then GetCN = Replace(GetCN,"\/","/")
	On Error Goto 0
End Function

' invoked by GENERATEMBSFILE to parse exclusion database string from a config file FILE_EXCL_DB

Function GetExcludeExchangeDB()

	Dim ExchangeExclDBConfigFile, oFSO, oFile, strContents		
		
	ExchangeExclDBConfigFile = workingFolder & FILE_EXCL_DB

    Set oFSO = CreateObject("Scripting.FileSystemObject") 
		
	If Not(oFSO.FileExists(ExchangeExclDBConfigFile)) Then 
		Call LogLine(internalLogFile,"File not found :" & ExchangeExclDBConfigFile)
		wscript.quit
 	End If

	Set oFile = oFSO.OpenTextFile(ExchangeExclDBConfigFile, 1) 
  	GetExcludeExchangeDB = oFile.ReadAll
	oFile.Close

End Function

' #endregion