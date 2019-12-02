<?php

$server = "vrsocial1.citxnibmvcmg.eu-central-1.rds.amazonaws.com";
$server_username = "metaverse";
$server_password = "mtvrs18yzlm";
$dbName = "vrsocial";

$sessionid = $_POST["sessionidPost"];
$index = $_POST["indexPost"];

$startTime =  $_POST["startTimePost"];
$EndTime = $_POST["EndTimePost"];
$audio = $_POST["audioPost"];

//$startTime = date_create_from_format('n/j/Y H:i:s a', $_POST["startTimePost"]);
//$EndTime = date_create_from_format('n/j/Y H:i:s a',$_POST["EndTimePost"]);

$conn = new mysqli($server, $server_username, $server_password, $dbName);
error_log($startTime, 3,
          "/var/tmp/herkes_hata_yapar.log");
if(!$conn)
{
	die("Connection Failed. ". mysqli_connect_error());
}

//mysqli_query("SET NAMES 'utf8'"); 
//mysqli_query("SET CHARACTER SET utf8_general_ci");
//mysqli_set_charset('utf8', $conn);
$conn->set_charset("utf8");

//$sql = "INSERT INTO usersTable (name, email, pass) VALUES ('".$username."','".$email."','".$password."')";
$sql = "INSERT INTO audio (sessionid, indexAudio, startTime, EndTime, audios) VALUES ('".$sessionid."', '".$index."', '".$startTime."', '".$EndTime."', '".$audio."')";
$result = mysqli_query($conn, $sql);

$conn -> close();

//$myfile = fopen("data.txt", "w") or die("Unable to open file!");
//$txt = "mtvrs"
//fwrite($myfile, $sessionid);
//fwrite($myfile, $index);
//fwrite($myfile, $startTime);
//fwrite($myfile, $txt);

//fclose($myfile);
echo "success";
//if(!$result) echo "error";
//else echo $username;
?>