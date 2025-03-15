package com.example.springbootbackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    private Long userId;
    private Long topicId;

    private boolean viewedExample; // True when user has completed the example
    private LocalDateTime viewedExampleAt;

    private boolean completedQuiz; // True when user has completed the quiz
    private LocalDateTime completedQuizAt;

    private Integer quizScore;

    // This will be marked as 'true' when both 'viewedExample' and 'completedQuiz' are true
    private boolean completed;

    // Getters and setters

    public Long getProgressId() {
        return progressId;
    }

    public void setProgressId(Long progressId) {
        this.progressId = progressId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public boolean isViewedExample() {
        return viewedExample;
    }

    public void setViewedExample(boolean viewedExample) {
        this.viewedExample = viewedExample;
    }

    public LocalDateTime getViewedExampleAt() {
        return viewedExampleAt;
    }

    public void setViewedExampleAt(LocalDateTime viewedExampleAt) {
        this.viewedExampleAt = viewedExampleAt;
    }

    public boolean isCompletedQuiz() {
        return completedQuiz;
    }

    public void setCompletedQuiz(boolean completedQuiz) {
        this.completedQuiz = completedQuiz;
    }

    public LocalDateTime getCompletedQuizAt() {
        return completedQuizAt;
    }

    public void setCompletedQuizAt(LocalDateTime completedQuizAt) {
        this.completedQuizAt = completedQuizAt;
    }

    public Integer getQuizScore() {
        return quizScore;
    }

    public void setQuizScore(Integer quizScore) {
        this.quizScore = quizScore;
    }

    public boolean isCompleted() {
        // Completed will be 'true' when both the quiz and example have been completed
        return viewedExample && completedQuiz;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
