package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizzesRepository extends JpaRepository<Quizzes, Integer> {
    List<Quizzes> findByTopicId(Integer topicId);
}

