import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { TranslationExercisePayload } from './translation-exercise.model';
import { ProgressService } from '../../services/user-progress'
import { AudioService } from '../../services/audio';

interface TranslationState {
  selected?: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-translation-exercise',
  standalone: true,
  imports: [],
  templateUrl: './translation-exercise.html',
  styleUrls: ['./translation-exercise.scss'],
})
export class TranslationExercise implements OnChanges {

  /* =======================
   * INPUT
   * ======================= */
  @Input({ required: true })
  word!: TranslationExercisePayload;
  @Input({ required: true }) speechRate!: number ;
  @Input({ required: true }) isPremium!: boolean ;
  /* =======================
   * OUTPUT
   * ======================= */
  @Output()
  completed = new EventEmitter<boolean>();

  @Output()
  cancel = new EventEmitter<boolean>();

  /* =======================
   * STATE
   * ======================= */
  state: TranslationState = {
    selected: undefined,
    isCorrect: false
  };
  
  private audio?: HTMLAudioElement;

  constructor(private progressService: ProgressService,private audioService:AudioService){}

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
      const audioUrl = this.progressService.normalizeAudioUrl(this.word.audio);
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
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.word.prompt);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

  /* ============================
   * UTILS
   * ============================ */

  selectOption(option: string): void {
    this.stopAudio();
    if (this.state.selected) return;

    this.state.selected = option;
    this.state.isCorrect = option === this.word.correct;

    // pequeño delay para mostrar feedback visual
    setTimeout(() => {
      this.completed.emit(this.state.isCorrect);
    }, 600);
  }

  onCancel(): void {
    this.stopAudio();
    speechSynthesis.cancel();

    this.cancel.emit();
  }

}
