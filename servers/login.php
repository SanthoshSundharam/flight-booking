<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require 'vendor/autoload.php'; // Ensure JWT package is loaded
use Firebase\JWT\JWT;

$host = "localhost";
$user = "root";
$pass = "root";
$db_name = "flight_booking";

$conn = new mysqli($host, $user, $pass, $db_name);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $data->password;

$result = $conn->query("SELECT * FROM users WHERE email = '$email'");
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        $secret_key = "your-secret-key"; // Set this in a config file for security
        $payload = [
            "user_id" => $user["id"],
            "email" => $user["email"],
            "exp" => time() + (60 * 60) // Token expires in 1 hour
        ];
        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        echo json_encode(["success" => true, "token" => $jwt]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Invalid email or password"]);
$conn->close();
?>
