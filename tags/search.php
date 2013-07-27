<?php

// read from filesystem
$tags = file_get_contents('tags.txt');

// break into array
$arr = explode(PHP_EOL, $tags);
array_pop($arr);

// search by $_GET['query']
foreach($arr as $a) {
	if(strpos(strtolower($a), strtolower($_GET['query'])) !== false) {
		echo "$a<br>";
	}
}

?>
