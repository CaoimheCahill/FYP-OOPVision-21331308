import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TopicService} from '../../service/topic.service';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-topics-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './topics-form.component.html',
  styleUrl: './topics-form.component.scss'
})
export class TopicsFormComponent implements OnInit{
  topicForm!: FormGroup;
  isEditMode = false;
  topicId?: number; // store the ID if editing

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Manage Topics');
    // Build the form
    this.topicForm = this.fb.group({
      topicTitle: ['', Validators.required],
      topicDescription: ['', Validators.required]
    });

    // Check if we have an ID in the URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.topicId = +idParam; // convert to number
        this.loadTopic(this.topicId);
      }
    });
  }

  loadTopic(id: number): void {
    this.topicService.getTopicById(id).subscribe({
      next: (topic) => {
        // Patch form with existing data
        this.topicForm.patchValue({
          topic_title: topic.topicTitle,
          topic_description: topic.topicDescription
        });
      },
      error: (err) => console.error('Error loading topic:', err)
    });
  }

  onSubmit(): void {
    if (this.topicForm.invalid) {
      return; // or show some validation errors
    }

    const formValues = this.topicForm.value; // { topic_title: ..., topic_description: ... }
    if (this.isEditMode && this.topicId) {
      // Update existing topic
      this.topicService.updateTopic(this.topicId, formValues).subscribe({
        next: () => {
          alert('Topic updated successfully!');
          this.router.navigate(['/admin/topics']);
        },
        error: (err) => console.error('Error updating topic:', err)
      });
    } else {
      // Create new topic
      this.topicService.createTopic(formValues).subscribe({
        next: () => {
          alert('Topic created successfully!');
          this.router.navigate(['/admin/topics']);
        },
        error: (err) => console.error('Error creating topic:', err)
      });
    }
  }

}
