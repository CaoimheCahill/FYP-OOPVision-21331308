package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.ProgressRequest;
import com.example.springbootbackend.dto.QuizProgressRequest;
import com.example.springbootbackend.dto.UserProgressResponse;
import com.example.springbootbackend.model.Progress;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.UserRepository;
import com.example.springbootbackend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;


    @Autowired
    private UserRepository userRepository;

    // Endpoint to get user progress by userId
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProgress(@PathVariable Integer userId) {
        List<Progress> progressList = progressService.getUserProgress(userId);
        if (progressList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        int completionPercentage = progressService.calculateCompletionPercentage(userId);
        return ResponseEntity.ok(new UserProgressResponse(progressList, completionPercentage));
    }

    @PostMapping("/mark-viewed")
    public ResponseEntity<?> markViewedExample(@RequestBody ProgressRequest request, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        int userId = userOpt.get().getUserId();
        progressService.markViewedExample(userId, request.getTopicId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/mark-quiz-finished")
    public ResponseEntity<?> markQuizFinished(@RequestBody QuizProgressRequest request, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        int userId = userOpt.get().getUserId();
        progressService.markQuizFinished(userId, request.getTopicId(), request.getScore());
        return ResponseEntity.ok().build();
    }
}
