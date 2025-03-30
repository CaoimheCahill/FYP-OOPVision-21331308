import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Quiz, QuizQuestion, QuizService } from '../../service/quiz.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {CommonModule, NgForOf, NgOptimizedImage} from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-quiz-wizard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    NgForOf,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './quiz-wizard.component.html',
  styleUrls: ['./quiz-wizard.component.scss']
})
export class QuizWizardComponent implements OnInit {
  // Form for quiz details (title and topicId)
  quizDetailsForm!: FormGroup;
  // Form group that contains the questions form array
  questionsStepForm!: FormGroup;

  isEditMode = false;
  quizId?: number;
  topicId?: number; // Used in creation mode

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize quiz details form
    this.quizDetailsForm = this.fb.group({
      title: ['', Validators.required],
      topicId: [null, Validators.required]
    });

    // Initialize questions form group with an empty FormArray
    this.questionsStepForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.quizId = +idParam;
        this.loadQuizData(this.quizId);
      } else {
        this.route.queryParamMap.subscribe(qParams => {
          const tId = qParams.get('topicId');
          if (tId) {
            this.topicId = +tId;
            this.quizDetailsForm.patchValue({ topicId: this.topicId });
          }
        });
      }
    });
  }

  get questionsFormArray(): FormArray {
    return this.questionsStepForm.get('questions') as FormArray;
  }

  // Load the quiz details and associated questions for editing
  loadQuizData(quizId: number): void {
    // Load quiz details
    this.quizService.getQuizById(quizId).subscribe({
      next: (quiz: Quiz) => {
        this.quizDetailsForm.patchValue({
          title: quiz.title,
          topicId: quiz.topicId
        });
        this.topicId = quiz.topicId;
      },
      error: (err) => console.error('Error loading quiz:', err)
    });

    this.quizService.getQuestionsByQuiz(quizId).subscribe({
      next: (questions: QuizQuestion[]) => {
        questions.forEach(q => this.questionsFormArray.push(this.createQuestionForm(q)));
      },
      error: (err) => console.error('Error loading questions:', err)
    });
  }

  createQuestionForm(question?: Partial<QuizQuestion>): FormGroup {
    const questionType = question?.questionType || 'MULTIPLE_CHOICE';
    let optionsFA: FormArray;

    if (questionType === 'TRUE_FALSE') {
      optionsFA = this.fb.array([
        this.fb.control('True'),
        this.fb.control('False')
      ]);
    } else if (questionType === 'MULTIPLE_CHOICE') {
      let rawOptions: any = question?.options;
      if (typeof rawOptions === 'string') {
        try {
          rawOptions = JSON.parse(rawOptions);
        } catch (e) {
          console.warn('Could not parse options JSON:', rawOptions);
          rawOptions = [];
        }
      }
      if (rawOptions && Array.isArray(rawOptions)) {
        optionsFA = this.fb.array(rawOptions.map((opt: any) => this.fb.control(opt)));
      } else {
        optionsFA = this.fb.array([this.fb.control('')]);
      }
    } else {
      optionsFA = this.fb.array([]);
    }

    const formGroup = this.fb.group({
      questionId: [question?.questionId || null],
      questionText: [question?.questionText || '', Validators.required],
      questionType: [questionType, Validators.required],
      correctAnswer: [question?.correctAnswer || '', Validators.required],
      options: optionsFA
    });

    formGroup.get('questionType')?.valueChanges.subscribe(value => {
      const optionsArray = formGroup.get('options') as FormArray;
      if (value === 'TRUE_FALSE') {
        optionsArray.clear();
        optionsArray.push(this.fb.control('True'));
        optionsArray.push(this.fb.control('False'));
        optionsArray.disable();
      } else if (value === 'MULTIPLE_CHOICE') {
        optionsArray.enable();
        if (optionsArray.length === 0) {
          optionsArray.push(this.fb.control(''));
        }
      } else {
        optionsArray.clear();
      }
    });

    return formGroup;
  }

  addQuestion(): void {
    this.questionsFormArray.push(this.createQuestionForm());
  }

  removeQuestion(index: number): void {
    const questionControl = this.questionsFormArray.at(index);
    const qId = questionControl.value.questionId;
    if (qId) {
      if (confirm('Are you sure you want to remove this question?')) {
        this.quizService.deleteQuestion(qId).subscribe({
          next: () => this.questionsFormArray.removeAt(index),
          error: (err) => console.error('Error deleting question:', err)
        });
      }
    } else {
      this.questionsFormArray.removeAt(index);
    }
  }

  addOption(questionGroup: AbstractControl<any>): void {
    const options = questionGroup.get('options') as FormArray;
    options.push(this.fb.control(''));
  }

  removeOption(questionGroup: AbstractControl<any>, index: number): void {
    const options = questionGroup.get('options') as FormArray;
    options.removeAt(index);
  }


  submitWizard(): void {
    const quizData = this.quizDetailsForm.value; // { title, topicId }


    const rawQuestionsData = this.questionsFormArray.getRawValue();

    // Convert any array in "options" to a JSON string
    const questionsData = rawQuestionsData.map((q: { options: any; questionType: string; }) => {
      if (Array.isArray(q.options)) {
        return {
          ...q,
          options: JSON.stringify(q.options)
        };
      }

      if (q.questionType === 'TRUE_FALSE') {
        return {
          ...q,
          options: JSON.stringify(["True", "False"])
        };
      }
      return q;
    });

    if (this.isEditMode && this.quizId) {
      // Update existing quiz
      this.quizService.updateQuiz(this.quizId, quizData).subscribe({
        next: () => {
          this.saveQuestions(this.quizId, questionsData);
        },
        error: (err) => console.error('Error updating quiz:', err)
      });
    } else {
      // Create a new quiz
      const topicId = quizData.topicId;
      if (!topicId) {
        alert('No topicId specified!');
        return;
      }
      this.quizService.createQuiz(topicId, quizData).subscribe({
        next: (newQuiz: Quiz) => {
          this.saveQuestions(newQuiz.quizId!, questionsData);
        },
        error: (err) => console.error('Error creating quiz:', err)
      });
    }
  }



  // Save (create or update) each question for the quiz
  saveQuestions(quizId: number | undefined, questions: any[]): void {
    const requests = questions.map(q => {
      if (!q.questionId) {
        // Create new question
        return this.quizService.createQuestion(quizId, {
          questionText: q.questionText,
          questionType: q.questionType,
          correctAnswer: q.correctAnswer,
          options: q.options,
          quizId: quizId
        }).toPromise();
      } else {
        // Update existing question
        return this.quizService.updateQuestion(q.questionId, {
          questionText: q.questionText,
          questionType: q.questionType,
          correctAnswer: q.correctAnswer,
          options: q.options
        }).toPromise();
      }
    });

    Promise.all(requests)
      .then(() => {
        alert('Quiz and questions saved successfully!');
        this.router.navigate(['/admin/quizzes']);
      })
      .catch(err => console.error('Error saving questions:', err));
  }

  getOptions(qControl: AbstractControl<any>): FormArray {
    return qControl.get('options') as FormArray;
  }
}
