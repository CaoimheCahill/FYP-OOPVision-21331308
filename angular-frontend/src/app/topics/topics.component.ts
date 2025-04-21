import {Component, OnInit} from '@angular/core';
import {Topic, TopicService} from '../service/topic.service';
import {Title} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-topics',
  standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        RouterLink,
        NgForOf,
        MatProgressSpinnerModule,
        NgIf,
    ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private titleService: Title, private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Topics');
    this.topicService.getTopics().subscribe((data: Topic[]) => {
      this.topics = data;
    });
  }
}
