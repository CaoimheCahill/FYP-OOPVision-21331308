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

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalTopics() {
        long totalTopics = topicRepository.count();
        return ResponseEntity.ok(totalTopics);
    }

}
