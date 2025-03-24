package com.example.springbootbackend.dto;

public class QuizProgressRequest {
    private int topicId;
    private String score;

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }
}

