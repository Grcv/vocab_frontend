import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,NgForm} from '@angular/forms';
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
    learningProfile: 'normal' ,
    confirmPassword: '',
  };

  loading = false;
  error = '';
  message = '';
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register(form: NgForm) {
    if (!form.valid) {
      this.error = 'Por favor, completa todos los campos correctamente';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register({
      email: this.user.email,
      password: this.user.password,
      password_confirm: this.user.confirmPassword,
      learning_profile: this.user.learningProfile
    }).subscribe({
      next: (res) => {
        if (res?.message) {
          this.message = res.message;
          this.loading = false;
          this.user = {
            name: '',
            email: '',
            password: '',
            learningProfile: 'normal' ,
            confirmPassword: '',
          };
          return;
        }
        
      },
      error: err => {
        console.error(err);
        this.error = err?.error?.error || 'Error al crear la cuenta';
        this.loading = false;
      }
    });
  }



}
