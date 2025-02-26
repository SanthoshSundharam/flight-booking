<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email)) {
    $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt->execute([$data->name, $data->email]);

    echo json_encode(["message" => "User added successfully"]);
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
