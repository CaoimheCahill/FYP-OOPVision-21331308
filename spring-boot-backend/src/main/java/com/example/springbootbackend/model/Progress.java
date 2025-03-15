package com.example.springbootbackend.model;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer progressId;

    private Integer userId;
    private Integer topicId;

    private boolean viewedExample; // True when user has completed the example
    private LocalDateTime viewedExampleAt;

    private boolean completedQuiz; // True when user has completed the quiz
    private LocalDateTime completedQuizAt;

    private int quizScore;

    // This will be marked as 'true' when both 'viewedExample' and 'completedQuiz' are true
    private boolean completed;

    // Getters and setters

    public int getProgressId() {
        return progressId;
    }

    public void setProgressId(int progressId) {
        this.progressId = progressId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
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
