import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioMatchExercisePayload } from './audio-match.model';
import { ProgressService } from '../../services/user-progress'

interface AudioMatchState {
  selected?: string;
  isCorrect: boolean;
  playing: boolean;
}

@Component({
  selector: 'app-audio-match-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-match-exercise.html',
  styleUrls: ['./audio-match-exercise.scss'],
})
export class AudioMatchExercise implements OnChanges {

  /* =======================
   * INPUT (MISMO CONTRATO)
   * ======================= */
  @Input({ required: true })
  word!: AudioMatchExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;
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

  private audio?: HTMLAudioElement;

  constructor(
    private progressservice: ProgressService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      
      this.resetState();
      this.autoPlayAudio();
    }
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
      const audioUrl = this.progressservice.normalizeAudioUrl(this.word.audio);
      this.audio = new Audio(audioUrl);
      this.audio.volume = 1;
      this.audio.playbackRate = this.speechRate;

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
    utterance.rate = this.speechRate;
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

  selectOption(option: string): void {
    if (this.state.selected) return;

    this.state.selected = option;
    this.state.isCorrect = option === this.word.correct;

    setTimeout(() => {
      this.completed.emit(this.state.isCorrect);
    }, 600);
  }
}
