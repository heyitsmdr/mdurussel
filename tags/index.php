<html>
<head>
<title>Squarespace Tag Finder</title>
<style>
body { background-image: url(bg.png); }
div { color: #fff; font-family: Tahoma; font-size: 13px; white-space: nowrap; }
input { background-color: rgba(0,0,0,0.3); color: #fff; padding: 5px; border: 0px; width: 280px; }
input:focus { outline: none; }
</style>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type='text/javascript'>
function changeSearch(){
	$.get('search.php', { query: $('#query').val() }, function(data){
		$('#result').html( data );
	});
}
</script>
</head>
<body>

<input id="query" type="text" placeholder="Search for.." onkeyup="changeSearch()">
<br><br>
<div id="result">Result here..</div>

</body>
</html>

