package com.example.springbootbackend.dto;

public class QuizProgressRequest {
    private int topicId;
    private int score;

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}

