import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-phrasal-verbs',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './phrasal-verbs.html',
  styleUrl: './phrasal-verbs.scss',
})
export class PhrasalVerbs {

}
