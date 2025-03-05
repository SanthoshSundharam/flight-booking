<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

include "./dp.php";

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["email"])) {
    $email = trim($_GET["email"]);

    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Email is empty"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM passengers WHERE email = ? ORDER BY booking_id, id");
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    $passengers = [];
    while ($row = $result->fetch_assoc()) {
        $passengers[$row["booking_id"]][] = $row;
    }

    if (empty($passengers)) {
        echo json_encode(["success" => false, "message" => "No passengers found"]);
    } else {
        echo json_encode(["success" => true, "passengers" => $passengers]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}

$conn->close();
?>
