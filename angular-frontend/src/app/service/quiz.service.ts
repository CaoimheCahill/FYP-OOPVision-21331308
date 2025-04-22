import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Quiz {
  quizId: number;
  title: string;
  topicId: number;
  topicTitle: string;
}

export interface QuizQuestion {
  questionId: number;
  quizId: number;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  correctAnswer: string;
  options?: string;
  userAnswer?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = environment.apiBaseUrl + '/api/quiz';

  constructor(private http: HttpClient) {
  }

  getQuizByTopicId(topicId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/${topicId}`);
  }

  getQuizByQuizId(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/quizzes/${quizId}`);
  }

  getQuestionsByQuizId(quizId: number): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.apiUrl}/${quizId}/questions`);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${environment.apiBaseUrl}/api/admin/quizzes`);
  }

  getQuizzesByTopic(topicId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${environment.apiBaseUrl}/api/admin/topics/${topicId}/quizzes`);
  }

  createQuiz(topicId: number, quizData: Partial<Quiz>): Observable<Quiz> {
    return this.http.post<Quiz>(`${environment.apiBaseUrl}/api/admin/topics/${topicId}/quizzes`, quizData);
  }

  updateQuiz(quizId: number, quizData: Partial<Quiz>): Observable<Quiz> {
    return this.http.put<Quiz>(`${environment.apiBaseUrl}/api/admin/quizzes/${quizId}`, quizData);
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/api/admin/quizzes/${quizId}`,
      {responseType: 'text' as 'json'});
  }

  getQuizById(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${environment.apiBaseUrl}/api/admin/quizzes/${quizId}`);
  }

  getQuestionsByQuiz(quizId: number): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${environment.apiBaseUrl}/api/admin/quizzes/${quizId}/questions`);
  }

  createQuestion(quizId: number | undefined, questionData: Partial<QuizQuestion>): Observable<QuizQuestion> {
    return this.http.post<QuizQuestion>(`${environment.apiBaseUrl}/api/admin/quizzes/${quizId}/questions`, questionData);
  }

  updateQuestion(questionId: number, questionData: Partial<QuizQuestion>): Observable<QuizQuestion> {
    return this.http.put<QuizQuestion>(`${environment.apiBaseUrl}/api/admin/questions/${questionId}`, questionData);
  }

  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/api/admin/questions/${questionId}`, {responseType: 'text' as 'json'});
  }
}
