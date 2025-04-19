import {Component, OnInit} from '@angular/core';
import {Topic, TopicService} from '../service/topic.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Title} from '@angular/platform-browser';
import {VisualExample, VisualExampleService} from '../service/visual-example.service';
import { MarkdownModule } from 'ngx-markdown';
import {HeaderComponent} from '../shared/header/header.component';
import {FooterComponent} from '../shared/footer/footer.component';

@Component({
  selector: 'app-topic-content',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    MarkdownModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './topic-content.component.html',
  styleUrl: './topic-content.component.scss'
})
export class TopicContentComponent implements OnInit{
  topic: Topic | undefined;
  visualExamples: VisualExample[] = [];

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private visualExampleService: VisualExampleService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Get the topic ID from the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch topic details from the service
      this.topicService.getTopics().subscribe((topics) => {
        this.topic = topics.find((t) => t.topicId === +id); // Find topic by ID

        if (this.topic) {
          this.titleService.setTitle(this.topic.topicTitle);
          this.visualExampleService.getVisualExamplesByTopic(this.topic.topicId)
            .subscribe({
              next: (examples) => this.visualExamples = examples,
              error: (err) => console.error('Error fetching visual examples:', err)
            });
        }
      });
    }
  }

}
