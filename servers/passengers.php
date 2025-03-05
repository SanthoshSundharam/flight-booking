<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "./dp.php";

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($data->origin, $data->destination, $data->date, $data->email, $data->passengers)) {
    if (!is_array($data->passengers) || empty($data->passengers)) {
        echo json_encode(["success" => false, "message" => "Invalid passengers data"]);
        exit;
    }

    // Generate a unique booking ID for this booking
    $booking_id = uniqid("BOOK_");

    $stmt = $conn->prepare("INSERT INTO passengers (first_name, last_name, age, gender, origin, destination, travel_date, email, booking_id) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Database error"]);
        exit;
    }

    $email = trim($data->email); // Get email from request

    foreach ($data->passengers as $passenger) {
        $firstName = trim($passenger->firstName);
        $lastName = trim($passenger->lastName);
        $age = intval($passenger->age);
        $gender = trim($passenger->gender);
        $origin = trim($data->origin);
        $destination = trim($data->destination);
        $travelDate = trim($data->date);

        if (empty($firstName) || empty($lastName) || $age <= 0 || empty($gender) || empty($email)) {
            echo json_encode(["success" => false, "message" => "Invalid passenger details"]);
            exit;
        }

        // Bind parameters and execute query
        $stmt->bind_param("ssissssss", $firstName, $lastName, $age, $gender, $origin, $destination, $travelDate, $email, $booking_id);

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Failed to store passengers"]);
            exit;
        }
    }

    echo json_encode(["success" => true, "message" => "Passengers stored successfully", "booking_id" => $booking_id]);
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}

$conn->close();
?>
