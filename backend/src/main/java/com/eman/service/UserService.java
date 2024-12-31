package com.eman.service;

import com.eman.entity.User;
import com.eman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findById(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsById(username);
    }

    public boolean validateUser(String username, String password) {
        Optional<User> user = userRepository.findById(username);
        return user.map(u -> u.getPassword().equals(password))
                  .orElse(false);
    }

    public User updateUser(String username, User userDetails) {
        User user = userRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        
        user.setPassword(userDetails.getPassword());
        return userRepository.save(user);
    }
}