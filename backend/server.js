// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/employees', (req, res) => {
  const employees = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Developer' },
  ];
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const newEmployee = req.body;
  // You would typically save the new employee to a database here
  res.status(201).json(newEmployee);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});