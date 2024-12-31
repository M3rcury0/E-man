document.addEventListener('DOMContentLoaded', function() {
    const employeeTableBody = document.getElementById('employeeTableBody');

    function fetchEmployees() {
        fetch('http://localhost:8080/api/employees')
            .then(response => response.json())
            .then(employees => {
                employeeTableBody.innerHTML = '';
                employees.forEach(employee => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.department}</td>
                        <td><a href="employee-details.html?id=${employee.id}">View</a></td>
                    `;
                    employeeTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                employeeTableBody.innerHTML = '<tr><td colspan="4">Error fetching data</td></tr>';
            });
    }

    fetchEmployees();
});