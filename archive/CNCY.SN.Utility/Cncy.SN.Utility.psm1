<#
	SN Utility Module

	Contains various shared Service Now utilities used by MODULES.

    Modules should use Trace Message Logging - Runbooks should use the standard write-output for AA

    Functions Designed for Runbook/SN General Use:
    
    Invoke-SNTableAPI - This module will be the backend request module to facilitate all other Functions.
        It is used inside each of the following below functions.

    New-SNTableInsert - This is a Table IP function which will insert data into a table you specify.
    New-SNTableUpdate - This is a Table IP function which will Update data into a table you specify.
    Invoke-SNTableQuery - This is a Table IP function which will get data you specify with a query filter.
    Remove-SNTableItem - This is a Table IP function which will remove data you specify from a given table.

#>

Function Invoke-SNTableAPI 
{

 <#
.SYNOPSIS
Table Response Framework

.PARAMETER URL
ServiceNow base URL example "https://dev1234.servicenow.com"

.PARAMETER SNCreds
ServiceNow Credentials

.PARAMETER Method
Rest Method you are using

.PARAMETER URI
URI of the table item and/or table item + sys_ID you are trying to manipulate.

.PARAMETER Data
Data to be inserted, or modified.

.EXAMPLE

#>

    Param (

        [Parameter(Mandatory = $true)]
        [string]$Method,
        [Parameter(Mandatory = $true)]
        [string]$URI,
        [Parameter(Mandatory=$True)]
        [PScredential]$SNCreds,    
        [Parameter(Mandatory=$False)]
        [PSObject]$Body
            
        )
        Write-Verbose "***Starting Invoke-SNTableAPI***"
        Write-CNCYCustomTraceLog "***Starting Invoke-SNTableAPI***"
        Write-Verbose $Method
        Write-CNCYCustomTraceLog $Method
        Write-Verbose $URI
        Write-CNCYCustomTraceLog $URI        

        # Set proper headers
        $headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
        $headers.Add('Accept','application/json')
        $headers.Add('Content-Type','application/json')

        $body = $Body | ConvertTo-Json

        If ($Body -ne $Null)
        {
        Write-Verbose $Body
        Write-CNCYCustomTraceLog $Body
        }

        # Send HTTP request
        If ($Method -eq "get" -or $Method -eq "delete")
        {
        Write-Verbose "Method $Method Has Been Triggered"
        Write-CNCYCustomTraceLog "Method $Method Has Been Triggered"

        $TaskResponse = Invoke-WebRequest -Headers $headers -Method $Method -Uri $uri -Credential $SNCreds -UseBasicParsing
        }
        If ($Method -eq "post" -or $Method -eq "put")
        {
        Write-Verbose "Method $Method Has Been Triggered"
        Write-CNCYCustomTraceLog "Method $Method Has Been Triggered"

        $TaskResponse = Invoke-WebRequest -Headers $headers -Method $Method -Uri $uri -Body $body -Credential $SNCreds -UseBasicParsing
        }

        $TaskResponse

        IF([string]::IsNullOrEmpty($TaskResponse))
        {
        Write-Verbose "Table String Is Empty"
        }
        else 
        {
        Write-Verbose "$TaskResponse"
        Write-CNCYCustomTraceLog $TaskResponse.content
        Write-CNCYCustomTraceLog $TaskResponse.statuscode
        }
        Write-Verbose "***Completed Invoke-SNTableAPI***"
        Write-CNCYCustomTraceLog "***Completed Invoke-SNTableAPI***"
 }

Function New-SNTableInsert
{
 <#
.SYNOPSIS
Add Table Item

.PARAMETER URL
ServiceNow base URL example "https://dev1234.servicenow.com"

.PARAMETER SNCreds
ServiceNow Credentials

.PARAMETER TableName
Table Name of the queue table

.PARAMETER sysID
ServiceNow System ID of task

.EXAMPLE

#>
	Param(
		[Parameter(Mandatory=$true)]
		[string]$URL,
		
        [Parameter(Mandatory=$true)]
		[PScredential]$SNCreds,
		
        [Parameter(Mandatory=$True)]
		[string]$TableName,
        
        [Parameter(Mandatory=$True)]
        [PSObject]$Body
	)
	
	Write-Verbose "***Starting New-SNWorkNote***"
    Write-CNCYCustomTraceLog "***Starting New-SNWorkNote***"

	$URL = $URL + "/api/now/table/" + $TableName
    
    Write-Verbose $URL
    Write-CNCYCustomTraceLog $URL

    Write-Verbose "***Trying to Insert into $TableName using $Body ***"
    Write-CNCYCustomTraceLog "***Trying to Insert into $TableName using $Body ***"

    $Method = 'post'
	$TaskResponse = Invoke-SNTableAPI -Method $Method -SNCreds $SNCreds -URI $URL -Body $Body

	$TaskResponse

    Write-Verbose "$TaskResponse"
    Write-CNCYCustomTraceLog $TaskResponse.content
    Write-CNCYCustomTraceLog $TaskResponse.statuscode
	Write-Verbose "***Completed New-SNWorkNote***"
    Write-CNCYCustomTraceLog "***Completed New-SNWorkNote***"

}

