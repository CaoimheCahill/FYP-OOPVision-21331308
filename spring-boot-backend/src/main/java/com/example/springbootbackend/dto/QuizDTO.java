package com.example.springbootbackend.dto;

public class QuizDTO {
    private Integer quizId;
    private String title;
    private Integer topicId;
    private String topicTitle;

    public QuizDTO(Integer quizId, String title, Integer topicId, String topicTitle) {
        this.quizId = quizId;
        this.title = title;
        this.topicId = topicId;
        this.topicTitle = topicTitle;
    }

    public Integer getQuizId() {
        return quizId;
    }

    public void setQuizId(Integer quizId) {
        this.quizId = quizId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }
}
