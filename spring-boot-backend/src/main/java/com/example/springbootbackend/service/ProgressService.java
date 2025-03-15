package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Progress;
import com.example.springbootbackend.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // Get user progress
    public List<Progress> getUserProgress(Integer userId) {
        return progressRepository.findByUserId(userId);
    }

    // Calculate the completion percentage
    public double calculateCompletionPercentage(List<Progress> progressList) {
        int completed = 0;
        int total = progressList.size();
        for (Progress p : progressList) {
            if (p.isCompleted()) {
                completed++;
            }
        }
        return total == 0 ? 0 : (completed / (double) total) * 100;
    }
}

