// js/employee-details.js
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get("id");

    const employeeInfoContainer = document.getElementById("employeeInfo");

    if (employeeInfoContainer && employeeId) {
        // Example: Fetch employee details (replace with real API call)
        const employee = { id: 1, name: "John Doe", department: "HR", email: "john.doe@example.com", phone: "(123) 456-7890" };

        employeeInfoContainer.innerHTML = `
            <p><strong>ID:</strong> ${employee.id}</p>
            <p><strong>Name:</strong> ${employee.name}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Phone:</strong> ${employee.phone}</p>
        `;
    }
});