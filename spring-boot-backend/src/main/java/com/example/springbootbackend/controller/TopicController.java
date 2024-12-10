package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Topic;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TopicController {

    private final TopicRepository topicRepository;

    public TopicController(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @GetMapping("/api/topics")
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }
}
