import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule   // 👈 NECESARIO
  ],
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.scss']
})
export class PublicLayout {}
