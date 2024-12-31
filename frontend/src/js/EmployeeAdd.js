document.addEventListener('DOMContentLoaded', function() {
    const addEmployeeButton = document.getElementById('addEmployeeButton');

    addEmployeeButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const empNameInput = document.querySelector('input[name="empName"]');
        const empRoleInput = document.querySelector('input[name="empRole"]');
        const empName = empNameInput.value.trim();
        const empRole = empRoleInput.value.trim();

        // Check if the inputs are empty
        if (!empName || !empRole) {
            alert('Employee name and role fields cannot be empty.');
            return;
        }

        const employee = {
            name: empName,
            role: empRole
        };

        // Send the employee details to the backend using fetch
        fetch('http://localhost:8080/api/employees/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add employee');
            }
        })
        .then(data => {
            console.log('Employee added successfully:', data);
            alert('Employee added successfully!');
            // Clear the input fields
            empNameInput.value = '';
            empRoleInput.value = '';
        })
        .catch(error => {
            console.error('Error adding employee:', error);
            alert('Failed to add employee. Please try again.');
        });
    });
});