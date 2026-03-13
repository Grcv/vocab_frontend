import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { LessonListeningExercisePayload } from './lesson-listening.model';
import { ProgressService } from '../../services/user-progress'
import { AudioService } from '../../services/audio';

@Component({
  selector: 'app-lesson-listening',
  standalone: true,
  imports: [],
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

  constructor(private progressService: ProgressService,private audioService:AudioService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listening']) {
      this.showTranslation = false;
      this.autoPlay();
    }
  }

  autoPlay(): void {
    this.stopAudio();
    if (this.listening.audio){
      this.isPlaying = true;
      const audioUrl = this.progressService.normalizeAudioUrl(this.listening.audio);
      this.audioService.play(audioUrl,1,this.speechRate);
    }else {
      this.fallbackTTS();
    }
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
      this.audioService.stop()
      this.audio = undefined;
    }
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.listening.word);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }


}
