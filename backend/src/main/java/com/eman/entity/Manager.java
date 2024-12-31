package com.eman.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "manager")
public class Manager {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", length = 60, nullable = false)
    private String name;
    
    @Column(name = "department", length = 225, nullable = false)
    private String department;
    
    @OneToMany(mappedBy = "manager")
    private List<Employee> employees;
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public List<Employee> getEmployees() {
        return employees;
    }
    
    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
}