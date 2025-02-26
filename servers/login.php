<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require "vendor/autoload.php";
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
    echo json_encode(["success" => false, "message" => "Missing credentials"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $data->password;

$query = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($query);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user["password"])) {
        $secret_key = "santhosh123";// Replace with a secure key
        $payload = [
            "id" => $user["id"],
            "email" => $user["email"],
            "exp" => time() + 3600 // Token expires in 1 hour
        ];
        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        echo json_encode(["success" => true, "token" => $jwt]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$conn->close();
?>



