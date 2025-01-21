package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Quizzes;
import com.example.springbootbackend.model.QuizQuestions;
import com.example.springbootbackend.repository.QuizQuestionsRepository;
import com.example.springbootbackend.repository.QuizzesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    @Autowired
    private QuizzesRepository quizzesRepository;

    @Autowired
    private QuizQuestionsRepository quizQuestionsRepository;

    // Get quizzes by topic ID
    public List<Quizzes> getQuizzesByTopicId(Integer topicId) {
        return quizzesRepository.findByTopicId(topicId);
    }

    // Get questions by quiz ID
    public List<QuizQuestions> getQuestionsByQuizId(Integer quizId) {
        return quizQuestionsRepository.findByQuizId(quizId);
    }
}
