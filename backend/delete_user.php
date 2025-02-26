<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$data->id]);

    echo json_encode(["message" => "User deleted successfully"]);
} else {
    echo json_encode(["message" => "Invalid ID"]);
}
?>
