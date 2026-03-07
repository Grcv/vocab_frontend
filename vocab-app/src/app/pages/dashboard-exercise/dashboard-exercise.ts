import { Component, AfterViewInit, OnInit } from '@angular/core';

import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { ProgressService } from '../../services/user-progress';
import { Chart } from 'chart.js/auto';
import { AudioService } from '../../services/audio';

interface StageStats {
  [key: string]: number;
}

interface WordStat {
  cefr: string;
  user_name: string;
  total: number;
  learned: number;
  pending: number;
  by_stage: StageStats;
}


interface VocabularyResponse extends WordStat {}

@Component({
  selector: 'app-dashboard-exercise',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-exercise.html',
  styleUrl: './dashboard-exercise.scss',
})
export class DashboardExercise implements OnInit, AfterViewInit {


  sectionTitle = '';
  currentUrl = '';
  userName = '';
  type = '';

  stats: WordStat = {
    cefr: '',
    user_name: '',
    total: 0,
    learned: 0,
    pending: 0,
    by_stage: {}
  };

  constructor(
    private router: Router,
    private progressService: ProgressService,
    private route: ActivatedRoute,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.getFullRoutePath();
    console.log("this.currentUrl:",this.currentUrl)
    const titles: Record<string, string> = {
      vocabulary: 'Vocabulario',
      verbs: 'Verbos',
      'connected-speech': 'Connected Speech',
      idioms: 'Idioms',
      listening: 'Listening',
      contractions: 'Contracciones',
      pronunciation: 'Pronunciación',
      grammar: 'Gramática',
      phrasal_verbs: 'Verbos Frasales',
      conversation: 'Conversación'
    };

    const types: any = {
      "vocabulary": "vocabulary",
      'verbs': 'verbs',
      'connected-speech': 'connected_speech',
      'idioms': 'idioms',
      'listening': 'listening',
      'contractions': 'contractions',
      'pronunciation': 'pronunciation',
      'phrasal_verbs': 'phrasal_verbs',
      'grammar': 'grammar',
      'conversation':'conversation'    
    }

    this.type = types[this.currentUrl ?? ''] ;
    console.log('Ruta actual:', this.currentUrl);
    this.sectionTitle = titles[this.currentUrl ?? ''] ?? 'Pronuncia';
    this.loadData();
  }

  ngAfterViewInit(): void {}

  /** 🔹 Obtiene la ruta completa del componente */
  private getFullRoutePath(): string {
    return this.route.pathFromRoot
      .map(r => r.snapshot.url.map(segment => segment.path).join('/'))
      .filter(path => path.length > 0)
      .join('/');
  }

  loadData(): void {
    this.progressService.getSummary(this.type).subscribe({
      next: (data: VocabularyResponse) => {
        this.userName = data.user_name;

        this.stats = {
          user_name: data.user_name,
          cefr: data.cefr,
          total: data.total,
          learned: data.learned,
          pending: data.pending,
          by_stage: {
            leccion:  data.by_stage['lesson'],
            'discriminacion de audio' : data.by_stage['audio_discrimination'],
            'reconocimiento de audio' : data.by_stage['audio_recognition'],
            aprendidas: data.by_stage['mastered'],
            significado: data.by_stage['meaning'],
            pronunciacion: data.by_stage['pronunciation'],
            dictado: data.by_stage['spelling'],
            new: data.pending
          }
        };

        this.renderPieChart();
      },
      error: err => console.error('Error loading summary', err)
    });
  }

  renderPieChart(): void {
    const ctx = document.getElementById('progressPie') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.stats.by_stage),
        datasets: [
          {
            data: Object.values(this.stats.by_stage)
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
    this.audioService.unlockAudio();
    this.router.navigate(['/exercises']);
    localStorage.setItem('section', this.type);

  }
}
