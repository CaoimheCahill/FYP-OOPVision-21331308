import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() mode: string = 'PUBLIC';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
