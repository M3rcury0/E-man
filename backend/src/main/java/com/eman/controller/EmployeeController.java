package com.eman.controller;

import com.eman.entity.Employee;
import com.eman.entity.User;
import com.eman.service.UserService;
import com.eman.service.ManagerService;
import com.eman.repository.EmployeeRepository;
import com.eman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private ManagerService managerService;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            System.out.println("Fetching all employees...");
            List<Employee> employees = employeeRepository.findAll();
            System.out.println("Found " + employees.size() + " employees");
            
            if (employees.isEmpty()) {
                System.out.println("No employees found in database");
            } else {
                employees.forEach(emp -> {
                    System.out.println("Found employee: " + 
                        "ID=" + emp.getId() + 
                        ", Name=" + emp.getName() + 
                        ", Age=" + emp.getAge() + 
                        ", ManagerID=" + emp.getManagerId());
                });
            }
            
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            System.err.println("Error fetching employees: ");
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // New endpoint to get employee details
    @GetMapping("/details")
    public ResponseEntity<Employee> getEmployeeDetails() {
        try {
            System.out.println("Fetching employee details");
            List<Employee> employees = employeeRepository.findAll();
            
            if (!employees.isEmpty()) {
                Employee employee = employees.get(0);
                System.out.println("Found employee: " + 
                    "ID=" + employee.getId() + 
                    ", Name=" + employee.getName() + 
                    ", Age=" + employee.getAge() + 
                    ", ManagerID=" + employee.getManagerId());
                return ResponseEntity.ok(employee);
            } else {
                System.out.println("No employee records found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error fetching employee details: ");
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Debug log
            System.out.println("Login attempt for username: " + loginRequest.getUsername());
            
            // Find user by username and password using UserRepository
            User user = userRepository.findByUsernameAndPassword(
                loginRequest.getUsername(), 
                loginRequest.getPassword()
            );
            
            if (user != null) {
                System.out.println("Login successful for user: " + user.getUsername());
                
                // Create response object
                Map<String, String> response = new HashMap<>();
                response.put("username", user.getUsername());
                
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Login failed - invalid credentials");
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Login error: " + e.getMessage());
        }
    }
}

class LoginRequest {
    private String username;
    private String password;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}