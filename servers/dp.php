<?php
$host = "localhost";
$user = "root";  
$pass = "root";     
$db_name = "flight_booking";  

$conn = new mysqli($host, $user, $pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

?>