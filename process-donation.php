<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bloodbuddy";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("<script>alert('Database connection failed: " . $conn->connect_error . "'); window.location.href='index.html';</script>");
}

// Ensure request is POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    die("<script>alert('Invalid request. Use POST method.'); window.location.href='index.html';</script>");
}

// Get form data & sanitize
$donor_name = isset($_POST['fullName']) ? htmlspecialchars($_POST['fullName']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$blood_group = isset($_POST['bloodType']) ? htmlspecialchars($_POST['bloodType']) : '';
$donation_date = isset($_POST['donationDate']) ? $_POST['donationDate'] : '';
$location = isset($_POST['donationCenter']) ? htmlspecialchars($_POST['donationCenter']) : '';

// Validate required fields
if (empty($donor_name) || empty($email) || empty($phone) || empty($blood_group) || empty($donation_date) || empty($location)) {
    die("<script>alert('All fields are required.'); window.location.href='index.html';</script>");
}

// Insert into database
$sql = "INSERT INTO donations (donor_name, email, phone, blood_group, donation_date, location, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $donor_name, $email, $phone, $blood_group, $donation_date, $location);

if ($stmt->execute()) {
    echo "<script>
        alert('Donation scheduled successfully!');
        window.location.href='index.html';
    </script>";
} else {
    echo "<script>alert('Database error: " . $stmt->error . "'); window.location.href='index.html';</script>";
}

$stmt->close();
$conn->close();
?>
