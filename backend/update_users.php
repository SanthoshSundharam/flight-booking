<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->name) && !empty($data->email)) {
    $stmt = $conn->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
    $stmt->execute([$data->name, $data->email, $data->id]);

    echo json_encode(["message" => "User updated successfully"]);
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
