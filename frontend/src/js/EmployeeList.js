// EmployeeList.js

document.addEventListener('DOMContentLoaded', function() {
    fetchEmployees();
});

async function fetchEmployees() {
    try {
        console.log('Attempting to fetch employees...');
        const response = await fetch('http://localhost:8080/api/employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // Add this to handle CORS
            mode: 'cors',
            credentials: 'include'
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const employees = await response.json();
        console.log('Fetched employees:', employees);
        displayEmployees(employees);
    } catch (error) {
        console.error('Detailed error:', error);
        const tableBody = document.getElementById('employeeTableBody');
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Failed to fetch: ${error.message}</td></tr>`;
    }
}