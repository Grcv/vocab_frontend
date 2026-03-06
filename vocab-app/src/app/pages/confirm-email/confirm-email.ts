import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-confirm-email',
  imports: [],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.scss',
})
export class ConfirmEmail {
  message: string = '';
  error: string = '';
  loading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    if (uid && token) {
      this.authService.confirmEmail(uid,token)
        .subscribe({
          next: () => {
            this.loading = false;
            this.message = 'Cuenta confirmada correctamente ';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 5000);
          },
          error: () => {
            this.loading = false;
            this.error = 'El enlace es inválido o ha expirado.';
          }
        });
    } else {
      this.loading = false;
      this.error = 'Enlace inválido.';
    }
  }
}
