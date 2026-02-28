import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-verbs',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './verbs.html',
  styleUrl: './verbs.scss',
})
export class Verbs {

}
