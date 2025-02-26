<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow React frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow request methods
header("Access-Control-Allow-Headers: Authorization, Content-Type"); // Allow specific headers
header("Access-Control-Allow-Credentials: true");

require __DIR__ . '/vendor/autoload.php';  // Load JWT library

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "santhosh123";  // Must match the key in login.php

// Get JWT from Authorization Header
$headers = getallheaders();
if (!isset($headers["Authorization"])) {
    echo json_encode(["success" => false, "message" => "Token missing"]);
    exit;
}

$token = str_replace("Bearer ", "", $headers["Authorization"]);  // Remove "Bearer " prefix

try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));  // Decode JWT
    echo json_encode(["success" => true, "message" => "Access granted", "user" => $decoded]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Invalid or expired token"]);
}
?>
