package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Progress;
import com.example.springbootbackend.repository.ProgressRepository;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    public int calculateCompletionPercentage(Integer userId) {
        List<Progress> progressList = progressRepository.findByUserId(userId);

        // Get the total number of topics
        long totalTopics = topicRepository.count(); // Assuming you have a Topic table to count total topics

        // Calculate the number of completed topics
        long completedTopics = progressList.stream()
                .filter(p -> p.isCompleted()) // isCompleted checks if both viewedExample and completedQuiz are true
                .count();

        // Calculate the completion percentage
        double completionPercentage = (completedTopics / (double) totalTopics) * 100;

        // Round to the nearest whole number and cast to an integer
        int roundedPercentage = (int) Math.round(completionPercentage);

        return roundedPercentage;
    }

    public void markViewedExample(int userId, int topicId) {
        Optional<Progress> progressOpt = progressRepository.findByUserIdAndTopicId(userId, topicId);
        Progress progress;
        if (progressOpt.isPresent()) {
            progress = progressOpt.get();
            progress.setViewedExample(true);
            progress.setViewedExampleAt(LocalDateTime.now());
        } else {
            progress = new Progress();
            progress.setUserId(userId);
            progress.setTopicId(topicId);
            progress.setViewedExample(true);
            progress.setViewedExampleAt(LocalDateTime.now());
            progress.setCompletedQuiz(false);
            progress.setCompletedQuizAt(null);
            progress.setQuizScore(0);
            progress.setCompleted(false);

        }
        updateCompletionStatus(progress);
        progressRepository.save(progress);
    }


    public void markQuizFinished(int userId, int topicId, int score) {
        Optional<Progress> progressOpt = progressRepository.findByUserIdAndTopicId(userId, topicId);
        Progress progress;
        if (progressOpt.isPresent()) {
            progress = progressOpt.get();
            progress.setCompletedQuiz(true);
            progress.setCompletedQuizAt(LocalDateTime.now());
            progress.setQuizScore(score);
        } else {
            progress = new Progress();
            progress.setUserId(userId);
            progress.setTopicId(topicId);
            progress.setViewedExample(false);
            progress.setViewedExampleAt(null);
            progress.setCompletedQuiz(true);
            progress.setCompletedQuizAt(LocalDateTime.now());
            progress.setQuizScore(0);
            progress.setCompleted(false);
        }

        updateCompletionStatus(progress);
        progressRepository.save(progress);
    }

    private void updateCompletionStatus(Progress progress) {
        progress.setCompleted(progress.isViewedExample() && progress.isCompletedQuiz());
    }

}

