import React from 'react';
import { Employee } from '../types/Employee';

const employees: Employee[] = [
  { id: 1, name: 'John Doe', position: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', position: 'Project Manager' },
  // Add more employees as needed
];

const EmployeeList: React.FC = () => {
  return (
    <div>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name} - {employee.position}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;