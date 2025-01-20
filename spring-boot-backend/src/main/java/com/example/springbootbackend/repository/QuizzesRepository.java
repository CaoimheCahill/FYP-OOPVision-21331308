package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizzesRepository extends JpaRepository<Quizzes, Integer> {
}

