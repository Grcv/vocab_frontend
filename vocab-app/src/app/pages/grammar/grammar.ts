import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './grammar.html',
  styleUrl: './grammar.scss',
})
export class Grammar {

}
