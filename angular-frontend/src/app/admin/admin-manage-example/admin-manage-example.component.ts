import {Component, OnInit} from '@angular/core';
import {VisualExample, VisualExampleService} from '../../service/visual-example.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule, NgForOf} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {Topic, TopicService} from '../../service/topic.service';

@Component({
  selector: 'app-admin-manage-example',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    NgForOf
  ],
  templateUrl: './admin-manage-example.component.html',
  styleUrl: './admin-manage-example.component.scss'
})
export class AdminManageExampleComponent implements OnInit {
  topicId!: number;
  visualExamples: VisualExample[] = [];
  topicTitle = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private visualExampleService: VisualExampleService,
    private titleService: Title,
    private topicService: TopicService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Manage Examples');
    this.topicId = +this.route.snapshot.paramMap.get('topicId')!;
    this.loadTopic();
    this.loadVisualExamples();
  }

  loadVisualExamples(): void {
    this.visualExampleService.getVisualExamplesByTopic(this.topicId).subscribe({
      next: (examples) => (this.visualExamples = examples),
      error: (err) => console.error('Error loading visual examples:', err)
    });
  }

  loadTopic(): void {
    this.topicService.getTopicById(this.topicId).subscribe({
      next: (topic: Topic) => {
        this.topicTitle = topic.topicTitle;
        this.titleService.setTitle(`Manage Visual Examples - ${this.topicTitle}`);
      },
      error: (err) => console.error('Error loading topic:', err)
    });
  }

  createNew(): void {
    this.router.navigate(['/admin/topics', this.topicId, 'visualExample', 'new']);
  }

  editExample(example: VisualExample): void {
    this.router.navigate(['/admin/topics', this.topicId, 'visualExample', example.visualExampleId]);
  }

  deleteExample(example: VisualExample): void {
    if (confirm('Are you sure you want to delete this visual example?')) {
      this.visualExampleService.deleteVisualExample(example.visualExampleId).subscribe({
        next: () => this.loadVisualExamples(),
        error: (err) => console.error('Error deleting visual example:', err)
      });
    }
  }

}
