import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { AudioToAudioExercisePayload } from './audio-to-audio-exercise.model';
import { ProgressService } from '../../services/user-progress'

interface AudioState {
  selected?: number;
  previewIndex?: number;
  isCorrect: boolean;
}

@Component({
  selector: 'app-audio-to-audio-exercise',
  standalone: true,
  imports: [],
  templateUrl: './audio-to-audio-exercise.html',
  styleUrls: ['./audio-to-audio-exercise.scss']
})
export class AudioToAudioExercise
  implements  OnDestroy, OnChanges {

  @Input({ required: true })
  word!: AudioToAudioExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;
  @Output()
  completed = new EventEmitter<boolean>();

  state: AudioState = {
    selected: undefined,
    previewIndex: undefined,
    isCorrect: false
  };

  private audio?: HTMLAudioElement;

  constructor(private progressService: ProgressService){}


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['word']) {
      this.prepareWord();
      this.resetState();
      this.playTargetAudio();
    }
  }

  ngOnDestroy(): void {
    this.stopAudio();
    speechSynthesis.cancel();
  }

  private resetState(): void {
    this.state = {
      selected: undefined,
      previewIndex: undefined,
      isCorrect: false
    };
  }

  /* =======================
   * PREPARAR AUDIO
   * ======================= */
  private prepareWord(): void {
    if (!this.word.audio_options?.length) return;

    const index = this.word.audio_options.indexOf(this.word.correct);
    this.word = {
      ...this.word,
      correct_index: index 
    };
  }

  /* AUDIO OBJETIVO */
  playTargetAudio(): void {
    this.playAudio(this.word.correct, this.word.prompt);
  }

  /* PREVIEW OPCIÓN */
  previewOption(index: number): void {
    this.state.previewIndex = index;
    const optionAudio = this.word.audio_options?.[index];
    this.playAudio(optionAudio, this.word.prompt);
  }

  /* CONFIRMAR OPCIÓN */
  confirmOption(index: number): void {
    if (this.state.isCorrect) return;

    this.state.selected = index;
    this.state.isCorrect = index === this.word.correct_index;

    setTimeout(() => {
      this.completed.emit(this.state.isCorrect);
    }, 600);
  }

  /* CORE AUDIO */
  private playAudio(audioPath?: string, fallbackText?: string): void {
    this.stopAudio();

    if (audioPath) {
      const audioUrl = this.progressService.normalizeAudioUrl(audioPath);
      this.audio = new Audio(audioUrl);
      this.audio.volume = 1;
      this.audio.playbackRate = this.speechRate;

      this.audio.play().catch(() => {
        console.warn('Autoplay bloqueado');
        this.fallbackTTS(fallbackText);
      });
    } else {
      this.fallbackTTS(fallbackText);
    }
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = undefined;
    }
  }

  private fallbackTTS(text?: string): void {
    if (!text || !('speechSynthesis' in window)) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }

}
