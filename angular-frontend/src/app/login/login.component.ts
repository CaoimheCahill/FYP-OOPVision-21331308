import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TokenPayload, UserService} from '../service/user.service';
import {jwtDecode} from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  loginData = {email: '', password: ''};
  errorMessage: string | null = null;

  constructor(private titleService: Title, private router: Router, private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.logout();
    this.titleService.setTitle('Login');
  }

  onSubmit(): void {
    if (this.loginData.email && this.loginData.password) {
      this.userService.login(this.loginData).subscribe(
        (response) => {
          this.userService.saveToken(response.token);
          const decoded = jwtDecode<TokenPayload>(response.token);
          if (decoded.role === 'ADMIN') {
            this.router.navigate(['/admin/home']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.toastr.error('Invalid email or password')
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

}
