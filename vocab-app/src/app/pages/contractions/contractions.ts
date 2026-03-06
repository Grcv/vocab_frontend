import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-contractions',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './contractions.html',
  styleUrl: './contractions.scss',
})
export class Contractions {

}
