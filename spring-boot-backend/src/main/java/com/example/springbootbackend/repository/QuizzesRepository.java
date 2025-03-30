package com.example.springbootbackend.repository;

import com.example.springbootbackend.dto.QuizDTO;
import com.example.springbootbackend.model.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizzesRepository extends JpaRepository<Quizzes, Integer> {
    List<Quizzes> findByTopicId(Integer topicId);

    @Query("SELECT new com.example.springbootbackend.dto.QuizDTO(q.quizId, q.title, q.topicId, t.topicTitle) " +
            "FROM Quizzes q JOIN Topic t ON q.topicId = t.topicId")
    List<QuizDTO> findAllQuizzesWithTopicName();
}

