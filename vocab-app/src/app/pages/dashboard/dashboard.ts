import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../services/user-progress';
import { RouterModule } from '@angular/router';

export interface ModuleStats {
  title: string;
  icon: string;
  total: number;
  completed: number;
  route?: string;
}

export interface Data {
  completed: number
  icon: string
  title: string
  total: number
  }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  modules: ModuleStats[] = [];

  globalProgress = 0;

  constructor(
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  calculateGlobalProgress() {
    const total = this.modules.reduce((acc, m) => acc + m.total, 0);
    const completed = this.modules.reduce((acc, m) => acc + m.completed, 0);

    this.globalProgress = total > 0
      ? Math.round((completed / total) * 100)
      : 0;
  }

  progress(module: ModuleStats): number {
    return module.total > 0
      ? Math.round((module.completed / module.total) * 100)
      : 0;
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getIcon(type: string): string {
    const icons: any = {
      dashboard: '📊',

      vocabulary: '📚',
      pronunciation: '🗣️',
      grammar: '✍️',

      verbs: '🔤',
      phrasal_verbs: '🧩',

      contractions: '➗',
      'connected-speech': '🔗',

      idioms: '💡',
      listening: '🎧',
      conversation: '💬'
    };

    return icons[type] || '📚';
  }

  get_tittle(type:string){
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
    let sectionTitle = titles[type ] 
    return sectionTitle
  }

  loadSummary(){
   this.progressService.getGeneral().subscribe({
      next: (data: any) => {
          Object.keys(data).forEach((type: string) => {
            //console.log(data[type])
            const module: ModuleStats = {
              route: type,
              title: this.get_tittle(type),
              icon: this.getIcon(type),
              total: data[type].total,
              completed: data[type].learned
            };
            this.modules.push(module);
          });


          this.calculateGlobalProgress();

        },
        error: (err) => {
          console.error('Error loading summary', err);

        }
      });

    const module: ModuleStats = {
      route: "conversation",
      title: this.get_tittle("conversation"),
      icon: this.getIcon("conversation"),
      total: 0,
      completed: 0
    };
    this.modules.push(module);      

  }

}
