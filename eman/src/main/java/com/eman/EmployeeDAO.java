package com.eman;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;



public class EmployeeDAO {
    // Database connection details
    private static final String URL = "jdbc:mysql://localhost:3306/empms";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "root";

 
   
    public void readAllUser() // Displays the name of all employees 
    {
        String sql = "SELECT * FROM Employee";
        try (Connection con = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             Statement stmt = con.createStatement();
             ResultSet r = stmt.executeQuery(sql)) {

            while (r.next()) {
                String name = r.getString("name");
                System.out.println(name);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    
    public void insertEmployee(String name, int age, int managerId) //Inserts a new employee in the database 
    {
        String sql = "INSERT INTO EMPLOYEE(name, age, manager_id) VALUES(?, ?, ?)";
        try (Connection con = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setInt(2, age);
            ps.setInt(3, managerId);
            ps.executeUpdate();
            System.out.println("Insertion Successful");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    
    public void deleteEmployee(int id) // Deletes a row taking id as reference
    {
        String sql = "DELETE FROM EMPLOYEE WHERE id=?";
        try (Connection con = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();
            System.out.println("Deletion Successful");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    
    public void updateEmployee(String name, int age, int managerId, int id) // Updates an existing row using id as reference 
    {
        String sql = "UPDATE EMPLOYEE SET name=?, age=?, manager_id=? WHERE id=?";
        try (Connection con = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setInt(2, age);
            ps.setInt(3, managerId);
            ps.setInt(4, id);
            ps.executeUpdate();
            System.out.println("Update Successful");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Main method to test the DAO functionality
    public static void main(String[] args) {
        EmployeeDAO employeeDAO = new EmployeeDAO();

        // Test inserting an employee
        employeeDAO.insertEmployee("Leela Bannerjee", 32, 5);

        // Test deleting an employee
        employeeDAO.deleteEmployee(5);

        // Test updating an employee
        employeeDAO.updateEmployee("Ashish Gupta", 21, 2, 5);

        // Test reading all employees
        employeeDAO.readAllUser();
    }
}
