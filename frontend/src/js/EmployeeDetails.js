// Check authentication on page load
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(currentUser);
}

// Update current time in UTC with the exact format
function updateDateTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    const formattedDateTime = `Current Date and Time (UTC): ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    document.getElementById("currentTime").textContent = formattedDateTime;
}

function displayEmployeeDetails(employee) {
    console.log('Raw employee data:', employee); // For debugging

    document.getElementById('empId').textContent = employee.id || '';
    document.getElementById('empName').textContent = employee.name || '';
    document.getElementById('empAge').textContent = employee.age || '';
    document.getElementById('managerName').textContent = employee.managerName || 'N/A';
    // Change this line - use managerDepartment instead of department
    document.getElementById('managerDepartment').textContent = employee.managerDepartment || 'N/A';
    document.getElementById('managerId').textContent = employee.managerId || 'N/A';
}

function showError(message) {
    document.getElementById("employeeDetails").innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    try {
        // Check if user is logged in
        const currentUser = checkAuth();
        if (!currentUser) return;

        // Update user display with exact format
        document.getElementById('currentUser').textContent = `Current User's Login: ${currentUser.username}`;

        // Start clock
        updateDateTime();
        setInterval(updateDateTime, 1000);

        // Fetch employee details
        fetch('http://localhost:8080/api/employees/details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(employee => {
            console.log('Employee data received:', employee);
            displayEmployeeDetails(employee);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Error loading employee details: ' + error.message);
        });

    } catch (error) {
        console.error('Initialization error:', error);
        showError('Error initializing page: ' + error.message);
    }
});

// Add event listeners for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    // Back button
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'EmployeeList.html';
        });
    }
});