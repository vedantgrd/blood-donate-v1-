<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root"; // Default for XAMPP
$password = ""; // Default password is empty
$dbname = "bloodbuddy"; // Check if the name is correct

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Check if request is POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    die(json_encode(["status" => "error", "message" => "Invalid request. Make sure you're using POST."]));
}

// Get form data and sanitize
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$requestType = isset($_POST['requestType']) ? htmlspecialchars($_POST['requestType']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

if (empty($name) || empty($email) || empty($phone) || empty($requestType) || empty($message)) {
    die(json_encode(["status" => "error", "message" => "All fields are required."]));
}

// Prepare SQL statement
$sql = "INSERT INTO help_requests (name, email, phone, request_type, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode(["status" => "error", "message" => "SQL error: " . $conn->error]));
}

$stmt->bind_param("sssss", $name, $email, $phone, $requestType, $message);

// Execute and check
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Your request has been submitted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
