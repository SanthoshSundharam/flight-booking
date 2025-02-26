<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require __DIR__ . '/vendor/autoload.php'; // Load Composer libraries

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$host = "localhost";  
$db_name = "flight_booking";  
$username = "root"; 
$password = "root";  

$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Email and password required"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $data->password;

// Check if user exists
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the hashed password
    if (password_verify($password, $user["password"])) {
        $secret_key = "your_secret_key";  // Change this to a strong secret key
        $issued_at = time();
        $expiration_time = $issued_at + (60 * 60 * 24); // 24-hour expiration

        // Create JWT payload
        $payload = [
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "email" => $user["email"],
            "id" => $user["id"]
        ];

        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        echo json_encode(["success" => true, "token" => $jwt, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$conn->close();
?>
