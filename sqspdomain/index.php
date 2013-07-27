<!DOCTYPE html>
<html lang="en">
<head>
	<title>Squarespace Domains</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/tipsy.css" type="text/css" />
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/dark-hive/jquery-ui.css" type="text/css" media="all" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type='text/javascript' src='js/jquery.tipsy.js'></script>
	<script type="text/javascript">
		var domainFromURL = '<?=$_GET['domain']?>';
		var versionFromURL = '<?=$_GET['version']?>';
	</script>
</head>
<body>
	<div id="box">
		<div id="title">Squarespace Domains</div>
		<div id="desc">Check the configuration of a domain name.</div>
		<div id="domain" class="splash"><input type="text" id="domain-name" class="glowing-border" placeholder="yourdomain.com"></div>
		<div id="buttons" class="splash"><input type="button" class="glowing-border" onclick="checkDomain(6)" value="Check Squarespace 6">&nbsp;<input type="button" class="glowing-border" onclick="checkDomain(5)" value="Check Squarespace 5"></div>
		<div id="unsure" class="splash">Questions? <a href="mailto:mdurussel@squarespace.com">Send me an email</a>.</div>
		<div id="results"><img src="images/ajax.gif"><br>Loading..</div>
	</div>
	<div id="report-form" title="Report this Result">
		<p class="validateTips">Please let me know why this is incorrect. Thanks!</p>
		<form>
			<fieldset>
				<label for="report-domain">Domain</label>
				<input type="text" name="report-domain" id="report-domain" class="text ui-widget-content ui-corner-all" />
				<label for="report-why">What is wrong with this result?</label>
				<textarea name="report-why" id="report-why" value="" rows="5" class="text ui-widget-content ui-corner-all"></textarea>
			</fieldset>
		</form>
	</div>
	<div id="report-success-form" title="Results Reported">
		<p>Thanks for reporting this! I'll look into it as soon as possible to get it fixed.</p>
	</div>
	<div id="whois-form" title="Whois Result">
		<div id="whois-result">Loading..</div>
	</div>
	<div id="author">
		Handcrafted by <a href="https://customercare.squarespace.com/mike-d" target="_new">Mike Du Russel</a><br>Running <a href="updates.php"><?=exec("git log --pretty=format:'%h' -n 1")?></a>
	</div>
</body>
</html>	