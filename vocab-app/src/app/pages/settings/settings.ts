import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
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
  isLoading = false;
  errorMessage: string | null = null;
  settings: any = {};
  originalSettings: any = {};
  hasChanges = false;
  constructor(
    private settingsservice: SettingsService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onChange() {
    this.hasChanges = true;
  }

  loadData(): void {
    this.settingsservice.getUserSettings().subscribe({
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

    this.settingsservice.updateProfile(payload).subscribe({
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

    this.isLoading = true;
    this.errorMessage = null;

    this.settingsservice.updatePremium(true).subscribe({
      next: () => {
        this.isPremium = true;
        this.isLoading = false;

        // opcional: redirigir
        // this.router.navigate(['/dashboard']);

        console.log("Premium activado correctamente");
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 
          "No pudimos activar tu suscripción en este momento. Intenta nuevamente más tarde.";
        
        console.error("Error activando premium:", err);
      }
    });
  }

  cancelPremium(): void {
    this.settingsservice.updatePremium(false).subscribe({
      next: (res) => {
        this.isPremium = false;
        console.log("Suscripción cancelada");
      },
      error: (err) => {
        console.error("Error al cancelar", err);
      }
    });
  }

}
