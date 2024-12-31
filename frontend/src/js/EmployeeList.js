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
            <td>${employee.manager ? employee.manager.department : 'N/A'}</td>
            <td>
                <button onclick="viewEmployee(${employee.id})" class="btn btn-info btn-sm">View</button>
                <button onclick="editEmployee(${employee.id})" class="btn btn-warning btn-sm">Edit</button>
                <button onclick="deleteEmployee(${employee.id})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}