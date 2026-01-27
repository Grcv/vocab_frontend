import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  user = {
    name: '',
    email: '',
    password: '',
    learningProfile: 'normal' // default
  };

  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    this.loading = true;
    this.error = '';

    this.authService.register({
      email: this.user.email,
      password: this.user.password,
      learning_profile: this.user.learningProfile
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error(err);
        this.error = err?.error?.error || 'Error al crear la cuenta';
        this.loading = false;
      }
    });
  }
}
