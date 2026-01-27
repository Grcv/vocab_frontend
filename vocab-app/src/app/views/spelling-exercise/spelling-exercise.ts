import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellingExercisePayload } from './spelling-exercise.model';

@Component({
  selector: 'app-spelling-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spelling-exercise.html',
  styleUrl: './spelling-exercise.scss',
})
export class SpellingExercise implements OnChanges {

  /* =======================
   * INPUT / OUTPUT
   * ======================= */
  @Input({ required: true })
  word!: SpellingExercisePayload;

  @Output()
  completed = new EventEmitter<boolean>();

  @ViewChild('spellingInput')
  spellingInput!: ElementRef<HTMLInputElement>;

  letters: string[] = [];

  readonly MAX_ATTEMPTS = 2;

  /* =======================
   * STATE
   * ======================= */
  state = {
    input: '',
    isCorrect: false,
    attempts: 0,
    playing: false
  };

  private audio?: HTMLAudioElement;

  /* =======================
   * LIFECYCLE
   * ======================= */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      this.loadWord();
    }
  }

  private loadWord(): void {
    this.letters = this.word.correct.split('');

    this.state = {
      input: '',
      isCorrect: false,
      attempts: 0,
      playing: false
    };

    setTimeout(() => this.playAudioAndFocus(), 300);
  }

  /* =======================
   * AUDIO
   * ======================= */
  playAudio(): void {
    this.playAudioAndFocus();
  }

  private playAudioAndFocus(): void {
    this.stopAudio();

    if (this.word.audio) {
      const url = this.normalizeAudioUrl(this.word.audio);
      this.audio = new Audio(url);

      this.audio.onplay = () => {
        this.state.playing = true;
      };

      this.audio.onended = () => {
        this.state.playing = false;
        this.focusInput();
      };

      this.audio.onerror = () => {
        this.state.playing = false;
        this.fallbackTTS();
      };

      this.audio.play().catch(() => {
        this.state.playing = false;
        this.fallbackTTS();
      });

    } else {
      this.fallbackTTS();
    }
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = undefined;
    }
    this.state.playing = false;
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) {
      this.focusInput();
      return;
    }

    speechSynthesis.cancel();

    this.state.playing = true;

    const u = new SpeechSynthesisUtterance(this.word.prompt);
    u.lang = 'en-US';

    u.onend = () => {
      this.state.playing = false;
      this.focusInput();
    };

    speechSynthesis.speak(u);
  }

  private normalizeAudioUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:8000${path}`;
  }

  /* =======================
   * INPUT LOGIC
   * ======================= */
  focusInput(): void {
    setTimeout(() => {
      this.spellingInput?.nativeElement.focus();
    }, 50);
  }

  onInputChange(value: string): void {
    if (this.state.isCorrect) return;

    this.state.input = value
      .toLowerCase()
      .slice(0, this.letters.length);

    if (this.state.input.length === this.letters.length) {
      this.validateWord();
    }
  }

  private validateWord(): void {
    this.state.attempts++;

    if (this.state.input === this.word.correct.toLowerCase()) {
      this.state.isCorrect = true;
      setTimeout(() => this.completed.emit(true), 800);
      return;
    }

    if (this.state.attempts >= this.MAX_ATTEMPTS) {
      this.state.input = this.word.prompt;
      this.state.isCorrect = true;
      setTimeout(() => this.completed.emit(false), 1200);
      return;
    }

    setTimeout(() => {
      this.state.input = '';
      this.focusInput();
    }, 900);
  }
}
