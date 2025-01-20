package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByTopicId(Long topicId);
}

