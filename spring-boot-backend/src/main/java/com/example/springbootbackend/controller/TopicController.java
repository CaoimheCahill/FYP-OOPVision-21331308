package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Topic;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicRepository topicRepository;

    public TopicController(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @GetMapping("/getAll")
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // Endpoint to return the total count of topics
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalTopics() {
        long totalTopics = topicRepository.count();  // Get the count from the database
        return ResponseEntity.ok(totalTopics);
    }

}
