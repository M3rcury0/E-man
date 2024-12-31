package com.eman.service;

import com.eman.entity.Manager;
import com.eman.entity.Employee;
import com.eman.repository.ManagerRepository;
import com.eman.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    public Optional<Manager> getManagerById(Integer id) {
        return managerRepository.findById(id);
    }

    public Manager saveManager(Manager manager) {
        return managerRepository.save(manager);
    }

    public void deleteManager(Integer id) {
        // Check if manager has employees
        List<Employee> employees = employeeRepository.findAll();
        boolean hasEmployees = employees.stream()
            .anyMatch(emp -> emp.getManagerId() != null && emp.getManagerId().equals(id));
            
        if (hasEmployees) {
            throw new RuntimeException("Cannot delete manager with assigned employees");
        }
        
        managerRepository.deleteById(id);
    }

    public Manager updateManager(Integer id, Manager managerDetails) {
        Manager manager = managerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Manager not found with id: " + id));

        manager.setName(managerDetails.getName());
        manager.setDepartment(managerDetails.getDepartment());

        return managerRepository.save(manager);
    }

    public List<Manager> findByDepartment(String department) {
        return managerRepository.findByDepartment(department);
    }

    public List<Employee> getEmployeesUnderManager(Integer managerId) {
        return employeeRepository.findAll().stream()
            .filter(emp -> emp.getManagerId() != null && emp.getManagerId().equals(managerId))
            .toList();
    }

    public boolean existsById(Integer id) {
        return managerRepository.existsById(id);
    }

    public List<Manager> getAllManagersSortedByName() {
        return managerRepository.findAllByOrderByNameAsc();
    }

    public Manager findByName(String name) {
        return managerRepository.findByName(name);
    }

    public long getManagerCount() {
        return managerRepository.count();
    }

    public boolean isDepartmentHead(Integer managerId, String department) {
        Optional<Manager> manager = managerRepository.findById(managerId);
        return manager.map(m -> m.getDepartment().equals(department))
                     .orElse(false);
    }
}