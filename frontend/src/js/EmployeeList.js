document.addEventListener('DOMContentLoaded', function() {
    fetchEmployees();
});

function fetchEmployees() {
    fetch('http://localhost:8080/api/employees')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(employees => {
            console.log('Received employees:', employees); // Debug log
            displayEmployees(employees);
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
            const tableBody = document.getElementById('employeeTableBody');
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center text-danger">
                            Error loading employees. Please try again later.
                        </td>
                    </tr>`;
            }
        });
}

function displayEmployees(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    if (!tableBody) {
        console.error('Could not find employeeTableBody element');
        return;
    }

    tableBody.innerHTML = '';
    
    if (!employees || employees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">
                    No employees found in the database
                </td>
            </tr>`;
        return;
    }

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id || 'N/A'}</td>
            <td>${employee.name || 'N/A'}</td>
            <td>${employee.age || 'N/A'}</td>
            <td>${employee.managerDepartment || 'N/A'}</td>
            <td>
                <button onclick="viewEmployee(${employee.id})" class="btn btn-info btn-sm">View</button>
                <button onclick="editEmployee(${employee.id})" class="btn btn-warning btn-sm">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function viewEmployee(id) {
    window.location.href = `EmployeeDetails.html?id=${id}`;
}
function editEmployee(id) {
    window.location.href = `EmployeeEdit.html?id=${id}`;
}