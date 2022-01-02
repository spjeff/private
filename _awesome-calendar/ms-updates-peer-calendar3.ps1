# Configure
Add-Type -AssemblyName "System.Web"
$tenant     = "morleybuilders"
$user       = "conjjones@morleybuilders.com"
$pass       = "9445..FdomGoal"

# Login - MSFT
$loginUrl = "https://login.microsoftonline.com/extSTS.srf"
$wc = New-Object "System.Net.WebClient"
$accept = "application/json;odata=verbose"
$wc.Headers.add('Accept', $accept)
$TextBody = @"
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope"
      xmlns:a="http://www.w3.org/2005/08/addressing"
      xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
  <s:Header>
    <a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>
    <a:ReplyTo>
      <a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>
    </a:ReplyTo>
    <a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To>
    <o:Security s:mustUnderstand="1"
       xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <o:UsernameToken>
        <o:Username>$user</o:Username>
        <o:Password>$pass</o:Password>
      </o:UsernameToken>
    </o:Security>
  </s:Header>
  <s:Body>
    <t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">
      <wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">
        <a:EndpointReference>
          <a:Address>https://$tenant.sharepoint.com/</a:Address>
        </a:EndpointReference>
      </wsp:AppliesTo>
      <t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>
      <t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>
      <t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>
    </t:RequestSecurityToken>
  </s:Body>
</s:Envelope>
"@
$enc = [system.Text.Encoding]::UTF8;
$aByte = $enc.GetBytes($TextBody);
$aResponse = $wc.UploadData($loginUrl, "POST", $aByte);
$Response = $enc.GetString($aResponse);
[xml]$respXml = $Response
$BinarySecurityToken = $respXml.Envelope.Body.RequestSecurityTokenResponse.RequestedSecurityToken.BinarySecurityToken.'#text'


# Login - SPO
$session = New-Object "Microsoft.PowerShell.Commands.WebRequestSession"
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Accept", "application/json;odata=verbose")
$body = $BinarySecurityToken
$response = Invoke-RestMethod "https://$tenant.sharepoint.com/_forms/default.aspx?wa=wsignin1.0" -Method 'POST' -Headers $headers -Body $body -WebSession $session
$FedAuth = $session.Cookies.GetCookieHeader("https://$tenant.sharepoint.com")
$rtFa = $session.Cookies.GetCookieHeader("https://sharepoint.com")
$cookieVal = $FedAuth + ";" + $rtFa 
$cookieVal 

# Download XML
$restUrl = "https://$tenant.sharepoint.com/_api/web"
$wc = New-Object system.Net.WebClient
$wc.Headers.add('cookie', $cookieVal)
$resp = $wc.downloadString($restUrl)
$resp | Out-File "Data.xml"
[xml]$respXml = $resp

<#
# Download JSON
Add-Type -AssemblyName System.Web
$restUrl = "https://$tenant.sharepoint.com/_api/web"
$wc = New-Object system.Net.WebClient
$wc.Headers.add('cookie', $cookieVal)
$wc.Headers.add('accept', "application/json")
$resp = $wc.downloadString($restUrl)
$resp = $resp.ToString().Replace("ID", "_ID")
$resp | Out-File "Data.json"
$respJson = ConvertFrom-Json $resp


#>