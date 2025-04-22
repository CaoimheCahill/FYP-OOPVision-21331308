package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.model.VisualExample;
import com.example.springbootbackend.service.ImageService;
import com.example.springbootbackend.service.VisualExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private VisualExampleService visualExampleService;

    @GetMapping("/example/topics/{topicId}")
    public ResponseEntity<List<VisualExample>> getVisualExamplesByTopic(@PathVariable Integer topicId) {
        List<VisualExample> examples = visualExampleService.getVisualExamplesByTopicId(topicId);
        return ResponseEntity.ok(examples);
    }

    @GetMapping("/{visualExampleId}")
    public List<Image> getImagesByVisualExample(@PathVariable Integer visualExampleId) {
        return imageService.getImagesByExampleId(visualExampleId);
    }
}
