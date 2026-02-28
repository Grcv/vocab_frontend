import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-contractions',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './contractions.html',
  styleUrl: './contractions.scss',
})
export class Contractions {

}
