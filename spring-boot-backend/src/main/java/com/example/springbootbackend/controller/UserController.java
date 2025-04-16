package com.example.springbootbackend.controller;

import com.example.springbootbackend.config.JwtUtil;
import com.example.springbootbackend.dto.JwtResponse;
import com.example.springbootbackend.dto.LoginRequest;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.UserRepository;
import com.example.springbootbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.emailExists(user.getEmail())) {
            // Return 409 Conflict with a message
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with that email already exists"));
        }
        User newUser = userService.registerUser(user);
        String token = jwtUtil.generateToken(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new JwtResponse(token));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                String token = jwtUtil.generateToken(user);
                return ResponseEntity.ok(new JwtResponse(token));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
    }
}

