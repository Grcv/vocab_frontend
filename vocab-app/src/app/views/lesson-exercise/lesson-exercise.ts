import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { LessonExercisePayload } from './lesson-exercise.model';
import { ProgressService } from '../../services/user-progress';
import { AudioService } from '../../services/audio';

@Component({
  selector: 'app-lesson-exercise',
  standalone: true,
  imports: [],
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
  markedLearned = new EventEmitter<number>(); 

  @Output()
  cancel = new EventEmitter<boolean>();

  private audio?: HTMLAudioElement;

  isPlaying = false;
  markedAsLearned = false;

  constructor(private progressService: ProgressService,private audioService:AudioService){}

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
      this.audioService.play(audioUrl,1,this.speechRate);
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
      this.audioService.stop()
      this.audio = undefined;
    }
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.word.word);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;
    utterance.pitch = 1;
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


  onCancel(): void {
  this.stopAudio();
  speechSynthesis.cancel();

  this.cancel.emit(true);
}

}
