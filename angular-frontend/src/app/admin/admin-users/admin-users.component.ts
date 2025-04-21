import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgForOf} from '@angular/common';
import {User, UserService} from '../../service/user.service';
import {Title} from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    NgForOf,
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService, private titleService: Title) {
  }

  displayedColumns: string[] = ['email', 'role', 'actions'];
  users: any[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Manage Users');
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any[]) => this.users = data,
      error: (err) => console.error('Error fetching users', err)
    });
  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  toggleRole(user: User) {
    if (user.userRole === 'ADMIN') {
      this.userService.demoteUser(user.userId).subscribe({
        next: () => {
          user.userRole = 'USER';
        },
        error: (err) => console.error('Error demoting user', err)
      });
    } else {
      this.userService.promoteUser(user.userId).subscribe({
        next: () => {
          user.userRole = 'ADMIN';
        },
        error: (err) => console.error('Error promoting user', err)
      });
    }

  }
}
