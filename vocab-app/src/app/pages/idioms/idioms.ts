import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-idioms',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './idioms.html',
  styleUrl: './idioms.scss',
})
export class Idioms {

}
