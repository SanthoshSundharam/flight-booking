<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Database Connection
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "flight_search";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the search query
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';
$searchQuery = "%$searchQuery%"; // Add wildcards for partial matching

$stmt = $conn->prepare("SELECT * FROM flights WHERE destination LIKE ? OR flight_name LIKE ?");
$stmt->bind_param("ss", $searchQuery, $searchQuery);
$stmt->execute();
$result = $stmt->get_result();

$flights = [];
while ($row = $result->fetch_assoc()) {
    $flights[] = $row;
}

echo json_encode($flights);

$conn->close();
?>
