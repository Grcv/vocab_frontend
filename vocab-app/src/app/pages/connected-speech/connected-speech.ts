import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-connected-speech',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './connected-speech.html',
  styleUrl: './connected-speech.scss',
})
export class ConnectedSpeech {

}
