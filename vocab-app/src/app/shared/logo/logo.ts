import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule], // 👈 AQUÍ ESTÁ LA SOLUCIÓN
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showText: boolean = true;
}
