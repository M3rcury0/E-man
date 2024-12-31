package com.eman.service;

import com.eman.entity.User;
import com.eman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by username (not ID)
    public Optional<User> getUserByUsername(String username) {  // Changed from getUserById
        return userRepository.findById(username);
    }

    // Save user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Delete user by username
    public void deleteUser(String username) {  // Changed from Integer to String
        userRepository.deleteById(username);
    }

    // Update user
    public User updateUser(String username, User userDetails) {  // Changed from Integer to String
        User user = userRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        
        user.setPassword(userDetails.getPassword());
        
        return userRepository.save(user);
    }

    // Find user by username and password (for login)
    public User findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    // Check if user exists
    public boolean existsByUsername(String username) {  // Changed from existsById
        return userRepository.existsById(username);
    }
}