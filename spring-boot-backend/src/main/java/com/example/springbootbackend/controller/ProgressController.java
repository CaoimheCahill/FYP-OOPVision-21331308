package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.UserProgressResponse;
import com.example.springbootbackend.model.Progress;
import com.example.springbootbackend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Endpoint to get user progress by userId
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProgress(@PathVariable Integer userId) {
        System.out.println("Fetching progress for userId: " + userId);
        List<Progress> progressList = progressService.getUserProgress(userId);
        if (progressList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        int completionPercentage = progressService.calculateCompletionPercentage(userId);
        return ResponseEntity.ok(new UserProgressResponse(progressList, completionPercentage));
    }
}
