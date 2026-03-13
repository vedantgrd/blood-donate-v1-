document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("bloodDonationForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            if (!validateForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }
});

function validateForm() {
    let fullName = document.getElementById("fullName").value.trim();
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let bloodType = document.getElementById("bloodType").value;
    let weight = document.getElementById("weight").value;
    let donationCenter = document.getElementById("donationCenter").value;
    let donationDate = document.getElementById("donationDate").value;
    let donationTime = document.getElementById("donationTime").value;
    let consent = document.getElementById("consent").checked;

    // Name validation
    if (fullName.length < 3) {
        alert("Please enter a valid full name.");
        return false;
    }

    // Age validation (18-65)
    if (age < 18 || age > 65) {
        alert("Age must be between 18 and 65.");
        return false;
    }

    // Phone validation (10-digit number)
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Blood type selection
    if (bloodType === "") {
        alert("Please select your blood type.");
        return false;
    }

    // Weight validation (minimum 45kg)
    if (weight < 45) {
        alert("Minimum weight for donation is 45kg.");
        return false;
    }

    // Donation center selection
    if (donationCenter === "") {
        alert("Please select a donation center.");
        return false;
    }

    // Donation date selection
    if (donationDate === "") {
        alert("Please select a preferred donation date.");
        return false;
    }

    // Donation time selection
    if (donationTime === "") {
        alert("Please select a preferred donation time.");
        return false;
    }

    // Consent checkbox
    if (!consent) {
        alert("You must confirm the accuracy of your information before submitting.");
        return false;
    }

    return true; // Form is valid, allow submission to PHP
}
