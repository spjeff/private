<?php
// Parse HTTP header
// from https://stackoverflow.com/questions/541430/how-do-i-read-any-request-header-in-php
$header = apache_request_headers(); 
foreach ($header as $headers => $value) { 
	if ($headers == 'Pc') {
		$pc = $value;
	}
} 

// from https://stackoverflow.com/questions/43453851/php-receive-json-from-post-and-save-to-file
$text = file_get_contents("php://input");
$textb = $HTTP_RAW_POST_DATA;
$textc = $_POST;
$res = file_put_contents($pc, $text, FILE_TEXT);

echo "Success";
	echo $pc;
	echo $text;
	echo $textb;
	echo $textc;
	
/*
if ($res > 0) {
    echo "Success";
	echo $pc;
    return;
  } else {
    if (!$res) {
      http_response_code(500);
      echo "file_put_contents error:".$res;
      return;
    } else {
      http_response_code(500);
      echo "Error: saved zero data!";
      return;
    }
  }
*/

?>


