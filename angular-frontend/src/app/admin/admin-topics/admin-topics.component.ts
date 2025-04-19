import {Component, OnInit} from '@angular/core';
import {Topic, TopicService} from '../../service/topic.service';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {HeaderComponent} from "../../shared/header/header.component";

@Component({
  selector: 'app-admin-topics',
  standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        RouterLink,
        HeaderComponent
    ],
  templateUrl: './admin-topics.component.html',
  styleUrl: './admin-topics.component.scss'
})
export class AdminTopicsComponent implements OnInit{
  topics: Topic[] = [];

  constructor(
    private topicService: TopicService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Manage Topics');
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopics().subscribe({
      next: (data) => this.topics = data,
      error: (err) => console.error('Error fetching topics:', err)
    });
  }

  createTopic(): void {
    this.router.navigate(['/admin/topics/new']);
  }

  editTopic(topicId: number): void {
    this.router.navigate(['/admin/topics', topicId, 'edit']);
  }

  deleteTopic(topicId: number): void {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topicService.deleteTopic(topicId).subscribe({
        next: () => {
          this.loadTopics();
        },
        error: (err) => console.error('Error deleting topic:', err)
      });
    }
  }

}
