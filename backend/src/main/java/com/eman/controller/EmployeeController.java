package com.eman.controller;

import com.eman.entity.Employee;
import com.eman.service.UserService;
import com.eman.service.ManagerService;
import com.eman.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // Other endpoints...
}