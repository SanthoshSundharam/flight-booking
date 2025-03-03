<?php
$servername = "localhost";
$username = "root"; // Change if using another user
$password = "root"; // Change if using a password
$dbname = "flight_booking"; // Update with your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}
?>
