import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-visual-example',
  standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './visual-example.component.html',
  styleUrl: './visual-example.component.scss'
})
export class VisualExampleComponent implements OnInit{

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Visual Example');
  }

}
