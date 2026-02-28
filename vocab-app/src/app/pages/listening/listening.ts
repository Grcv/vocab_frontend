import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-listening',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './listening.html',
  styleUrl: './listening.scss',
})
export class Listening {

}
