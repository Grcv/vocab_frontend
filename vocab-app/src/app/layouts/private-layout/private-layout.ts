import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Logo } from '../../shared/logo/logo'

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbDropdownModule,
    NgbCollapseModule,
    Logo
  ],
  templateUrl: './private-layout.html',
  styleUrls: ['./private-layout.scss']
})
export class PrivateLayout implements OnInit {

  progress = 0;
  level = 1;
  learnedWords = 0;
  totalWords = 0;
  achievementsCount = 0;

  isNavbarCollapsed = true;

  constructor(private auth: AuthService,private router: Router) {}

  ngOnInit(): void {
    // lógica futura de progreso
  }

  viewProfile(): void {
    alert('Funcionalidad de estadísticas en desarrollo');
  }

  showAchievements(): void {}

  resetProgress(): void {
    if (confirm('¿Reiniciar progreso?')) {
      alert('Progreso reiniciado');
    }
  }


  goToVocabularySettings(): void {
    //alert('Vista de progreso en desarrollo');
    this.router.navigate(['/vocabulary_settings']);
  }

  goToSettings(): void {
    //alert('Vista de progreso en desarrollo');
    this.router.navigate(['/settings']);
  }

  viewProgress(): void {
    //alert('Vista de progreso en desarrollo');
    this.router.navigate(['/progress']);
  }

  openHelp(): void {
    //alert('Centro de ayuda en desarrollo');
    this.router.navigate(['/help']);
  }

  logout(): void {
    this.auth.logout();       
    this.router.navigate(['/login']); 
  }
}
