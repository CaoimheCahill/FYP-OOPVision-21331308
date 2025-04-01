package com.example.springbootbackend.service;

import com.example.springbootbackend.enums.UserRole;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        return userRepository.save(user);
    }

    public void promoteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUserRole(UserRole.ADMIN);
        userRepository.save(user);
    }

    public void demoteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUserRole(UserRole.USER);
        userRepository.save(user);
    }

    public void removeUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }
}

