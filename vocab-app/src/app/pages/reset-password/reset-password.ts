import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {

uid!: string;
token!: string;
password: string = "";
message: string = "";
errorMessage: string = "";
confirmPassword: string = '';
constructor(private route: ActivatedRoute,private authService:AuthService) {}

ngOnInit(): void {
  this.uid = this.route.snapshot.paramMap.get('uid')!;
  this.token = this.route.snapshot.paramMap.get('token')!;
}

resetPassword(): void {
  if (this.password !== this.confirmPassword) {
    this.errorMessage = "Las contraseñas no coinciden.";
    return;
  }
  this.authService.resetPassword(
    this.uid,
    this.token,
    this.password
  ).subscribe({
    next: () => {
      this.message = "Contraseña actualizada correctamente.";
    },
    error: () => {
      this.errorMessage = "El enlace no es válido o ha expirado.";
    }
  });
}

}
