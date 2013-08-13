<html>
<head>
<title>Dig Tool</title>
<link href="style.css" rel="stylesheet" type="text/css">
<link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript">
    function runQuery(www) {
        var domain = $('#domainName').val();
        var record = $('#recordType').val();
        var ns = $('#nameServer').val();
        var short = $('#shortResult').prop('checked');
        $.get('dig.php', {
            domain: domain,
            record: record,
            ns: ns,
            short: short,
            www: www
        }, function(data){
            $('#digResult').html( data );
        });
    }
    function runWhois() {
        var domain = $('#domainName').val();
        $.get('whois.php', {
            domain: domain
        }, function(data){
            $('#digResult').html( data );
        });
    }
</script>
</head>
<body>

<table width="100%" height="100%">
    <tr><td align="center" valign="middle">
    
        <table id="mainTable" width="550px" cellspacing="0">
            <tr><td id="digTop">
                Domain: <input type="text" id="domainName" size="30">&nbsp;&nbsp;
                Record: <select id="recordType"><option value="ANY">ANY</option><option value="A">A</option><option value="MX">MX</option><option value="CNAME">CNAME</option></select>
                <br/>
                Name Server: <input type="text" id="nameServer" size="20">&nbsp;&nbsp;<input type="checkbox" id="shortResult" value="Short">&nbsp;Short
                <br/>
                <i>* Keep name server blank to use local name server</i>
                <div style="float:right"><input type="button" onclick="runQuery()" value="Run Query">&nbsp;<input type="button" onclick="runQuery(1)" value="WWW">&nbsp;<input type="button" onclick="runWhois()" value="Whois"></div>
            </td></tr>
            <tr><td id="digResult">
                Result here..
            </td></tr>
        </table>
    
    </td></tr>
</table>

</body>
</html>
