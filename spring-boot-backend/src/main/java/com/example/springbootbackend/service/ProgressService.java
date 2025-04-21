package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Progress;
import com.example.springbootbackend.repository.ProgressRepository;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Progress> getUserProgress(Integer userId) {
        return progressRepository.findByUserId(userId);
    }

    public int calculateCompletionPercentage(Integer userId) {
        List<Progress> progressList = progressRepository.findByUserId(userId);


        long totalTopics = topicRepository.count();

        long completedTopics = progressList.stream()
                .filter(p -> p.isCompleted())
                .count();

        double completionPercentage = (completedTopics / (double) totalTopics) * 100;

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
            progress.setQuizScore(null);
            progress.setCompleted(false);

        }
        updateCompletionStatus(progress);
        progressRepository.save(progress);
    }


    public void markQuizFinished(int userId, int topicId, String score) {
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
            progress.setQuizScore(score);
            progress.setCompleted(false);
        }

        updateCompletionStatus(progress);
        progressRepository.save(progress);
    }

    private void updateCompletionStatus(Progress progress) {
        progress.setCompleted(progress.isViewedExample() && progress.isCompletedQuiz());
    }

}

