<?php
include "./dp.php";


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit();
}

$id = $data['id'];
$first_name = $data['first_name'];
$last_name = $data['last_name'];
$age = $data['age'];
$gender = $data['gender'];
$origin = $data['origin'];
$destination = $data['destination'];
$date = $data['travel_date'];

$sql = "UPDATE passengers SET first_name='$first_name', last_name='$last_name', age=$age, gender='$gender', origin='$origin', destination='$destination', travel_date='$date' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Passenger updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed: " . $conn->error]);
}

$conn->close();
?>
