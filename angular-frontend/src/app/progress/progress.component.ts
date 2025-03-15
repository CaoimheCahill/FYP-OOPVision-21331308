import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule, DecimalPipe, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {ProgressService} from '../service/progress.service';
import {TopicService} from '../service/topic.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit{

  progressData: any = {};   // Store the progress data
  completionPercentage: number = 0;
  totalTopics: number = 0;

  constructor(private titleService: Title, private progressService: ProgressService, private topicService: TopicService) {}

  ngOnInit(): void {
    const userId = 1;
    this.titleService.setTitle('Progress');

    // Fetch the progress data
    this.progressService.getUserProgress(userId).subscribe((data) => {
      this.progressData = data.progress;
      this.completionPercentage = data.completionPercentage;
      console.log(this.progressData)
    });

    // Fetch the total number of topics
    this.topicService.getTotalTopics().subscribe((totalTopics) => {
      this.totalTopics = totalTopics;  // Set the total topics value
    });
  }

  get circumference() {
    const radius = 80;
    return 2 * Math.PI * radius;
  }

  get offset() {
    return this.circumference * (1 - this.completionPercentage / 100);
  }


}
