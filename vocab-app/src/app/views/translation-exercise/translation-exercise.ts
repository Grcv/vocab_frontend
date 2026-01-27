import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationExercisePayload } from './translation-exercise.model';

interface TranslationState {
  selected?: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-translation-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translation-exercise.html',
  styleUrls: ['./translation-exercise.scss'],
})
export class TranslationExercise implements OnChanges {

  /* =======================
   * INPUT
   * ======================= */
  @Input({ required: true })
  word!: TranslationExercisePayload;

  /* =======================
   * OUTPUT
   * ======================= */
  @Output()
  completed = new EventEmitter<boolean>();

  /* =======================
   * STATE
   * ======================= */
  state: TranslationState = {
    selected: undefined,
    isCorrect: false
  };
  
  private audio?: HTMLAudioElement;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      this.resetState();
      this.autoPlayAudio();
    }
  }

  private resetState(): void {
    this.state = {
      selected: undefined,
      isCorrect: false
    };
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

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.word.prompt);
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

  selectOption(option: string): void {
    if (this.state.selected) return;

    this.state.selected = option;
    this.state.isCorrect = option === this.word.correct;

    // pequeño delay para mostrar feedback visual
    setTimeout(() => {
      this.completed.emit(this.state.isCorrect);
    }, 600);
  }
}
