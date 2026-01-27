// shared/word-card-lesson.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-word-card-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-card-lesson.html',
  styleUrls: ['./word-card-lesson.scss']
})
export class WordCardLessonComponent implements OnChanges {

  @Input() word!: any;
  @Output() toggleLearned = new EventEmitter<number>();
  private audio?: HTMLAudioElement;
  ngOnChanges(changes: SimpleChanges): void {
    console.log("this.word:",this.word)
    if (changes['word'] && this.word) {
      this.autoPlayAudio();
    }
  }
  ngOnDestroy(): void {
    this.stopAudio();
  }
  onToggleLearned(): void {
    this.toggleLearned.emit(this.word.id);
  }

  autoPlayAudio(): void {
    this.stopAudio();

    if (this.word.audio) {
      const audioUrl = this.normalizeAudioUrl(this.word.audio);
      this.audio = new Audio(audioUrl);
      this.audio.volume = 1;
      this.audio.play().catch(() => {
        console.warn('Autoplay bloqueado por el navegador');
      });
    } else {
      this.fallbackTTS();
    }
  }

  // 🔊 Sigue disponible si quieres reproducir manualmente
  playAudio(): void {
    this.autoPlayAudio();
  }

  
  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = undefined;
    }
  }
  /* ============================
   * FALLBACK TTS (opcional)
   * ============================ */
  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.word.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

  /* ============================
   * UTILS
   * ============================ */
  private normalizeAudioUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `http://127.0.0.1:8000${path}`;
  }
}
