// login.js

// Function to update user display with timestamp
function updateUserDisplay() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        document.getElementById('currentUser').textContent = userData.username;
        
        // Update timestamp
        const now = new Date();
        const formattedDateTime = formatDateTime(now);
        document.getElementById('currentTime').textContent = formattedDateTime;
    } else {
        document.getElementById('currentUser').textContent = 'Not logged in';
    }
}

// Format date time helper function
function formatDateTime(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginButton = document.getElementById('loginButton');
    
    // Debug log
    console.log('Attempting login with username:', loginId);
    
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';
    errorMessage.style.display = 'none';

    const credentials = {
        username: loginId,
        password: password
    };

    console.log('Sending credentials:', credentials);

    fetch('http://localhost:8080/api/employees/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        console.log('Response status:', response.status);
        
        // Log the raw response
        response.clone().text().then(text => {
            console.log('Raw response:', text);
        });

        if (!response.ok) {
            throw new Error(response.status === 401 ? 'Invalid credentials' : 'Login failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful, received data:', data);
        
        // Store user data
        const userDataToStore = {
            id: data.id,
            username: data.username,
            loginTime: new Date().toISOString()
        };
        
        console.log('Storing user data:', userDataToStore);
        
        sessionStorage.setItem('currentUser', JSON.stringify(userDataToStore));
        
        // Update display
        document.getElementById('currentUser').textContent = data.username;
        
        // Redirect to employee list
        window.location.href = 'EmployeeList.html';
    })
    .catch(error => {
        console.error('Login error:', error);
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
        
        // Log additional error details
        if (error.response) {
            console.error('Error response:', error.response);
        }
    })
    .finally(() => {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
    });

    return false;
}

// Function to check if user is logged in
function checkLoggedInUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        return userData.username;
    }
    return null;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start clock update
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Update user display
    updateUserDisplay();
    
    // Add login form listener if on login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check if user is already logged in
    const username = checkLoggedInUser();
    if (username) {
        // If on login page, redirect to employee list
        if (window.location.href.includes('login.html')) {
            window.location.href = 'EmployeeList.html';
        }
    } else {
        // If not on login page, redirect to login
        if (!window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
});