import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {User, UserService} from '../../service/user.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit{

  users: User[] = [];
  adminCount = 0;
  regularCount = 0;

  constructor(private userService: UserService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Admin Home');
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.adminCount = users.filter(u => u.userRole === 'ADMIN').length;
        this.regularCount = users.filter(u => u.userRole === 'USER').length;
        console.log(this.users);
        console.log(this.regularCount);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

}
