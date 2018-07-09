<?php
$url='https://xn--e1ambhaffche3i.xn--p1ai/dbconnect.php';
$postfields = http_build_query(array('query'=>$_POST['query']));
$url=$url .'?'.$postfields;


$options = array(
        CURLOPT_RETURNTRANSFER => true,     // return web page
        CURLOPT_HEADER         => false,    // don't return headers
        CURLOPT_FOLLOWLOCATION => true,     // follow redirects
        CURLOPT_ENCODING       => "",       // handle all encodings
        CURLOPT_USERAGENT      => "spider", // who am i
        CURLOPT_AUTOREFERER    => true,     // set referer on redirect
        CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
        CURLOPT_TIMEOUT        => 120,      // timeout on response
        CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
		//CURLOPT_POSTFIELDS     => $postfields,
		
    );
    $ch      = curl_init( $url );
    curl_setopt_array( $ch, $options );
	
	//curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
    $content = curl_exec( $ch );
    $err     = curl_errno( $ch );
    $errmsg  = curl_error( $ch );
    $header  = curl_getinfo( $ch );
    curl_close( $ch );

    $header['errno']   = $err;
    $header['errmsg']  = $errmsg;
    $header['content'] = $content;
    // return $header;

	echo  json_encode($header);
?>