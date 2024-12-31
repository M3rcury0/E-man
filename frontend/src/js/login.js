document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const usernameInput = document.querySelector('input[name="username"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Check if the inputs are empty
        if (!username || !password) {
            alert('Username and password fields cannot be empty.');
            return;
        }

        const credentials = {
            username: username,
            password: password
        };

        // Send the credentials to the backend using fetch
        fetch('http://localhost:8080/api/employees/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then(data => {
            console.log('Login successful:', data);
            // Redirect to the main application page (e.g., dashboard.html)
            window.location.href = 'dashboard.html'; // Adjust this path to your actual dashboard page
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed. Please check your credentials and try again.');
        });
    });
});