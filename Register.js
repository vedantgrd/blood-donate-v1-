document.addEventListener('DOMContentLoaded', function() {
    // Password strength indicator
    const passwordInput = document.getElementById('password_data');
    const strengthLines = document.querySelectorAll('.line');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const value = this.value;
            const length = value.length;
            
            // Reset all lines
            strengthLines.forEach(line => {
                line.classList.remove('active', 'strong');
            });
            
            if (length > 0) {
                strengthLines[0].classList.add('active');
            }
            
            if (length >= 6) {
                strengthLines[1].classList.add('active');
            }
            
            if (length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value)) {
                strengthLines[2].classList.add('active');
            }
            
            if (length >= 10 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) {
                strengthLines[3].classList.add('strong');
                strengthLines[2].classList.add('strong');
                strengthLines[1].classList.add('strong');
                strengthLines[0].classList.add('strong');
            }
        });
    }
    
    // Form submission
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            
            // Send AJAX request
            fetch('process-registration.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    // Redirect to home page after successful registration
                    window.location.href = 'index.html';
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during registration. Please try again later.');
            });
        });
    }
    
    // Login form handling
    const loginBtn = document.querySelector('.btn:not(.primary)');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Toggle between registration and login form
            const formTitle = document.querySelector('.user-form h1');
            const submitBtn = document.querySelector('.btn.primary');
            
            if (formTitle.textContent === 'Start Saving Lives') {
                // Switch to login form
                formTitle.textContent = 'Welcome Back';
                submitBtn.textContent = 'Sign In';
                loginBtn.textContent = 'Register';
                
                // Change form action
                registrationForm.setAttribute('id', 'login-form');
                
                // Remove password strength indicator
                document.querySelector('.safety').style.display = 'none';
                
                // Change form submission handler
                registrationForm.removeEventListener('submit', registrationSubmitHandler);
                registrationForm.addEventListener('submit', loginSubmitHandler);
            } else {
                // Switch back to registration form
                formTitle.textContent = 'Start Saving Lives';
                submitBtn.textContent = 'Create Account';
                loginBtn.textContent = 'Sign In';
                
                // Change form action
                registrationForm.setAttribute('id', 'registration-form');
                
                // Show password strength indicator
                document.querySelector('.safety').style.display = 'flex';
                
                // Change form submission handler
                registrationForm.removeEventListener('submit', loginSubmitHandler);
                registrationForm.addEventListener('submit', registrationSubmitHandler);
            }
        });
    }
    
    // Login form submission handler
    function loginSubmitHandler(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Send AJAX request
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                // Redirect to home page after successful login
                window.location.href = 'index.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        });
    }
    
    // Registration form submission handler
    function registrationSubmitHandler(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Send AJAX request
        fetch('process-registration.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                // Redirect to home page after successful registration
                window.location.href = 'index.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during registration. Please try again later.');
        });
    }
});