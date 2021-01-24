# BOX MISC
$propertyTemplate = New-PropertyTemplate -AuthorsAndTimestamps -VersionHistory -Permissions
$box = Connect-Box -Email "box@emlpayments.com.au"
$cred = Get-Credential
$dstSite = Connect-Site -Url "https://emlpayments.sharepoint.com/B" -Credential $cred
$dstList = Get-List -Name "B" -Site $dstSite
Import-BoxDocument -Box $box -DestinationList $dstList -SourceFilePath "Box Reports" -Template $propertyTemplate


# BOX NETSUITE (TAGS)
$propertyTemplate = New-PropertyTemplate -AuthorsAndTimestamps -VersionHistory -Permissions
# TAGS - CustomData1
$mappings = Get-PropertyMapping -Box $box -DestinationList $dstList
$mappings = Set-PropertyMapping -MappingSettings $mappings -Source CustomData1 -Destination CustomData1
$box = Connect-Box -Email "box@emlpayments.com.au"
$cred = Get-Credential
$dstSite = Connect-Site -Url "https://emlpayments.sharepoint.com/B" -Credential $cred
$dstList = Get-List -Name "B" -Site $dstSite
Import-BoxDocument -Box $box -DestinationList $dstList -SourceFilePath "Netsuite" -MappingSettings $mappings -Template $propertyTemplate


# BOX FILE SERVER - UK (FLEX)
$folder = "D:\"
$box = Connect-Box -Email "box@emlpayments.com.au"
$cred = Get-Credential
$dstSite = Connect-Site -Url "https://emlpayments.sharepoint.com/B" -Credential $cred
$dstList = Get-List -Name "UK" -Site $dstSite
Import-Document -SourceFolder $folder -DestinationList $dstList


# BOX FILE SERVER - US (STOREFINANCIAL)
$folder = "T:\"
$box = Connect-Box -Email "box@emlpayments.com.au"
$cred = Get-Credential
$dstSite = Connect-Site -Url "https://emlpayments.sharepoint.com/B" -Credential $cred
$dstList = Get-List -Name "US" -Site $dstSite
$propertyTemplate = New-PropertyTemplate -AuthorsAndTimestamps -VersionHistory -Permissions
Import-Document -SourceFolder $folder -DestinationList $dstList -Template $propertyTemplate


# BOX FILE SERVER - AUS (???)
$folder = "D:\DesignArch"
$box = Connect-Box -Email "box@emlpayments.com.au"
$cred = Get-Credential
$dstSite = Connect-Site -Url "https://emlpayments.sharepoint.com/B" -Credential $cred
$dstList = Get-List -Name "AUS" -Site $dstSite
Import-Document -SourceFolder $folder -DestinationList $dstList

