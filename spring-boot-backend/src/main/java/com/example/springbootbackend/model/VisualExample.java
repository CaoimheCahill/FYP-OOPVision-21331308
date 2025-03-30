package com.example.springbootbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "visualexamples")
public class VisualExample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer visualExampleId;

    @Column(nullable = false)
    private Integer topicId;

    @Column(nullable = false, length = 255)
    private String name;

    public VisualExample(Integer topicId, String name) {
        this.topicId = topicId;
        this.name = name;
    }

    public VisualExample() {

    }

    public Integer getVisualExampleId() {
        return visualExampleId;
    }

    public void setVisualExampleId(Integer visualExampleId) {
        this.visualExampleId = visualExampleId;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
