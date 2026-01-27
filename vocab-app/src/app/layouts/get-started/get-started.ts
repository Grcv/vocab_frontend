import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './get-started.html',
  styleUrls: ['./get-started.scss']
})
export class GetStarted{
  constructor(
    private router: Router
  ) {}
  // Aquí más adelante puedes agregar:
  // - lógica de registro
  // - redirección según estado del usuario
  // - test de nivel inicial

}
