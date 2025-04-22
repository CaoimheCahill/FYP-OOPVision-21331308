import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Title} from '@angular/platform-browser';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private titleService: Title, private router: Router, private userService: UserService, private toastr: ToastrService) {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  ngOnInit(): void {
    this.userService.logout();
    this.titleService.setTitle('Registration');
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;

      this.userService.register(user).subscribe(
        (response) => {

          if (response.token) {
            // Store the token in localStorage or sessionStorage
            localStorage.setItem('token', response.token);
          }
          this.toastr.success('Registration successful!');

          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.status === 409) {
            this.toastr.error('An account with that email already exists.');
          } else {
            this.toastr.error('Registration failed. Please try again.');
          }
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }
}
