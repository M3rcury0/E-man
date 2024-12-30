// js/employee-list.js
document.addEventListener("DOMContentLoaded", () => {
    const employeeTableBody = document.getElementById("employeeTableBody");

    if (employeeTableBody) {
        // Example: Fetch employee data (replace with real API call)
        const employees = [
            { id: 1, name: "John Doe", department: "HR" },
            { id: 2, name: "Jane Smith", department: "IT" }
        ];

        employees.forEach(employee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td><a href="employee-details.html?id=${employee.id}">View</a></td>
            `;
            employeeTableBody.appendChild(row);
        });
    }
});