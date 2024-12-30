
import React, { useEffect, useState } from 'react';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name} - {employee.position}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;