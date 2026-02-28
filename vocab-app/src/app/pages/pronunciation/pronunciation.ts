import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-pronunciation',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './pronunciation.html',
  styleUrl: './pronunciation.scss',
})
export class Pronunciation {

}
