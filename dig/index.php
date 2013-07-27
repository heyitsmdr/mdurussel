<?php

$domain = $_GET['d'];
$type = ( (isset($_GET['t'])) ? $_GET['t'] : 'A');
$short = ( (isset($_GET['short'])) ? '' : '+short');

exec("dig $type $domain $short", $output);

echo "<pre>" . implode('<br>', $output) . "</pre>";

?>
