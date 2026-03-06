import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-verbs',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './verbs.html',
  styleUrl: './verbs.scss',
})
export class Verbs {

}
