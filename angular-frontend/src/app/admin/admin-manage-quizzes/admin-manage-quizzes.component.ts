import {Component, OnInit} from '@angular/core';
import {Quiz, QuizService} from '../../service/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NgForOf} from '@angular/common';
import {Topic, TopicService} from '../../service/topic.service';

@Component({
  selector: 'app-admin-manage-quizzes',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './admin-manage-quizzes.component.html',
  styleUrl: './admin-manage-quizzes.component.scss'
})
export class AdminManageQuizzesComponent implements OnInit{
  topicId!: number;
  quizzes: Quiz[] = [];
  topicTitle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private titleService: Title,
    private topicService: TopicService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Manage Quizzes');
    this.topicId = +this.route.snapshot.paramMap.get('topicId')!;
    this.loadTopic();
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizByTopicId(this.topicId).subscribe({
      next: (data) => (this.quizzes = data),
      error: (err) => console.error('Error loading quizzes:', err)
    });
  }

  loadTopic(): void {
    this.topicService.getTopicById(this.topicId).subscribe({
      next: (topic: Topic) => {
        this.topicTitle = topic.topicTitle;
        this.titleService.setTitle(`Manage Quizzes - ${this.topicTitle}`);
      },
      error: (err) => console.error('Error loading topic:', err)
    });
  }

  createQuiz(): void {
    this.router.navigate(['/admin/quizzes/new'], {queryParams: {topicId: this.topicId}});
  }

  editQuiz(quizId: number): void {
    this.router.navigate(['/admin/quizzes', quizId, 'edit']);
  }

  deleteQuiz(quizId: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(quizId).subscribe({
        next: () => this.loadQuizzes(),
        error: (err) => console.error('Error deleting quiz:', err)
      });
    }
  }

}
