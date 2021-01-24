# from https://stackoverflow.com/questions/54110867/use-azure-file-share-in-powershell-runbook
function Get-AzureFiles
{
param([string]$filesharename = 'testfolder', #replace with your own fileshare name
      [string]$username = 'your account name',
      [string]$password = 'your account key', 
      [string]$destination=$env:TEMP+"\", #note there is a slash at the end
      [string]$path="")

      $temp = $env:TEMP

      # get the context
      $context = New-AzureStorageContext -StorageAccountName $username -StorageAccountKey $password

      # get all files and directories
      if($path -eq "")
      {
      $content = Get-AzureStorageFile -ShareName $filesharename -Context $context
      }
      else
      {
      $content = Get-AzureStorageFile -ShareName $filesharename -Context $context -Path $path | Get-AzureStorageFile
      }

      if(!(test-path $destination))
        {
        mkdir $destination
        }

      foreach($c in $content)
      {
        $p = $c.uri.LocalPath -replace "$($c.share.name)/" ,''
        #write-host "the value p is: $p"

        #if it's a directory in fileshare
        if($c.gettype().name -eq "CloudFileDirectory")
        {
           # Write-Host "$($c.share.name) is a directory"
            $destination =$temp + $c.uri.PathAndQuery -replace "/","\"

            #create the folder locally
            if(!(test-path $destination))
            {
            mkdir $destination
            #write-host "the new directory $destination is created locally."
            }

            #define the folder path in fileshare
            $path = ($c.uri.localpath -replace "/$filesharename/" , "") -replace "/","\"

            Get-AzureFiles -destination $destination -path $path

        }
        #if it's a file
        elseif($c.gettype().name -eq "CloudFile")
        {         
         $s = $temp + $c.uri.PathAndQuery -replace "/","\"
         #Write-Output "downloading --- $s"

         $d1 = $c.uri.PathAndQuery -replace "/","\"
         $d1 = $d1.remove($d1.LastIndexOf("\")+1)

         $destination =$temp + $d1



            #create the folder locally
            if(!(test-path $destination))
            {
            mkdir $destination
            #write-host "the new directory $destination is created locally."
            }
         $path_temp = $c.uri.PathAndQuery -replace "/$filesharename/",""

         Get-AzureStorageFileContent -ShareName $filesharename -Path $path_temp  -Destination $destination -Context $context        
        }
      }
}


function do-test
{
get-AzureFiles

# you can operate the files copied to $env:temp
dir $env:TEMP\testfolder
dir $env:TEMP\testfolder\t1
dir $env:TEMP\testfolder\t1\t1sub
}

do-test