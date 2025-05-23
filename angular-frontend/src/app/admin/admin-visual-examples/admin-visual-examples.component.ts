import {Component, OnInit} from '@angular/core';
import {Topic, TopicService} from '../../service/topic.service';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule, NgForOf} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-visual-examples',
  standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        NgForOf
    ],
  templateUrl: './admin-visual-examples.component.html',
  styleUrl: './admin-visual-examples.component.scss'
})
export class AdminVisualExamplesComponent implements OnInit{
  topics: Topic[] = [];

  constructor(private topicService: TopicService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Manage Visual Examples');
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopics().subscribe({
      next: (data) => this.topics = data,
      error: (err) => console.error('Error fetching topics:', err)
    });
  }

  manageVisualExamples(topic: Topic): void {
    this.router.navigate(['/admin/topics', topic.topicId, 'examples']);
  }

}