Function New-SNTableUpdate
{

<#
.SYNOPSIS
Update Table Item

.PARAMETER URL
ServiceNow base URL example "https://dev1234.servicenow.com"

.PARAMETER SNCreds
ServiceNow Credentials

.PARAMETER TableName
Table Name of the queue table

.PARAMETER sysID
ServiceNow System ID of task

.EXAMPLE

#>
	Param(
		[Parameter(Mandatory=$true)]
		[string]$URL,
		
        [Parameter(Mandatory=$true)]
		[PScredential]$SNCreds,
		
        [Parameter(Mandatory=$True)]
		[string]$TableName,

        [Parameter(Mandatory=$True)]
        [String]$Sys_ID,
        
        [Parameter(Mandatory=$True)]
        [PSObject]$Body
	)
	
	Write-Verbose "***Starting New-SNWorkNote***"
    Write-CNCYCustomTraceLog "***Starting New-SNWorkNote***"

	$URL = $URL + "/api/now/table/" + $TableName +"/" + $Sys_ID

    Write-Verbose $URL
    Write-CNCYCustomTraceLog $URL

    Write-Verbose "***Trying to get update $TableName for item $Sys_ID using $Body ***"
    Write-CNCYCustomTraceLog "***Trying to get update $TableName for item $Sys_ID using $Body ***"

    $Method = 'put'
	$TaskResponse = Invoke-SNTableAPI -Method $Method -SNCreds $SNCreds -URI $URL -Body $Body
	
    $TaskResponse

    Write-Verbose "$TaskResponse"
    Write-CNCYCustomTraceLog $TaskResponse.content
    Write-CNCYCustomTraceLog $TaskResponse.statuscode

	Write-Verbose "***Completed New-SNWorkNote***"
    Write-CNCYCustomTraceLog "***Completed New-SNWorkNote***"
}

Function Invoke-SNTableQuery
{

<#
.SYNOPSIS
Query ServiceNow Table

.PARAMETER URL
ServiceNow base URL example "https://dev1234.servicenow.com"

.PARAMETER SNCreds
ServiceNow Credentials

.PARAMETER TableName
Table Name of the queue table

.PARAMETER QueryString
?sysparam_query= string to be added to the URL after the table name

.EXAMPLE

#>

	Param(
		[Parameter(Mandatory=$True)]
		[string]$URL,

		[Parameter(Mandatory=$True)]
		[PScredential]$SNCreds,

		[Parameter(Mandatory=$True)]
		[string]$TableName,

		[Parameter(Mandatory=$True)]
		[string]$QueryString

	)

	Write-Verbose "***Starting Invoke-SNTableQuery***"
    Write-CNCYCustomTraceLog "***Starting Invoke-SNTableQuery***"

	$URL = $URL + "/api/now/table/" + $tableName + "?sysparm_query=" + $QueryString

    Write-Verbose "***Trying to get information from $TableName using $QueryString ***"
    Write-CNCYCustomTraceLog "***Trying to get information from $TableName using $QueryString ***"

    $Method = 'get'
    $TaskResponse = Invoke-SNTableAPI -Method $Method -SNCreds $SNCreds -URI $URL 
        
    $TaskResponse 

    Write-Verbose "$TaskResponse"
    Write-CNCYCustomTraceLog "$TaskResponse"

	Write-Verbose "***Completed Invoke-SNTableQuery***"
    Write-CNCYCustomTraceLog "***Completed Invoke-SNTableQuery***"
}

Function Remove-SNTableItem
{

<#
.SYNOPSIS
removes task from the Vendor Integration table

.PARAMETER URL
ServiceNow base URL example "https://dev1234.servicenow.com"

.PARAMETER SNCreds
ServiceNow Credentials

.PARAMETER TableName
Table Name of the queue table

.PARAMETER sys_ID
ServiceNow System ID of task


.EXAMPLE

#>
    Param
    (
        [Parameter(Mandatory=$True)]
        [String]$Sys_ID,

        [Parameter(Mandatory=$True)]
        [String]$URL,

        [Parameter(Mandatory=$True)]
        [PScredential]$SNCreds,
		
		[Parameter(Mandatory=$True)]
        [String]$TableName
    )
    Write-Verbose "***Starting Remove-SNTableItem***"
    Write-CNCYCustomTraceLog "***Starting Remove-SNTableItem***"

    Write-Verbose "Call Made to Remove Item: $Sys_ID"
    Write-CNCYCustomTraceLog "Call Made to Remove Item: $Sys_ID"

    $URL = $URL + '/api/now/table/'+ $TableName +'/' + $Sys_ID

    Write-Verbose "Trying to Remove $Sys_ID from $TableName at URL: $URL"
    Write-CNCYCustomTraceLog "Trying to Remove $Sys_ID from $TableName at URL: $URL"

    $Method = 'delete'
    $DeleteResponse = Invoke-SNTableAPI -Method $Method -SNCreds $SNCreds -URI $URL

    $DeleteResponse

    IF([string]::IsNullOrEmpty($DeleteResponse))
    {
    Write-Verbose "Delete String Is Empty"
    }
    else 
    {
    Write-Verbose "$DeleteResponse"
    Write-CNCYCustomTraceLog $DeleteResponse.content
    Write-CNCYCustomTraceLog $DeleteResponse.statuscode
    }

	Write-Verbose "***Completed Remove-SNTableItem***"
    Write-CNCYCustomTraceLog "***Completed Remove-SNTableItem***"
}
