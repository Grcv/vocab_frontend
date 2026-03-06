import { Component } from '@angular/core';

import { DashboardExercise } from '../dashboard-exercise/dashboard-exercise';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [DashboardExercise],
  templateUrl: './grammar.html',
  styleUrl: './grammar.scss',
})
export class Grammar {

}
