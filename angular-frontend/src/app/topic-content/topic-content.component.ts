import {Component, OnInit} from '@angular/core';
import {Topic, TopicService} from '../service/topic.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-topic-content',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './topic-content.component.html',
  styleUrl: './topic-content.component.scss'
})
export class TopicContentComponent implements OnInit{
  topic: Topic | undefined;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
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
          this.titleService.setTitle(this.topic.topicTitle); // Set the browser tab title
        }
      });
    }
  }

}
