// js/add-employee.js
document.addEventListener("DOMContentLoaded", () => {
    const addEmployeeForm = document.getElementById("addEmployeeForm");

    if (addEmployeeForm) {
        addEmployeeForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const department = document.getElementById("department").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            // Example: Save employee data (replace with real API call)
            console.log("New employee data:", { name, department, email, phone });

            alert("Employee added successfully!");
            window.location.href = "employee-list.html";
        });
    }
});