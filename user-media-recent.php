<?php
header('Content-Type: application/javascript');

$token = "183122502.a415d0e.95e77430fc37406f8dfe1d1398105126";
$q = (isset($_GET["q"])) ? $_GET["q"] : "";

$string = file_get_contents("https://api.instagram.com/v1/users/$q/media/recent/?access_token=$token");
$json_a = json_decode($string, true);

$json = json_encode($json_a["data"]);
if (isset($_GET['callback']))
	$json = $_GET['callback'] . "(" . $json . ")";
echo $json;

?>
