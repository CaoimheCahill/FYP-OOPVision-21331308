package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.QuizQuestions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizQuestionsRepository extends JpaRepository<QuizQuestions, Integer> {

    List<QuizQuestions> findByQuizId(Integer quizId);
}

