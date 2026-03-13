import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { AudioMatchExercisePayload } from './audio-match.model';
import { ProgressService } from '../../services/user-progress'
import { AudioService } from '../../services/audio';


interface AudioMatchState {
  selected?: string;
  isCorrect: boolean;
  playing: boolean;
}

@Component({
  selector: 'app-audio-match-exercise',
  standalone: true,
  imports: [],
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
    private progressservice: ProgressService,
    private audioService:AudioService
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
      this.audioService.play(audioUrl,1,this.speechRate);

    } else {
      this.fallbackTTS();
    }
  }

  playAudio(): void {
    this.autoPlayAudio();
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audioService.stop()
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
