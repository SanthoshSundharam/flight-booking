<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./dp.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->origin, $data->destination, $data->date, $data->passengers) && is_array($data->passengers)) {
    foreach ($data->passengers as $passenger) {
        $firstName = $conn->real_escape_string($passenger->firstName);
        $lastName = $conn->real_escape_string($passenger->lastName);
        $age = intval($passenger->age);
        $gender = $conn->real_escape_string($passenger->gender);

        $query = "INSERT INTO passengers (first_name, last_name, age, gender, origin, destination, travel_date) 
                  VALUES ('$firstName', '$lastName', '$age', '$gender', '$data->origin', '$data->destination', '$data->date')";

        if (!$conn->query($query)) {
            echo json_encode(["success" => false, "message" => "Failed to store passengers"]);
            exit;
        }
    }
    echo json_encode(["success" => true, "message" => "Passengers stored successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
}

$conn->close();
?>
