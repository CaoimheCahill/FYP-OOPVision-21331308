package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Quizzes;
import com.example.springbootbackend.model.QuizQuestions;
import com.example.springbootbackend.model.Topic;
import com.example.springbootbackend.repository.QuizQuestionsRepository;
import com.example.springbootbackend.repository.QuizzesRepository;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {
    @Autowired
    private QuizzesRepository quizzesRepository;

    @Autowired
    private QuizQuestionsRepository quizQuestionsRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Quizzes> getQuizzesByTopicId(Integer topicId) {
        return quizzesRepository.findByTopicId(topicId);
    }

    public List<QuizQuestions> getQuestionsByQuizId(Integer quizId) {
        return quizQuestionsRepository.findByQuizId(quizId);
    }

    public Quizzes createQuiz(Long topicId, Quizzes quiz) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        quiz.setTopicId(topic.getTopicId());
        return quizzesRepository.save(quiz);
    }

    public Quizzes updateQuiz(Integer quizId, Quizzes updatedQuiz) {
        Quizzes existing = quizzesRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        existing.setTitle(updatedQuiz.getTitle());
        // If you need to reassign a quiz to another topic, handle that here
        return quizzesRepository.save(existing);
    }

    public void deleteQuiz(Integer quizId) {
        if (!quizzesRepository.existsById(quizId)) {
            throw new RuntimeException("Quiz not found");
        }
        quizzesRepository.deleteById(quizId);
    }
}
