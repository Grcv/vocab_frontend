import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';


@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './Vocabulary.html',
  styleUrls: ['./Vocabulary.scss']
})

export class Vocabulary  {

 
}
