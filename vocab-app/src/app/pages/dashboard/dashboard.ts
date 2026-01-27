import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/user-progress';
import { Chart } from 'chart.js/auto';

interface StageStats {
  [key: string]: number;
}

interface WordStat {
  cefr: string;
  user_name:string;
  total: number;
  learned: number;
  pending: number;
  by_stage: StageStats;
}

/* 👇 Nueva interfaz para el response */
interface DashboardResponse extends WordStat {
  user_name: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements AfterViewInit {

  constructor(
    private router: Router,
    private progressService: ProgressService
  ) {}

  userName = '';

  stats: WordStat = {
    cefr: '',
    user_name: '',
    total: 0,
    learned: 0,
    pending: 0,
    by_stage: {}
  };

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  loadData(): void {
    this.progressService.getSummary().subscribe({
      next: (data: DashboardResponse) => {
        console.log('Respuesta backend:', data);

        /* 👇 nombre del estudiante */
        this.userName = data.user_name;
        
        /* 👇 stats */
        this.stats = {
          user_name: data.user_name,
          cefr: data.cefr,
          total: data.total,
          learned: data.learned,
          pending: data.pending,
          by_stage: {
            ...data.by_stage,
            new: data.pending   
          }
        };

        this.renderPieChart();
      },
      error: err => console.error('Error loading summary', err)
    });
  }

  renderPieChart(): void {
    const labels = Object.keys(this.stats.by_stage);
    const values = Object.values(this.stats.by_stage);

    const ctx = document.getElementById('progressPie') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data: values
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  progress(): number {
    if (this.stats.total === 0) return 0;
    return Math.round((this.stats.learned / this.stats.total) * 100);
  }

  startLesson(): void {
    this.router.navigate(['/exercises']);
  }
}
