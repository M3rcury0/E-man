package com.eman.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eman.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}