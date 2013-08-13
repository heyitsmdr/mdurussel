<?php

$domain = $_GET['domain'];
$type = strtolower($_GET['record']);
$short = ( (isset($_GET['short'])&&$_GET['short']=='true') ? '+short' : '');
$ns = ( (isset($_GET['ns'])&&$_GET['ns']) ? '@'.$_GET['ns'] : '');
$www = $_GET['www'];

exec("dig $ns $domain $type $short", $output);
if(!$short){ array_shift($output); }

echo "<pre>" . implode('<br>', $output) . "</pre>";

if($www) {
    echo "<div id='wwwExtra'>";
    exec("dig $ns www.$domain $type $short", $output2);
    if(!$short){ array_shift($output2); }
    echo "<pre>" . implode('<br>', $output2) . "</pre>";
    echo "</div>";
}

?>