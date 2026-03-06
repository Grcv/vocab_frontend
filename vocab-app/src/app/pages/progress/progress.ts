import { Component, OnInit,Input,OnChanges } from '@angular/core';

import { ProgressService } from '../../services/user-progress';

interface StageStats {
  [key: string]: number;
}

interface ProgressSummary {
  user_name: string;
  total: number;
  learned: number;
  pending: number;
  by_stage: StageStats;
  cefr: string;
}

interface WordStat {
  cefr: string;
  user_name: string;
  total: number;
  learned: number;
  pending: number;
  by_stage: StageStats;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.html',
  styleUrls: ['./progress.scss']
})
export class Progress implements OnChanges {
  @Input() type!: 'vocabulary' | 'verbs' | 'pronunciation' | 'phrasal_verbs' | 'grammar' | 'contractions' | 'connected_speech' | 'idioms' | 'listening';
  data!: ProgressSummary;
  stats: WordStat = {
    cefr: '',
    user_name: '',
    total: 0,
    learned: 0,
    pending: 0,
    by_stage: {}
  };
  constructor(private progressService: ProgressService) {}

  ngOnChanges(): void {
    this.loadProgress();
  }

  loadProgress(): void {
    this.progressService.getSummary(this.type).subscribe({
      next: res => {
        this.data = res;

        this.stats = {
          user_name: res.user_name,
          cefr: res.cefr,
          total: res.total,
          learned: res.learned,
          pending: res.pending,
          by_stage: {
            leccion:  res.by_stage['lesson'],
            'discriminacion de audio' : res.by_stage['audio_discrimination'],
            'reconocimiento de audio' : res.by_stage['audio_recognition'],
            aprendidas: res.by_stage['mastered'],
            significado: res.by_stage['meaning'],
            pronunciacion: res.by_stage['pronunciation'],
            dictado: res.by_stage['spelling'],
            new: res.pending
          }
        };

      },
      error: err => console.error('Error loading progress', err)
    });
  }

  progressPercent(): number {
    if (!this.data || this.data.total === 0) return 0;
    return Math.round((this.data.learned / this.data.total) * 100);
  }

  stages(): string[] {
    return this.stats ? Object.keys(this.stats.by_stage) : [];
  }
}
