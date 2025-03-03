<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "./dp.php";

// User Class
class PassengerAPI {
    private $conn;

    public function __construct($dbConn) {
        $this->conn = $dbConn;
    }

    public function getPassengers() {
        $sql = "SELECT * FROM passengers";
        $result = $this->conn->query($sql);

        if (!$result) {
            echo json_encode(["success" => false, "message" => "Database error: " . $this->conn->error]);
            return;
        }

        $passengers = [];
        while ($row = $result->fetch_assoc()) {
            $passengers[] = $row;
        }
        
        echo json_encode(["success" => true, "data" => $passengers]);
    }
}

// Get request data
$data = json_decode(file_get_contents("php://input"), true);
$passengerAPI = new PassengerAPI($conn);

if (!isset($data['action'])) {
    echo json_encode(["success" => false, "message" => "No action provided"]);
    exit;
}

switch ($data['action']) {
    case "get":
        $passengerAPI->getPassengers();
        break;
    default:
        echo json_encode(["success" => false, "message" => "Invalid action"]);
}

$conn->close();
?>
