<?php
require 'vendor/autoload.php'; // Include JWT Library

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Enable CORS and set content type
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");


include "./dp.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->email) && isset($data->password)) {
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);


    $check_email = $conn->query("SELECT id FROM users WHERE email = '$email'");
    if ($check_email->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        exit;
    }


    $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    if ($conn->query($query)) {
        $userId = $conn->insert_id; 

        // Generate JWT Token
        $secret_key = "santhosh123";  
        $payload = [
            "user_id" => $userId,
            "email" => $email,
            "exp" => time() + (60 * 60) 
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
