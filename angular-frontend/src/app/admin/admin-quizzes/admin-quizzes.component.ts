import {Component, OnInit} from '@angular/core';
import {Quiz, QuizService} from '../../service/quiz.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-admin-quizzes',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterLink, NgOptimizedImage],
  templateUrl: './admin-quizzes.component.html',
  styleUrl: './admin-quizzes.component.scss'
})
export class AdminQuizzesComponent implements OnInit{
  quizzes: Quiz[] = [];
  topicId = 1;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => this.quizzes = data,
      error: (err) => console.error('Error fetching quizzes:', err)
    });
  }

  createQuiz(): void {
    this.router.navigate(['/admin/quizzes/new'], { queryParams: { topicId: this.topicId } });
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
