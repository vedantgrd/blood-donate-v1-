document.addEventListener('DOMContentLoaded', function() {
    const helpForm = document.getElementById('helpForm');
    
    if (helpForm) {
        helpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(helpForm);
            
            // Send AJAX request
            fetch('process-help.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    helpForm.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting your request. Please try again later.');
            });
        });
    }
});