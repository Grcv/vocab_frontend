import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioMatchPhonemeExercisePayload } from './audio-match-phoneme.model';
import { SettingsService } from '../../services/settings';

interface AudioMatchState {
  selected?: string;
  isCorrect: boolean;
  playing: boolean;
}

@Component({
  selector: 'app-audio-match-phoneme-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-match-phoneme-exercise.html',
  styleUrl: './audio-match-phoneme-exercise.scss',
})
export class AudioMatchPhonemeExercise implements OnChanges{
  /* =======================
   * INPUT (MISMO CONTRATO)
   * ======================= */
  @Input({ required: true })
  word!: AudioMatchPhonemeExercisePayload;

  /* =======================
   * OUTPUT
   * ======================= */
  @Output()
  completed = new EventEmitter<boolean>();

  /* =======================
   * STATE
   * ======================= */
  state: AudioMatchState = {
    selected: undefined,
    isCorrect: false,
    playing: false
  };
  speechRate = 1.0;
  isPremium = false;
  private audio?: HTMLAudioElement;

  constructor(
    private settingsservice: SettingsService
  ) {}  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      this.loadData();
      this.resetState();
      this.autoPlayAudio();
    }
  }

  loadData(): void {
    this.settingsservice.getUserSettings().subscribe({
      next: (data: any) => {
        this.isPremium = data.premium;
        this.speechRate = data.playback_speed;
      },
      error: err => console.error('Error loading settings', err)
    });
  }

  private resetState(): void {
    this.state = {
      selected: undefined,
      isCorrect: false,
      playing: false
    };
  }


  autoPlayAudio(): void {
    this.stopAudio();

    if (this.word.audio) {
      const audioUrl = this.normalizeAudioUrl(this.word.audio);
      this.audio = new Audio(audioUrl);
      this.audio.volume = 1;
      this.audio.playbackRate = 1;

      // 🔊 eventos
      this.audio.onplay = () => {
        this.state.playing = true;
      };

      this.audio.onended = () => {
        this.state.playing = false;
      };

      this.audio.onpause = () => {
        this.state.playing = false;
      };

      this.audio.onerror = () => {
        this.state.playing = false;
        console.warn('Error reproduciendo audio');
      };

      this.audio.play().catch(() => {
        this.state.playing = false;
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
     this.state.playing = false;
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.word.prompt);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      this.state.playing = true;
    };

    utterance.onend = () => {
      this.state.playing = false;
    };

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

    setTimeout(() => {
      this.completed.emit(this.state.isCorrect);
    }, 600);
  }

}
