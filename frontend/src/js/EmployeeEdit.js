document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editEmployeeForm');
    const employeeId = new URLSearchParams(window.location.search).get('id');
    
    // Add loading indicator
    const form = document.getElementById('editEmployeeForm');
    form.innerHTML += '<div id="loadingIndicator">Loading employee data...</div>';

    // First, let's fetch all employees to get the current managers
    fetch('http://localhost:8080/api/employees')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            return response.json();
        })
        .then(employees => {
            console.log('All employees:', employees); // Debug log

            // Create a unique set of managers from the employee data
            const managers = new Map();
            employees.forEach(emp => {
                if (emp.managerId && emp.managerName && emp.managerDepartment) {
                    managers.set(emp.managerId, {
                        id: emp.managerId,
                        name: emp.managerName,
                        department: emp.managerDepartment
                    });
                }
            });

            // Populate the manager dropdown
            const select = document.getElementById('managerId');
            select.innerHTML = '<option value="">Select a manager</option>'; // Reset select
            managers.forEach(manager => {
                const option = document.createElement('option');
                option.value = manager.id;
                option.textContent = `${manager.name} (${manager.department})`;
                select.appendChild(option);
            });

            // Find the current employee in the employees array
            const currentEmployee = employees.find(emp => emp.id === parseInt(employeeId));
            console.log('Current employee:', currentEmployee); // Debug log

            if (currentEmployee) {
                // Populate the form with employee details
                document.getElementById('name').value = currentEmployee.name || '';
                document.getElementById('age').value = currentEmployee.age || '';
                if (currentEmployee.managerId) {
                    document.getElementById('managerId').value = currentEmployee.managerId;
                }
            } else {
                throw new Error('Employee not found');
            }

            // Remove loading indicator
            const loadingIndicator = document.getElementById('loadingIndicator');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading data: ' + error.message);
            // Remove loading indicator
            const loadingIndicator = document.getElementById('loadingIndicator');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
        });

    // Handle form submission
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedEmployee = {
            id: parseInt(employeeId),
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            managerId: parseInt(document.getElementById('managerId').value)
        };

        console.log('Sending update:', updatedEmployee); // Debug log

        fetch(`http://localhost:8080/api/employees/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployee)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update employee');
            }
            return response.json();
        })
        .then(data => {
            console.log('Update successful:', data); // Debug log
            alert('Employee updated successfully!');
            window.location.href = 'EmployeeList.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update employee: ' + error.message);
        });
    });
});