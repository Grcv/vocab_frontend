import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-phrasal-verbs',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './phrasal-verbs.html',
  styleUrl: './phrasal-verbs.scss',
})
export class PhrasalVerbs {

}
