import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonListeningExercisePayload } from './lesson-listening.model';
import { ProgressService } from '../../services/user-progress'

@Component({
  selector: 'app-lesson-listening',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-listening.html',
  styleUrl: './lesson-listening.scss',
})
export class LessonListening {
  @Input({ required: true })
  listening!: LessonListeningExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;

  @Output()
  completed = new EventEmitter<boolean>();

  private audio?: HTMLAudioElement;

  isPlaying = false;
  showTranslation = false;

  constructor(private progressService: ProgressService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listening']) {
      this.showTranslation = false;
      this.autoPlay();
    }
  }

  autoPlay(): void {
    this.stopAudio();
    if (!this.listening.audio) return;

    this.isPlaying = true;
    const audioUrl = this.progressService.normalizeAudioUrl(this.listening.audio);
    this.audio = new Audio(audioUrl);
    this.audio.volume = 1;
    this.audio.playbackRate = this.speechRate;

    this.audio.play().catch(() => {});
    this.audio.onended = () => this.isPlaying = false;
  }

  playAudio(): void {
    this.autoPlay();
  }

  toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
  }

  continue(): void {
    this.completed.emit(true);
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = undefined;
    }
  }

}
