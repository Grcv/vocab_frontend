import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-connected-speech',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './connected-speech.html',
  styleUrl: './connected-speech.scss',
})
export class ConnectedSpeech {

}
