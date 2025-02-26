<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";  
$pass = "root";     
$db_name = "flight_booking";  

$conn = new mysqli($host, $user, $pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

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
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed"]);
    }
}
$conn->close();
?>

