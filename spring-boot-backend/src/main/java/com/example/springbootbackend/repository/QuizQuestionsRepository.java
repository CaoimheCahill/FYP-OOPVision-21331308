package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.QuizQuestions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionsRepository extends JpaRepository<QuizQuestions, Integer> {
}

