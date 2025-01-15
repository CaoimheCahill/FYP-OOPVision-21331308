package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ImageRepository extends JpaRepository<Image, Long> {
    Page<Image> findByTopicId(Long topicId, Pageable pageable);
}

