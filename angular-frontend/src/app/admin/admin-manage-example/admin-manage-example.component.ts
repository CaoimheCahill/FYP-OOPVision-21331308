import {Component, OnInit} from '@angular/core';
import {VisualExample, VisualExampleService} from '../../service/visual-example.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule, NgForOf, NgOptimizedImage} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-manage-example',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    NgForOf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './admin-manage-example.component.html',
  styleUrl: './admin-manage-example.component.scss'
})
export class AdminManageExampleComponent implements OnInit{
  topicId!: number;
  visualExamples: VisualExample[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private visualExampleService: VisualExampleService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Manage Examples');
    this.topicId = +this.route.snapshot.paramMap.get('topicId')!;
    this.loadVisualExamples();
  }

  loadVisualExamples(): void {
    this.visualExampleService.getVisualExamplesByTopic(this.topicId).subscribe({
      next: (examples) => (this.visualExamples = examples),
      error: (err) => console.error('Error loading visual examples:', err)
    });
  }

  createNew(): void {
    // Navigate to the page for creating a new visual example
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
