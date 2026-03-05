import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonExercisePayload } from './lesson-exercise.model';
import { ProgressService } from '../../services/user-progress'

@Component({
  selector: 'app-lesson-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-exercise.html',
  styleUrls: ['./lesson-exercise.scss'],
})
export class LessonExerciseComponent implements OnChanges {

  @Input({ required: true })
  word!: LessonExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;

  @Output()
  completed = new EventEmitter<boolean>();

  @Output()
  markedLearned = new EventEmitter<number>(); // 🔥 para backend

  private audio?: HTMLAudioElement;

  isPlaying = false;
  markedAsLearned = false;

  constructor(private progressService: ProgressService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      this.markedAsLearned = false;
      this.autoPlayAudio();
    }
  }

  /* =======================
   * AUDIO
   * ======================= */
  autoPlayAudio(): void {
    this.stopAudio();
    this.isPlaying = true;

    if (this.word.audio) {
      const audioUrl = this.progressService.normalizeAudioUrl(this.word.audio);
      this.audio = new Audio(audioUrl);
      this.audio.volume = 1;
      this.audio.playbackRate = this.speechRate;

      this.audio.play().catch(() => {
        console.warn('Autoplay bloqueado');
      });

      this.audio.onended = () => this.isPlaying = false;
    } else {
      this.fallbackTTS();
      setTimeout(() => this.isPlaying = false, 1200);
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
    const utterance = new SpeechSynthesisUtterance(this.word.word);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;
    speechSynthesis.speak(utterance);
  }

  /* =======================
   * MARCAR APRENDIDA
   * ======================= */
  markAsLearned(): void {
    this.markedAsLearned = !this.markedAsLearned;

    if (this.markedAsLearned) {
      this.markedLearned.emit(this.word.word_id);
    }
  }

  /* =======================
   * FLOW
   * ======================= */
  continue(): void {
    this.completed.emit(true);
  }

}
