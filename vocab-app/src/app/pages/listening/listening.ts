import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-listening',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './listening.html',
  styleUrl: './listening.scss',
})
export class Listening {

}
