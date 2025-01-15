package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping
    public ResponseEntity<List<Image>> getImages(
            @RequestParam Long topicId,
            @RequestParam int page,
            @RequestParam int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("order_index"));
        Page<Image> images = imageRepository.findByTopicId(topicId, pageable);

        return ResponseEntity.ok(images.getContent());
    }
}

