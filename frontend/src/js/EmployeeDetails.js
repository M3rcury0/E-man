document.addEventListener('DOMContentLoaded', function() {
    // Get employee ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    if (!employeeId) {
        showError('No employee ID provided');
        return;
    }

    fetchEmployeeDetails(employeeId);
});

function fetchEmployeeDetails(employeeId) {
    fetch(`http://localhost:8080/api/employees/${employeeId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Employee not found');
            }
            return response.json();
        })
        .then(employee => {
            displayEmployeeDetails(employee);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Error loading employee details');
        });
}

function displayEmployeeDetails(employee) {
    const detailsContainer = document.getElementById('employeeDetails');
    
    const detailsHTML = `
        <div class="row">
            <div class="col-md-6">
                <h4 class="mb-4">Personal Information</h4>
                <table class="table">
                    <tr>
                        <th>Employee ID:</th>
                        <td>${employee.id}</td>
                    </tr>
                    <tr>
                        <th>Name:</th>
                        <td>${employee.name}</td>
                    </tr>
                    <tr>
                        <th>Age:</th>
                        <td>${employee.age}</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <h4 class="mb-4">Manager Information</h4>
                <table class="table">
                    <tr>
                        <th>Manager Name:</th>
                        <td>${employee.managerName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Department:</th>
                        <td>${employee.managerDepartment || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Manager ID:</th>
                        <td>${employee.managerId || 'N/A'}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button onclick="editEmployee(${employee.id})" class="btn btn-warning">Edit Employee</button>
            </div>
        </div>
    `;
    
    detailsContainer.innerHTML = detailsHTML;
}

function editEmployee(id) {
    window.location.href = `EmployeeEdit.html?id=${id}`;
}

function showError(message) {
    const detailsContainer = document.getElementById('employeeDetails');
    detailsContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}