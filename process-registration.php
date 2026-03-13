<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root"; // Change if you set a password
$password = ""; // Default for XAMPP is empty
$dbname = "bloodbuddy"; // Make sure this is the correct database name

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

// Get form data & sanitize
$fullName = isset($_POST['fullName']) ? htmlspecialchars($_POST['fullName']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (empty($fullName) || empty($email) || empty($password)) {
    die(json_encode(["status" => "error", "message" => "All fields are required."]));
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$checkSql = "SELECT id FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    die(json_encode(["status" => "error", "message" => "Email already registered."]));
}

$checkStmt->close();

// Insert into database
$sql = "INSERT INTO users (full_name, email, password, created_at) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $fullName, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registration successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
