import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-progress',
  standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit{

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Progress');
  }

}
