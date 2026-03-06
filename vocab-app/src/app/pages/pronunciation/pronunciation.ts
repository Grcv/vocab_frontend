import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-pronunciation',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './pronunciation.html',
  styleUrl: './pronunciation.scss',
})
export class Pronunciation {

}
