<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "./dp.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM passengers";
    $result = $conn->query($sql);
    
    if (!$result) {
        echo json_encode(["success" => false, "error" => $conn->error]);
        exit();
    }

    if ($result->num_rows > 0) {
        $passengers = [];
        while ($row = $result->fetch_assoc()) {
            $passengers[] = $row;
        }
        echo json_encode(["success" => true, "data" => $passengers]);
    } else {
        echo json_encode(["success" => false, "message" => "No passengers found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}

$conn->close();
?>
