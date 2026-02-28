import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-idioms',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './idioms.html',
  styleUrl: './idioms.scss',
})
export class Idioms {

}
