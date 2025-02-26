<?php
require 'vendor/autoload.php'; // Include JWT Library

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Enable CORS and set content type
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Database Connection
$host = "localhost";
$user = "root";  
$pass = "root";     
$db_name = "flight_booking";  

$conn = new mysqli($host, $user, $pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->email) && isset($data->password)) {
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    // Check if email already exists
    $check_email = $conn->query("SELECT id FROM users WHERE email = '$email'");
    if ($check_email->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        exit;
    }

    // Insert user into database
    $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    if ($conn->query($query)) {
        $userId = $conn->insert_id; // Get the newly created user's ID

        // Generate JWT Token
        $secret_key = "your_secret_key";  // Replace with a strong, unique key
        $payload = [
            "user_id" => $userId,
            "email" => $email,
            "exp" => time() + (60 * 60) // Token expires in 1 hour
        ];
        $token = JWT::encode($payload, $secret_key, 'HS256');

        echo json_encode(["success" => true, "token" => $token, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}

$conn->close();
?>
