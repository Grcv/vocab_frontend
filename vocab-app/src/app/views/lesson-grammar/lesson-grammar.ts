import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonGrammarExercisePayload } from './lesson-grammar.model';


@Component({
  selector: 'app-lesson-grammar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-grammar.html',
  styleUrl: './lesson-grammar.scss',
})
export class LessonGrammar {
  @Input({ required: true })
  grammar!: LessonGrammarExercisePayload;

  @Output()
  completed = new EventEmitter<boolean>();

  @Output()
  markedLearned = new EventEmitter<void>();

  private audio?: HTMLAudioElement;

  isPlaying = false;
  markedAsLearned = false;

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
      const audioUrl = this.normalizeAudioUrl(this.grammar.audio);
      this.audio = new Audio(audioUrl);
      this.audio.play().catch(() => {});
      this.audio.onended = () => this.isPlaying = false;
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
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = undefined;
    }
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.grammar.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
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

  private normalizeAudioUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:8000/${path}`;
  }
}
