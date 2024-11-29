import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatInput} from '@angular/material/input';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatFormField,
    MatButton,
    RouterLink,
    MatInput,
    MatError,
    MatLabel,
    MatToolbar,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  loginData = { email: '', password: '' };
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

  onSubmit() {

  }
}
