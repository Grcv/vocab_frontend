import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../services/user-progress';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})
export class Settings {

  /* ======================
   * Perfil
   * ====================== */
  userName = 'Estudiante';

  /* ======================
   * Plan
   * ====================== */
  isPremium = false;

  /* ======================
   * Preferencias
   * ====================== */
  autoPlayAudio = true;
  speechRate = 1.0;
  cefrLevel = 'A1';
  learningProfile = 'normal';

  constructor(
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.progressService.getUserSettings().subscribe({
      next: (data: any) => {
        this.userName = data.user;
        this.isPremium = data.premium;
        this.autoPlayAudio = data.audio_autoplay;
        this.speechRate = data.playback_speed;
        this.cefrLevel = data.cefr;
        this.learningProfile = data.learning_profile;
      },
      error: err => console.error('Error loading settings', err)
    });
  }

  save(): void {
    const payload: any = {
      cefr: this.cefrLevel,
      audio_autoplay: this.autoPlayAudio,
      learning_profile: this.learningProfile
    };

    if (this.isPremium) {
      payload.playback_speed = this.speechRate;
    }

    this.progressService.updateProfile(payload).subscribe({
      next: () => {
        alert('✅ Ajustes guardados correctamente');
      },
      error: err => {
        console.error('Error al guardar ajustes', err);
        if (err.status === 403) {
          alert('⚠️ Solo usuarios premium pueden cambiar la velocidad');
        } else {
          alert('❌ Error al guardar los ajustes');
        }
      }
    });
  }

  goPremium(): void {
    alert('🚀 Próximamente podrás mejorar tu plan');
  }
}
