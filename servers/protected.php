<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow React frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow request methods
header("Access-Control-Allow-Headers: Authorization, Content-Type"); // Allow specific headers
header("Access-Control-Allow-Credentials: true");

require __DIR__ . '/vendor/autoload.php';  // Load JWT library

require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "your-secret-key";
$headers = getallheaders();
$token = isset($headers["Authorization"]) ? str_replace("Bearer ", "", $headers["Authorization"]) : null;

if (!$token) {
    echo json_encode(["success" => false, "message" => "Token missing"]);
    exit;
}

try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    echo json_encode(["success" => true, "message" => "Access granted", "user" => $decoded]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Invalid token"]);
}
?>