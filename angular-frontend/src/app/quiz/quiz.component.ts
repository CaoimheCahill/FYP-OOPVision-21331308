import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-quiz',
  standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit{

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Quiz');

  }

}
