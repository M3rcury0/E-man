package com.eman.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "employee")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", length = 45, nullable = false)
    private String name;
    
    @Column(name = "age", nullable = false)
    private Integer age;
    
    @ManyToOne(fetch = FetchType.EAGER)  // Change this from LAZY to EAGER
    @JoinColumn(name = "manager_id")
    @JsonBackReference
    private Manager manager;
    
    // Constructors
    public Employee() {
    }
    
    public Employee(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
    
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
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public Manager getManager() {
        return manager;
    }
    
    public void setManager(Manager manager) {
        this.manager = manager;
    }
    
    public Integer getManagerId() {
        return manager != null ? manager.getId() : null;
    }
    
    // Add these helper methods to get manager details
    public String getManagerName() {
        return manager != null ? manager.getName() : null;
    }
    
    public String getManagerDepartment() {
        return manager != null ? manager.getDepartment() : null;
    }
    
    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", manager=" + (manager != null ? manager.getName() : "null") +
                '}';
    }
}