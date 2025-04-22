import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../service/quiz.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {Title} from '@angular/platform-browser';
import {Topic, TopicService} from '../../service/topic.service';

@Component({
  selector: 'app-admin-quizzes',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './admin-quizzes.component.html',
  styleUrl: './admin-quizzes.component.scss'
})
export class AdminQuizzesComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private topicService: TopicService, private quizService: QuizService, private router: Router, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Manage Quizzes');
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopics().subscribe({
      next: (data) => this.topics = data,
      error: (err) => console.error('Error fetching topics:', err)
    });
  }

  manageQuizzes(topic: Topic): void {
    this.router.navigate(['/admin/topics', topic.topicId, 'quizzes']);
  }
}
