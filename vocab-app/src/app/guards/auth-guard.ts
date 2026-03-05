import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    return true; // Permite acceso
  } else {
    router.navigate(['/landing']);
    return false; // Bloquea acceso
  }

};
