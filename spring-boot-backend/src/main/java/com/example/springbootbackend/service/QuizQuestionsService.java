package com.example.springbootbackend.service;

import com.example.springbootbackend.model.QuizQuestions;
import com.example.springbootbackend.model.Quizzes;
import com.example.springbootbackend.repository.QuizQuestionsRepository;
import com.example.springbootbackend.repository.QuizzesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizQuestionsService {

    @Autowired
    private QuizQuestionsRepository quizQuestionsRepository;

    @Autowired
    private QuizzesRepository quizRepository;

    public QuizQuestions addQuestion(Integer quizId, QuizQuestions question) {
        if (!quizRepository.existsById(quizId)) {
            throw new RuntimeException("Quiz not found");
        }
        question.setQuizId(quizId);
        return quizQuestionsRepository.save(question);
    }

    public QuizQuestions updateQuestion(Integer questionId, QuizQuestions updatedQuestion) {
        QuizQuestions existing = quizQuestionsRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        existing.setQuestionText(updatedQuestion.getQuestionText());
        existing.setQuestionType(updatedQuestion.getQuestionType());
        existing.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
        existing.setOptions(updatedQuestion.getOptions());
        return quizQuestionsRepository.save(existing);
    }

    public void deleteQuestion(Integer questionId) {
        if (!quizQuestionsRepository.existsById(questionId)) {
            throw new RuntimeException("Question not found");
        }
        quizQuestionsRepository.deleteById(questionId);
    }

    public List<QuizQuestions> getQuestionsByQuiz(Integer quizId) {
        return quizQuestionsRepository.findAll()
                .stream()
                .filter(q -> q.getQuizId().equals(quizId))
                .collect(Collectors.toList());
    }
}
