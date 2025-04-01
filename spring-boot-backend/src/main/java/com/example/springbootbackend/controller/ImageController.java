package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/{visualExampleId}")
    public List<Image> getImagesByVisualExample(@PathVariable Integer visualExampleId) {
        return imageService.getImagesByExampleId(visualExampleId);
    }
}
