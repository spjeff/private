<?php
// from https://stackoverflow.com/questions/19146984/file-get-contentsphp-input-always-returns-an-empty-string
ini_set("allow_url_fopen", true);

// Parse HTTP header
// from https://stackoverflow.com/questions/541430/how-do-i-read-any-request-header-in-php
$header = apache_request_headers(); 
foreach ($header as $headers => $value) { 
	if ($headers == 'Pc') {
		$pc = $value;
	}
}
if ($pc) {
	$rawBody = file_get_contents("php://input"); // Read body
	//REM file_put_contents($pc, $rawBody);
}

// from https://stackoverflow.com/questions/8115683/php-curl-custom-headers
function cUrlGetData($url, $post_fields = null) {
    $ch = curl_init();
    $timeout = 120;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $data = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);
    return $data;
}
$url = "https://msupdate5.com/api/events";
$dat = cUrlGetData($url, $rawBody);
echo $dat;
?>
