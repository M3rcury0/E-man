package com.eman.repository;

import com.eman.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {

    List<Manager> findByDepartment(String department);
    Manager findByName(String name);
    List<Manager> findAllByOrderByNameAsc();
    
}