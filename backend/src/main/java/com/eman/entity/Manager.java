package com.eman.entity;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "manager")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Add this annotation
public class Manager {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", length = 60, nullable = false)
    private String name;
    
    @Column(name = "department", length = 225, nullable = false)
    private String department;
    
    @OneToMany(mappedBy = "manager", fetch = FetchType.EAGER) // Change to EAGER fetch
    @JsonManagedReference
    private List<Employee> employees;
    
    // Default constructor
    public Manager() {
    }
    
    // Constructor with fields
    public Manager(String name, String department) {
        this.name = name;
        this.department = department;
    }
    
    // Your existing getters and setters remain the same
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
    
    // Add toString method for debugging
    @Override
    public String toString() {
        return "Manager{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}