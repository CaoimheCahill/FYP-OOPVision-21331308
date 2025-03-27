package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.model.QuizQuestions;
import com.example.springbootbackend.model.Quizzes;
import com.example.springbootbackend.model.Topic;
import com.example.springbootbackend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private TopicService topicService;

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuizQuestionsService quizQuestionService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private UserService userService;

    // ------------------------------
    //           USER
    // ------------------------------

    @PutMapping("/users/{userId}/promote")
    public ResponseEntity<String> promoteUser(@PathVariable Long userId) {
        userService.promoteUser(userId);
        return ResponseEntity.ok("User promoted to Admin.");
    }

    @PutMapping("/users/{userId}/demote")
    public ResponseEntity<String> demoteUser(@PathVariable Long userId) {
        userService.demoteUser(userId);
            return ResponseEntity.ok("Admin demoted to User.");
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.removeUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    // ------------------------------
    //           TOPICS
    // ------------------------------

    @GetMapping("/topics/{id}")
    public ResponseEntity<Topic> getTopic(@PathVariable Long id) {
        Topic topic = topicService.getTopicById(id);
        return ResponseEntity.ok(topic);
    }

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        Topic created = topicService.createTopic(topic);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/topics/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable Long id, @RequestBody Topic topic) {
        Topic updated = topicService.updateTopic(id, topic);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/topics/{id}")
    public ResponseEntity<String> deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
        return ResponseEntity.ok("Topic deleted");
    }

    // ------------------------------
    //           QUIZZES
    // ------------------------------

    @GetMapping("/topics/{topicId}/quizzes")
    public ResponseEntity<List<Quizzes>> getQuizzesByTopic(@PathVariable Integer topicId) {
        List<Quizzes> quizzes = quizService.getQuizzesByTopicId(topicId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping("/topics/{topicId}/quizzes")
    public ResponseEntity<Quizzes> createQuiz(@PathVariable Long topicId, @RequestBody Quizzes quiz) {
        Quizzes created = quizService.createQuiz(topicId, quiz);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/quizzes/{quizId}")
    public ResponseEntity<Quizzes> updateQuiz(@PathVariable Integer quizId, @RequestBody Quizzes quiz) {
        Quizzes updated = quizService.updateQuiz(quizId, quiz);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Integer quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.ok("Quiz deleted");
    }

    // ------------------------------
    //        QUIZ QUESTIONS
    // ------------------------------

    @GetMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<List<QuizQuestions>> getQuestionsByQuiz(@PathVariable Integer quizId) {
        List<QuizQuestions> questions = quizService.getQuestionsByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<QuizQuestions> addQuestion(@PathVariable Integer quizId, @RequestBody QuizQuestions question) {
        QuizQuestions created = quizQuestionService.addQuestion(quizId, question);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/questions/{questionId}")
    public ResponseEntity<QuizQuestions> updateQuestion(@PathVariable Integer questionId, @RequestBody QuizQuestions question) {
        QuizQuestions updated = quizQuestionService.updateQuestion(questionId, question);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Integer questionId) {
        quizQuestionService.deleteQuestion(questionId);
        return ResponseEntity.ok("Question deleted");
    }

    // ------------------------------
    //           IMAGES
    // ------------------------------

    @GetMapping("/topics/{topicId}/images")
    public ResponseEntity<List<Image>> getImagesByTopic(@PathVariable Long topicId) {
        List<Image> images = imageService.getImagesByTopicId(topicId);
        return ResponseEntity.ok(images);
    }

    @PostMapping("/topics/{topicId}/images")
    public ResponseEntity<Image> addImage(
            @PathVariable Integer topicId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "imageSide", required = false) String imageSide,
            @RequestParam(value = "orderIndex", required = false) Integer orderIndex) {

        Image imageDetails = new Image();
        imageDetails.setImageSide(imageSide);
        imageDetails.setOrderIndex(orderIndex != null ? orderIndex : 0);
        Image created = imageService.addImage(topicId, file, imageDetails);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/images/{imageId}")
    public ResponseEntity<Image> updateImage(
            @PathVariable Integer imageId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "imageSide", required = false) String imageSide,
            @RequestParam(value = "orderIndex", required = false) Integer orderIndex) {

        Image updated = imageService.updateImage(imageId, file, imageSide, orderIndex);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Integer imageId) {
        imageService.deleteImage(imageId);
        return ResponseEntity.ok("Image deleted");
    }

}
