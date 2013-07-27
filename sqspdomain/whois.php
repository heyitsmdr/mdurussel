<?

$DOMAIN = $_POST['domain'];

echo nl2br(system("whois $DOMAIN"));

?>