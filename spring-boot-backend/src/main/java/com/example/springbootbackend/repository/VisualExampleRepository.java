package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.VisualExample;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisualExampleRepository extends JpaRepository<VisualExample, Integer> {
    List<VisualExample> findByTopicId(Integer topicId);
}
