<?php

$DOMAIN = $_GET['domain'];
$WHY = $_GET['why'];
$VERSION = $_GET['version'];

$github = array(
	"title" => "Flagged Result: $DOMAIN [$VERSION]",
	"body" => "Domain: $DOMAIN\nIP: {$_SERVER['REMOTE_ADDR']}\nReproduce: http://mdurussel.net/sqspdomain/?domain=$DOMAIN&version=$VERSION\nReport: $WHY",
	"labels" => array('flag')
);

system("curl -u 'ethryx:xyrhte89' -d '" . json_encode($github) . "' https://api.github.com/repos/ethryx/sqspdomain/issues");

echo 'ok';

?>