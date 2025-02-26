<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";  
$password = ""; 
$dbname = "flight_search";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database Connection Failed"]));
}


$data = json_decode(file_get_contents("php://input"));

if (isset($data->name, $data->email, $data->password)) {
    $name = $conn->real_escape_string($data->name);
    $email = $conn->real_escape_string($data->email);
    $password = password_hash($data->password, PASSWORD_BCRYPT); // Hash Password

    $checkUser = $conn->query("SELECT * FROM users WHERE email = '$email'");
    if ($checkUser->num_rows > 0) {
        echo json_encode(["message" => "Email already exists"]);
        exit();
    }

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    if ($conn->query($sql)) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["message" => "Registration failed"]);
    }
} else {
    echo json_encode(["message" => "Invalid data"]);
}

$conn->close();
?>
