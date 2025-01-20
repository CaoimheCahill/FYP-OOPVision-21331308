package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public List<Image> getImagesByTopicId(Long topicId) {
        return imageRepository.findByTopicId(topicId);
    }
}
