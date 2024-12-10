import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private titleService: Title){}

  ngOnInit(): void {
    this.titleService.setTitle('Home');
  }

}
