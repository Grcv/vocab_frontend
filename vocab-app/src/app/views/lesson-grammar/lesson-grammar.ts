import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { LessonGrammarExercisePayload } from './lesson-grammar.model';
import { ProgressService } from '../../services/user-progress'
import { AudioService } from '../../services/audio';

@Component({
  selector: 'app-lesson-grammar',
  standalone: true,
  imports: [],
  templateUrl: './lesson-grammar.html',
  styleUrl: './lesson-grammar.scss',
})
export class LessonGrammar {
  @Input({ required: true })
  grammar!: LessonGrammarExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;


  @Output()
  completed = new EventEmitter<boolean>();

  @Output()
  markedLearned = new EventEmitter<void>();

  private audio?: HTMLAudioElement;

  isPlaying = false;
  markedAsLearned = false;

  constructor(private progressService: ProgressService,private audioService:AudioService){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("grammar:",this.grammar)
    if (changes['grammar']) {
      this.markedAsLearned = false;
    }
  }

  autoPlayAudio(): void {
    this.stopAudio();
    this.isPlaying = true;

    if (this.grammar.audio) {
      const audioUrl = this.progressService.normalizeAudioUrl(this.grammar.audio);
      this.audioService.play(audioUrl,1,this.speechRate);
    } else {
      this.fallbackTTS();
      setTimeout(() => this.isPlaying = false, 1500);
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
    const utterance = new SpeechSynthesisUtterance(this.grammar.word);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;
    speechSynthesis.speak(utterance);
  }

  markAsLearned(): void {
    this.markedAsLearned = !this.markedAsLearned;
    if (this.markedAsLearned) {
      this.markedLearned.emit();
    }
  }

  continue(): void {
    this.completed.emit(true);
  }

}
