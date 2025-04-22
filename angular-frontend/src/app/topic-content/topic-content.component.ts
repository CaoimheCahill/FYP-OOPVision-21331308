import {Component, OnInit} from '@angular/core';
import {Topic, TopicService} from '../service/topic.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Title} from '@angular/platform-browser';
import {VisualExample} from '../service/visual-example.service';
import {MarkdownModule} from 'ngx-markdown';
import {Quiz, QuizService} from '../service/quiz.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ImageService} from '../service/image.service';

@Component({
  selector: 'app-topic-content',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    NgForOf,
    MarkdownModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './topic-content.component.html',
  styleUrl: './topic-content.component.scss'
})
export class TopicContentComponent implements OnInit {
  topic: Topic | undefined;
  visualExamples: VisualExample[] = [];
  quizzes: Quiz[] = [];

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private imageService: ImageService,
    private quizService: QuizService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.topicService.getTopics().subscribe((topics) => {
        this.topic = topics.find((t) => t.topicId === +id);

        if (this.topic) {
          this.titleService.setTitle(this.topic.topicTitle);
          this.imageService.getVisualExamplesByTopic(this.topic.topicId)
            .subscribe({
              next: (examples) => this.visualExamples = examples,
              error: (err) => console.error('Error fetching visual examples:', err)
            });

          this.quizService.getQuizByTopicId(this.topic.topicId).subscribe({
            next: (quizzes)=> this.quizzes = quizzes,
            error: (err) => console.error('Error fetching quizzes:', err)
          })
        }
      });
    }
  }

}
