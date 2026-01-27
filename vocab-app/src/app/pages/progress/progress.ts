import { Component, OnInit } from '@angular/core';
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
export class Progress implements OnInit {

  data!: ProgressSummary;

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.loadProgress();
  }

  loadProgress(): void {
    this.progressService.getSummary().subscribe({
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
