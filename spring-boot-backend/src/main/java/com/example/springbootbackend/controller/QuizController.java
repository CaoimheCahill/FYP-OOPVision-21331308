package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.QuizQuestions;
import com.example.springbootbackend.model.Quizzes;
import com.example.springbootbackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Get quizzes by subtopic ID
    @GetMapping("/{topicId}")
    public List<Quizzes> getQuizzesByTopic(@PathVariable Integer topicId) {
        return quizService.getQuizzesByTopicId(topicId);
    }

    // Get questions by quiz ID
    @GetMapping("/{quizId}/questions")
    public List<QuizQuestions> getQuestionsByQuiz(@PathVariable Integer quizId) {
        return quizService.getQuestionsByQuizId(quizId);
    }
}

