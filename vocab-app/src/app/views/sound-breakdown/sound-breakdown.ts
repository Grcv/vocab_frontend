import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sound-breakdown',
  standalone: true,
  imports: [],
  templateUrl: './sound-breakdown.html',
  styleUrls: ['./sound-breakdown.scss']
})
export class SoundBreakdown implements OnInit {

  word = '';
  soundGroups: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.word = this.route.snapshot.queryParamMap.get('word') || '';
    this.soundGroups = this.splitIntoSounds(this.word);
  }

  splitIntoSounds(word: string): string[] {
    if (!word) return [];

    return word
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .match(/[^aeiou]*[aeiou]+/g) || [word];
  }

  goBack(): void {
    this.router.navigate(['/pronunciation']);
  }
}
