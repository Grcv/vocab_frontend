import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  level = 1;
  streakDays = 3;
  learnedWords = 25;
  totalWords = 100;

  get progress(): number {
    return Math.round((this.learnedWords / this.totalWords) * 100);
  }
}
