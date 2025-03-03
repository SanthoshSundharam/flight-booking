<?php
include "./dp.php";


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$id = $data['id'];

$sql = "DELETE FROM passengers WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Passenger deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Delete failed: " . $conn->error]);
}

$conn->close();
?>
