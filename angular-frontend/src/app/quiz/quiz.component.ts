import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {Quiz, QuizQuestion, QuizService} from '../service/quiz.service';
import {FormsModule} from '@angular/forms';
import {catchError, switchMap} from 'rxjs';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit{
  questions: QuizQuestion[] = [];
  currentQuestion: QuizQuestion | null = null;
  currentStep = 0;
  selectedOption: string | null = null;
  shortAnswer: string = '';

  constructor(private titleService: Title, private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Quiz');
    this.loadQuizQuestions(1);

  }

  loadQuizQuestions(topicId: number): void {
    this.quizService.getQuizByTopicId(topicId).pipe(
      switchMap((quizArray: Quiz[]) => {
        if (!quizArray || quizArray.length === 0) {
          throw new Error('No quiz found for this topic.');
        }

        const quiz = quizArray[0];

        if (!quiz.quizId) {
          throw new Error('Quiz ID is undefined.');
        }

        return this.quizService.getQuestionsByQuizId(quiz.quizId);
      }),
      catchError(error => {
        console.error('Error fetching quiz or questions:', error);
        return [];
      })
    ).subscribe((questions: QuizQuestion[]) => {
      this.questions = questions.map(question => ({
        ...question,
        options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options
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
  }

  goBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.currentQuestion = this.questions[this.currentStep];
      this.resetSelection();
    }
  }

  goNext(): void {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.currentQuestion = this.questions[this.currentStep];
      this.resetSelection();
    }
  }

  resetSelection(): void {
    this.selectedOption = null;
    this.shortAnswer = '';
  }

}
