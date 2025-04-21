import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-frontend';

  mode: 'PUBLIC'|'USER'|'ADMIN' = 'PUBLIC';

  constructor(private userService: UserService) {}

  ngOnInit() {
    // update `mode` whenever the service’s mode$ emits
    this.userService.mode$.subscribe(m => this.mode = m);
  }
}
