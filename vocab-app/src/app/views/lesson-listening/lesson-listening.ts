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
import { HostListener } from '@angular/core';

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

  @Output()
  cancel = new EventEmitter<boolean>();

  private audio?: HTMLAudioElement;

  isPlaying = false;
  showTranslation = false;
  isPaused = false;
  playbackRate = 1;
  currentTime = 0;
  duration = 0;
  showIPA = false;
  showText = false;
  showSpeedMenu = false;

  speedOptions = [0.25,0.5, 0.75, 1, 1.25, 1.5,2.0];

  constructor(private progressService: ProgressService,private audioService:AudioService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listening']) {
      // this.showTranslation = false;
      // this.autoPlay();
      this.resetState();
      this.loadAudio();
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

  loadAudio(): void {
    this.stopAudio();

    if (this.listening.audio) {
      const audioUrl = this.progressService.normalizeAudioUrl(this.listening.audio);

      this.audio = new Audio(audioUrl);
      this.audio.playbackRate = this.speechRate;

      this.audio.onloadedmetadata = () => {
        this.duration = this.audio!.duration;
      };

      this.audio.ontimeupdate = () => {
        this.currentTime = this.audio!.currentTime;
      };

      this.audio.onended = () => {
        this.isPlaying = false;
        this.isPaused = false;
      };
    }
  }

  toggleAudio(): void {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.isPaused = true;
    } else {
      this.audio.play();
      this.isPlaying = true;
      this.isPaused = false;
    }
  }

  seek(event: any): void {
    if (this.audio) {
      this.audio.currentTime = event.target.value;
    }
  }

  formatTime(time: number): string {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
  }

  toggleIPA(): void {
    this.showIPA = !this.showIPA;
  }

  toggleText(): void {
    this.showText = !this.showText;
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
    this.isPlaying = false;
    this.isPaused = false;
  }

  private resetState(): void {
    this.showTranslation = false;
    this.showIPA = false;
    this.showText = false;
    this.currentTime = 0;
    this.duration = 0;
  }

  private fallbackTTS(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.listening.word);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

  changeSpeed(delta: number): void {
    let newRate = this.playbackRate + delta;

    // límites (muy importante)
    if (newRate < 0.5) newRate = 0.5;
    if (newRate > 2) newRate = 2;

    this.playbackRate = parseFloat(newRate.toFixed(2));

    if (this.audio) {
      this.audio.playbackRate = this.playbackRate;
    }
  }

  toggleSpeedMenu(): void {
    this.showSpeedMenu = !this.showSpeedMenu;
  }

  setSpeed(rate: number): void {
    this.playbackRate = rate;
    this.showSpeedMenu = false;

    if (this.audio) {
      this.audio.playbackRate = rate;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const target = event.target;
    if (!target.closest('.speed-control')) {
      this.showSpeedMenu = false;
    }
  }

  onCancel(): void {
    this.stopAudio();
    speechSynthesis.cancel();

    this.cancel.emit(true);
  }

}
