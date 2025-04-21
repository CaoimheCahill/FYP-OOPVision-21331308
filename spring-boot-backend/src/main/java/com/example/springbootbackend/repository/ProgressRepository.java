package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Integer> {
    List<Progress> findByUserId(Integer userId);

    Optional<Progress> findByUserIdAndTopicId(Integer userId, Integer topicId);
}

