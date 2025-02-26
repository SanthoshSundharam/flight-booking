<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include("dbConnect.php");
$conn = new DbConnection();
$db = $conn->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $jsonData = file_get_contents('php://input');
        $user = json_decode($jsonData);

        if (!$user) {
            echo json_encode(['status' => 0, 'message' => 'Invalid JSON data']);
            exit;
        }

        $sql = "INSERT INTO users(id, name, email, mobile, created_at) VALUES (null, :name, :email, :mobile, :created_at)";
        $stmt = $db->prepare($sql);
        $date = date('Y-m-d');

        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $date);

        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => "Record inserted successfully"]);
        } else {
            echo json_encode(['status' => 0, 'message' => "Failed to insert"]);
        }
        break;

    case "GET":
        $sql = "SELECT * FROM users";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case "DELETE":
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                echo json_encode(['status' => 1, 'message' => 'Record deleted successfully.']);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Failed to delete record.']);
            }
        } else {
            echo json_encode(['status' => 0, 'message' => 'Missing ID']);
        }
        break;
}
?>
