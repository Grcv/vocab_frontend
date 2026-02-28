import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.html',
  styleUrls: ['./progress.scss']
})
export class Progress implements OnChanges {
  @Input() type!: 'vocabulary' | 'verbs' | 'pronunciation' | 'phrasal_verbs' | 'grammar' | 'contractions' | 'connected_speech' | 'idioms' | 'listening';
  data!: ProgressSummary;
  //type="vocabulary";
  constructor(private progressService: ProgressService) {}

  ngOnChanges(): void {
    this.loadProgress();
  }

  loadProgress(): void {
    this.progressService.getSummary(this.type).subscribe({
      next: res => {
        this.data = res;
      },
      error: err => console.error('Error loading progress', err)
    });
  }

  progressPercent(): number {
    if (!this.data || this.data.total === 0) return 0;
    return Math.round((this.data.learned / this.data.total) * 100);
  }

  stages(): string[] {
    return this.data ? Object.keys(this.data.by_stage) : [];
  }
}
