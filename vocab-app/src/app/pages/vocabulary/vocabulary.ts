import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';


@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule,DashboardExercise],
  templateUrl: './vocabulary.html',
  styleUrls: ['./vocabulary.scss']
})

export class Vocabulary  {

 
}
