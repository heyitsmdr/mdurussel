<?php

$domain = $_GET['domain'];
$result = array("success" => true, "domain" => $domain);

// get root records
$roota = dns_get_record($domain, DNS_A);
$result['roota'] = $roota;

// get www records
$wwwa = dns_get_record("www.$domain", DNS_A);
$wwwcname = dns_get_record("www.$domain", DNS_CNAME);
$result['wwwa'] = $wwwa;
$result['wwwcname'] = $wwwcname;

// dig results
exec("dig $domain", $digroot);
exec("dig www.$domain", $digwww);
$result['digroot'] = implode("\n", $digroot);
$result['digwww'] = implode("\n", $digwww);

echo json_encode($result);

?>