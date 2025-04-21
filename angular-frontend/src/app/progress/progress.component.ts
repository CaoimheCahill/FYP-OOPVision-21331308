import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule, DecimalPipe} from "@angular/common";
import {Title} from '@angular/platform-browser';
import {ProgressService} from '../service/progress.service';
import {TopicService} from '../service/topic.service';
import {UserService} from '../service/user.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    DecimalPipe,
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit {

  completionPercentage: number = 0;
  totalTopics: number = 0;
  userId: number | null | undefined;
  totalTopicsCompleted: number = 0;

  constructor(private titleService: Title, private progressService: ProgressService, private topicService: TopicService, private userService: UserService) {
  }

  progressData: Array<{ topicId: number; quizScore?: number; topicTitle?: string; completed: boolean }> = [];

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromToken();
    this.titleService.setTitle('Progress');

    forkJoin({
      progressData: this.progressService.getUserProgress(this.userId),
      allTopics: this.topicService.getTopics()
    })
      .subscribe(({progressData, allTopics}) => {
        const nameById = new Map(allTopics.map(t => [t.topicId, t.topicTitle]));

        const enriched = (progressData.progress || []).map((item: { topicId: number; }) => ({
          ...item,
          topicTitle: nameById.get(item.topicId) ?? `Topic ${item.topicId}`
        }));
        this.progressData = enriched;
        this.completionPercentage = progressData.completionPercentage;
        this.totalTopicsCompleted = enriched.filter((i: { completed: any; }) => i.completed).length;
      });

    this.topicService.getTotalTopics().subscribe(total => this.totalTopics = total);
  }

  get circumference() {
    const radius = 80;
    return 2 * Math.PI * radius;
  }

  get offset() {
    console.log(this.completionPercentage);
    return this.circumference * (1 - this.completionPercentage / 100);
  }


}
