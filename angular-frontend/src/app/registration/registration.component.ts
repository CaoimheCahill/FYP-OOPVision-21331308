import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Title} from '@angular/platform-browser';
import {UserService} from '../service/user.service';

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
    NgOptimizedImage,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit{
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private titleService: Title, private router: Router, private userService: UserService) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  ngOnInit(): void {
    this.titleService.setTitle('Registration');
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
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
          alert('Registration successful!');
          console.log('User registered:', response);

          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
    }else{
      alert('Please fill in all required fields');
    }
  }
}
