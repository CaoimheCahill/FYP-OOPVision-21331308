import { Injectable } from '@angular/core';
import {environment} from '../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Quiz {
  quizId: number;
  title: string;
  topicId: number;
}

export interface QuizQuestion {
  questionId: number;
  quizId: number;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  correctAnswer?: string;
  options?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = environment.apiBaseUrl + '/api/quiz';

  constructor(private http: HttpClient) {}

  getQuizByTopicId(topicId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/${topicId}`);
  }

  getQuestionsByQuizId(quizId: number): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.apiUrl}/${quizId}/questions`);
  }
}
