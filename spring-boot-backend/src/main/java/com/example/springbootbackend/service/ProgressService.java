package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Progress;
import com.example.springbootbackend.repository.ProgressRepository;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private TopicRepository topicRepository;

    // Get user progress
    public List<Progress> getUserProgress(Integer userId) {
        return progressRepository.findByUserId(userId);
    }

    // Calculate the completion percentage
    public double calculateCompletionPercentage(Integer userId) {
        List<Progress> progressList = progressRepository.findByUserId(userId);

        // Get the total number of topics
        long totalTopics = topicRepository.count(); // Assuming you have a Topic table to count total topics

        // Calculate the number of completed topics
        long completedTopics = progressList.stream()
                .filter(p -> p.isCompleted()) // isCompleted checks if both viewedExample and completedQuiz are true
                .count();

        // Calculate the completion percentage
        double completionPercentage = (completedTopics / (double) totalTopics) * 100;

        // Round to 2 decimal places using BigDecimal
        BigDecimal roundedPercentage = new BigDecimal(completionPercentage).setScale(2, RoundingMode.HALF_UP);

        return roundedPercentage.doubleValue();
    }
}

