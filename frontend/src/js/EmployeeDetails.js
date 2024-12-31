document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const employeeDetailsDiv = document.getElementById('employeeDetails');

    // Function to get query parameter by name
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get employee ID from query parameter
    const employeeId = getQueryParameter('id');

    // Fetch employee details from the backend
    fetch(`http://localhost:8080/api/employees/${employeeId}`)
        .then(response => response.json())
        .then(employee => {
            // Display employee details
            const detailsHtml = `
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Username:</strong> ${employee.username}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
            `;
            employeeDetailsDiv.innerHTML = detailsHtml;
        })
        .catch(error => {
            console.error('Error fetching employee details:', error);
            employeeDetailsDiv.innerHTML = '<p>Error fetching employee details. Please try again later.</p>';
        });

    // Back button click event
    backButton.addEventListener('click', function() {
        window.location.href = 'EmployeeList.html'; // Adjust this path if necessary
    });
});