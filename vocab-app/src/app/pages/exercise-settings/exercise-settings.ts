import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService} from '../../services/settings'
@Component({
  selector: 'app-exercise-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercise-settings.html',
  styleUrl: './exercise-settings.scss',
})
export class ExerciseSettings {

  @Input() type!: 'vocabulary' | 'verbs' | 'pronunciation' | 'phrasal_verbs' | 'grammar' | 'contractions' | 'connected_speech' | 'idioms' | 'listening';

  settings: Record<string, any> = {};
  loading = false;
  STAGE_SEQUENCE = [
    "lesson",
    "meaning",
    "audio_recognition",
    "audio_discrimination",
    "pronunciation",
    "spelling",
  ];

  orderedSettings: { key: string, value: any }[] = [];
  otherSettings: { key: string, value: any }[] = [];

  LABEL_MAP: Record<string, string> = {
    // BASE
    lesson: 'Lección',
    meaning: 'Significado',
    audio_recognition: 'Reconocimiento de audio',
    audio_discrimination: 'Discriminación de audio',
    pronunciation: 'Pronunciación',
    spelling: 'Dictado',

    // LESSON
    lesson_present: 'Lección (Presente)',
    lesson_past: 'Lección (Pasado)',
    lesson_past_participle: 'Lección (Participio)',

    // MEANING
    meaning_present: 'Significado (Presente)',
    meaning_past: 'Significado (Pasado)',
    meaning_past_participle: 'Significado (Participio)',

    // AUDIO RECOGNITION
    audio_recognition_present: 'Reconocimiento de audio (Presente)',
    audio_recognition_past: 'Reconocimiento de audio (Pasado)',
    audio_recognition_past_participle: 'Reconocimiento de audio (Participio)',

    // AUDIO DISCRIMINATION
    audio_discrimination_present: 'Discriminación de audio (Presente)',
    audio_discrimination_past: 'Discriminación de audio (Pasado)',
    audio_discrimination_past_participle: 'Discriminación de audio (Participio)',
    audio_recognition_phoneme: 'Reconocimiento de fonemas',
  };


  constructor(private settingsService: SettingsService) {}

  ngOnChanges(): void {
    this.loadSettings();
  }


  save(): void {
    this.settingsService.updateFlowSettings(this.type, this.settings).subscribe({
      next: () => {
        console.log('Settings guardados');
      },
      error: err => console.error('Error saving settings', err)
    });
  }

  formatLabel(key: string): string {
    // 1. Si existe traducción exacta → usarla
    if (this.LABEL_MAP[key]) {
      return this.LABEL_MAP[key];
    }

    // 2. Si no, intenta detectar base (ej: lesson_present → lesson)
    const baseKey = key.split('_')[0];

    if (this.LABEL_MAP[baseKey]) {
      return this.LABEL_MAP[baseKey];
    }

    // 3. Fallback (lo que ya tenías)
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  BLOCKED_KEYS = ['lesson', 'meaning'];

  isBlocked(key: string): boolean {
    if (!key) return false;

    const normalized = key.toLowerCase();
    console.log("normalized:",normalized)
    return this.BLOCKED_KEYS.some(word => normalized.includes(word));
  }

  loadSettings(): void {
    if (!this.type) return;

    this.loading = true;

    this.settingsService.getFlowSettings(this.type).subscribe({
      next: res => {
        this.settings = res;
        this.buildOrderedSettings();
        this.loading = false;
      },
      error: err => {
        console.error('Error loading settings', err);
        this.loading = false;
      }
    });
  }


  buildOrderedSettings(): void {
    const entries = Object.entries(this.settings)
      .filter(([key]) => key !== 'id' && key !== 'created_at');

    // Orden principal
    this.orderedSettings = this.STAGE_SEQUENCE
      .map(key => ({
        key,
        value: this.settings[key]
      }))
      .filter(item => item.value !== undefined);

    // Lo que sobra
    this.otherSettings = entries
      .filter(([key]) => !this.STAGE_SEQUENCE.includes(key))
      .map(([key, value]) => ({ key, value }));
  }

}
