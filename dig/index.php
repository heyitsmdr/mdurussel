<?php

$domain = $_GET['d'];
$type = ( (isset($_GET['t'])) ? $_GET['t'] : 'A');
$short = ( (isset($_GET['detail'])) ? '' : '+short');

exec("dig $type $domain $short", $output);

echo "<pre>" . implode('<br>', $output) . "</pre>";

if(isset($_GET['www'])) {
	echo "<b>### www ###</b><br>";

	exec("dig $type www.$domain $short", $wwwoutput);

	echo "<pre>" . implode('<br>', $wwwoutput) . "</pre>";
}

?>
