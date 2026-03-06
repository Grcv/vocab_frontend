import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recover-password.html',
  styleUrl: './recover-password.scss',
})
export class RecoverPassword {

email: string = '';
isLoading = false;
message: string | null = null;
errorMessage: string | null = null;

  constructor(
    private authservice: AuthService
  ) {}

recoverPassword(): void {

  if (!this.email) return;

  this.isLoading = true;
  this.message = null;
  this.errorMessage = null;

  this.authservice.recoverPassword(this.email).subscribe({
    next: () => {
      this.isLoading = false;
      this.message =
        "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.";
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage =
        "No pudimos procesar tu solicitud. Intenta más tarde.";
      console.error(err);
    }
  });
}

}
