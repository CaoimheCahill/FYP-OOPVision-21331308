package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.QuizDTO;
import com.example.springbootbackend.model.*;
import com.example.springbootbackend.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VisualExampleService visualExampleService;

    // ------------------------------
    //           USER
    // ------------------------------

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

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

    @GetMapping("/quizzes")
    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {
        List<QuizDTO> quizzes = quizService.getAllQuizzesWithTopicName();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/topics/{topicId}/quizzes")
    public ResponseEntity<List<Quizzes>> getQuizzesByTopic(@PathVariable Integer topicId) {
        List<Quizzes> quizzes = quizService.getQuizzesByTopicId(topicId);
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/quizzes/{quizId}")
    public ResponseEntity<Quizzes> getQuizById(@PathVariable Integer quizId) {
        return quizService.getQuizById(quizId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
    //       VISUAL EXAMPLE
    // ------------------------------

    @GetMapping("/example/topics/{topicId}")
    public ResponseEntity<List<VisualExample>> getVisualExamplesByTopic(@PathVariable Integer topicId) {
        List<VisualExample> examples = visualExampleService.getVisualExamplesByTopicId(topicId);
        return ResponseEntity.ok(examples);
    }

    @GetMapping("/example/{id}")
    public ResponseEntity<VisualExample> getVisualExampleById(@PathVariable Integer id) {
        VisualExample example = visualExampleService.getVisualExampleById(id);
        return ResponseEntity.ok(example);
    }

    @PostMapping("/example/topics/{topicId}")
    public ResponseEntity<VisualExample> createVisualExample(@PathVariable Integer topicId,
                                                             @RequestBody VisualExample visualExample) {
        visualExample.setTopicId(topicId);
        VisualExample created = visualExampleService.createVisualExample(visualExample);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/example/{id}")
    public ResponseEntity<VisualExample> updateVisualExample(@PathVariable Integer id,
                                                             @RequestBody VisualExample visualExample) {
        VisualExample updated = visualExampleService.updateVisualExample(id, visualExample);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/example/{id}")
    public ResponseEntity<String> deleteVisualExample(@PathVariable Integer id) {
        visualExampleService.deleteVisualExample(id);
        return ResponseEntity.ok("Visual example deleted");
    }

    // ------------------------------
    //           IMAGES
    // ------------------------------

    @GetMapping("/example/{visualExampleId}/images")
    public ResponseEntity<List<Image>> getImagesByVisualExample(@PathVariable Integer visualExampleId) {
        List<Image> images = imageService.getImagesByExampleId(visualExampleId);
        return ResponseEntity.ok(images);
    }

    @PostMapping("/example/{visualExampleId}/images")
    public ResponseEntity<Image> addImage(
            @PathVariable Integer visualExampleId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "imageSide", required = false) String imageSide,
            @RequestParam(value = "orderIndex", required = false) Integer orderIndex) {

        Image imageDetails = new Image();
        imageDetails.setImageSide(imageSide);
        imageDetails.setOrderIndex(orderIndex != null ? orderIndex : 0);
        Image created = imageService.addImage(visualExampleId, file, imageDetails);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/example/images/{imageId}")
    public ResponseEntity<Image> updateImage(
            @PathVariable Integer imageId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "imageSide", required = false) String imageSide,
            @RequestParam(value = "orderIndex", required = false) Integer orderIndex) {

        Image updated = imageService.updateImage(imageId, file, imageSide, orderIndex);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/example/images/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Integer imageId) {
        imageService.deleteImage(imageId);
        return ResponseEntity.ok("Image deleted");
    }

}
