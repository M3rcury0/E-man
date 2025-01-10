package com.eman.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.eman.entity.Employee;
import com.eman.repository.EmployeeRepository;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee employee1;
    private Employee employee2;

    @BeforeEach
    void setUp() {
        // Initialize test data
        employee1 = new Employee("John Doe", 30);
        employee1.setId(1);
        
        employee2 = new Employee("Jane Smith", 25);
        employee2.setId(2);
    }

    @Test
    void getAllEmployees_ShouldReturnListOfEmployees() {
        // Arrange
        List<Employee> expectedEmployees = Arrays.asList(employee1, employee2);
        when(employeeRepository.findAll()).thenReturn(expectedEmployees);

        // Act
        List<Employee> actualEmployees = employeeService.getAllEmployees();

        // Assert
        assertNotNull(actualEmployees);
        assertEquals(2, actualEmployees.size());
        assertEquals(expectedEmployees, actualEmployees);
        verify(employeeRepository).findAll();
    }

    @Test
    void getEmployeeById_WithValidId_ShouldReturnEmployee() {
        // Arrange
        when(employeeRepository.findById(1)).thenReturn(Optional.of(employee1));

        // Act
        Employee foundEmployee = employeeService.getEmployeeById(1);

        // Assert
        assertNotNull(foundEmployee);
        assertEquals(employee1.getId(), foundEmployee.getId());
        assertEquals(employee1.getName(), foundEmployee.getName());
        verify(employeeRepository).findById(1);
    }

    @Test
    void getEmployeeById_WithInvalidId_ShouldThrowException() {
        // Arrange
        when(employeeRepository.findById(99)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            employeeService.getEmployeeById(99);
        });
        verify(employeeRepository).findById(99);
    }

    @Test
    void saveEmployee_ShouldReturnSavedEmployee() {
        // Arrange
        Employee newEmployee = new Employee("New Employee", 28);
        when(employeeRepository.save(any(Employee.class))).thenReturn(newEmployee);

        // Act
        Employee savedEmployee = employeeService.saveEmployee(newEmployee);

        // Assert
        assertNotNull(savedEmployee);
        assertEquals(newEmployee.getName(), savedEmployee.getName());
        assertEquals(newEmployee.getAge(), savedEmployee.getAge());
        verify(employeeRepository).save(newEmployee);
    }

    @Test
    void deleteEmployee_ShouldCallRepositoryDeleteById() {
        // Arrange
        Integer employeeId = 1;

        // Act
        employeeService.deleteEmployee(employeeId);

        // Assert
        verify(employeeRepository).deleteById(employeeId);
    }
}