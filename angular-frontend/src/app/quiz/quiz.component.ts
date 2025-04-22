import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {Quiz, QuizQuestion, QuizService} from '../service/quiz.service';
import {FormsModule} from '@angular/forms';
import {catchError, of, switchMap, throwError} from 'rxjs';
import {ProgressService} from '../service/progress.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  topicId!: number;
  quizId!: number;
  questions: QuizQuestion[] = [];
  currentQuestion: QuizQuestion | null = null;
  currentStep = 0;
  selectedOption: string | null = null;
  shortAnswer: string = '';
  score: number = 0;
  showResults: boolean = false;
  finalResult: string = '';

  constructor(private titleService: Title, private quizService: QuizService, private route: ActivatedRoute, private router: Router, private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Quiz');
    this.route.params.subscribe(params => {
      this.topicId = +params['topicId'];
      this.quizId = +params['quizId'];
      this.loadQuizQuestions(this.quizId);
    });
  }

  loadQuizQuestions(quizId: number): void {
    this.quizService.getQuizByQuizId(quizId).pipe(
      switchMap((quiz: Quiz) => {
        if (!quiz || !quiz.quizId) {
          return throwError(() => new Error('Quiz not found or ID undefined.'));
        }
        return this.quizService.getQuestionsByQuizId(quiz.quizId);
      }),
      catchError(error => {
        console.error('Error fetching quiz or questions:', error);
        return of<QuizQuestion[]>([]);
      })
    ).subscribe((questions: QuizQuestion[]) => {
      this.questions = questions.map(question => ({
        ...question,
        options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options,
        userAnswer: null
      }));

      if (this.questions.length > 0) {
        this.currentQuestion = this.questions[this.currentStep];
      } else {
        console.warn('No questions available.');
      }
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    if (this.currentQuestion) {
      this.currentQuestion.userAnswer = option;
    }
  }

  updateShortAnswer(event: any): void {
    if (this.currentQuestion) {
      this.currentQuestion.userAnswer = event.target.value; // Save typed answer
    }
  }

  goBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.currentQuestion = this.questions[this.currentStep];
      this.restoreSelection();
    }
  }

  goNext(): void {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.currentQuestion = this.questions[this.currentStep];
      this.restoreSelection();
    } else {
      this.calculateScore();
      // Call the progress service to mark quiz as finished
      this.finalResult = `${this.score}/${this.questions.length}`;
      this.progressService.markQuizFinished(this.topicId, this.finalResult).subscribe({
        next: () => {
          this.showResults = true;
        },
        error: (err: any) => {
          console.error('Error finishing quiz:', err);
          // Still show the results even if the update fails.
          this.showResults = true;
        }
      });
    }
  }

  restoreSelection(): void {
    if (this.currentQuestion) {
      this.selectedOption = this.currentQuestion.userAnswer || null;
      this.shortAnswer = this.currentQuestion.userAnswer || '';
    }
  }

  calculateScore(): void {
    this.score = this.questions.reduce((total, question) => {
      if (!question.userAnswer) return total;

      const userAnswer = question.userAnswer.trim().toLowerCase();
      const correctAnswer = question.correctAnswer.trim().toLowerCase();

      return total + (userAnswer === correctAnswer ? 1 : 0);
    }, 0);
  }


  restartQuiz(): void {
    this.currentStep = 0;
    this.showResults = false;
    this.questions.forEach(q => (q.userAnswer = null));
    this.currentQuestion = this.questions[this.currentStep];
    this.resetSelection();
  }

  resetSelection(): void {
    this.selectedOption = null;
    this.shortAnswer = '';
  }

  leaveQuiz() {
    this.router.navigate(['/topic', this.topicId])
  }
}
