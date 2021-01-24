# https://github.com/PlagueHO/CosmosDB#installation
# Config
$acct = 'spjeff-cosmos'
$db = 'DeptBrowser'
$coll = 'DeptBrowser'

# Context
$key = ConvertTo-SecureString -String 'vEYqvO9zznGyYdR0XGbRo6uZB6TruthLnKLJOhVrzktzqXytsjMWVtypG93JcDIjJctpvVqyFGHGB2mEYJPZwg==' -AsPlainText -Force
$ctx = New-CosmosDbContext -Account $acct -Database $db -Key $key
$ctx

# Data
$body = '{"id":"7e5f463cfa6f130cb6d11817","name":"NPS 2009 Centennial Challenge","dept":"Other","created_on":{"$date":"2020-03-04T06:10:01.935Z"},"org":"NPS/GoogleOff","updated_on":{"$date":"2020-03-05T06:10:04.687Z"},"email":"2009_centennial_challenge@nps.gov","email_addresses":["2009_centennial_challenge@g-nps.doi.gov","2009_centennial_challenge@nps.gov","2009cent@nps.gov","2009cent@nps.gov","2009_centennial_challenge@g-nps.doi.gov"]}'
#New-CosmosDbDocument -Context $ctx -CollectionId $coll -DocumentBody $body

$docs = Get-CosmosDbDocument -Context $ctx -CollectionId $coll
$docs
$x=1
