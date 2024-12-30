document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Clear any previous error message
            errorMessage.style.display = "none";

            // Validate the inputs
            if (username === "" || password === "") {
                errorMessage.textContent = "Both username and password are required.";
                errorMessage.style.display = "block";
                return;
            }

            // Make a request to the backend API for authentication
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to the dashboard if login is successful
                    window.location.href = "dashboard.html";
                } else {
                    // Show an error message if login fails
                    errorMessage.textContent = "Invalid username or password.";
                    errorMessage.style.display = "block";
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                errorMessage.textContent = "An error occurred. Please try again later.";
                errorMessage.style.display = "block";
            });
        });
    }
});