<?php

$domain = $_GET['domain'];

exec("whois $domain", $output);
array_shift($output);

echo "<pre>" . implode('<br>', $output) . "</pre>";

?>
