<?php
include "./dp.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['booking_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$booking_id = $data['booking_id'];

$sql = "DELETE FROM passengers WHERE booking_id=?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $booking_id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Booking deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Delete failed: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "SQL error: " . $conn->error]);
}

$conn->close();
?>
