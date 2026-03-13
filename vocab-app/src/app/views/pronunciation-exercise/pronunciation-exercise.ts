import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PronunciationExercisePayload } from './pronunciation-exercise.model';
import { ProgressService } from '../../services/user-progress';
import { AudioService } from '../../services/audio';

@Component({
  selector: 'app-pronunciation-exercise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pronunciation-exercise.html',
  styleUrls: ['./pronunciation-exercise.scss']
})
export class PronunciationExercise implements OnChanges, OnDestroy {

  @Input({ required: true })
  word!: PronunciationExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;

  @Output()
  completed = new EventEmitter<boolean>();

  readonly MAX_ATTEMPTS = 2;

  state = {
    listening: false,
    attempts: 0,
    locked: false,
    feedbackVisible: false,
    isCorrect: false,
    score: 0
  };

  private audio?: HTMLAudioElement;
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private stream?: MediaStream;

  constructor(
    private progressService: ProgressService,
    private zone: NgZone,
    private audioService:AudioService
  ) {}

  /* =======================
   * LIFECYCLE
   * ======================= */

  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['word']) {
      this.resetState();
      setTimeout(() => this.playAudio(), 400);
    }
  }

  ngOnDestroy(): void {
    this.stopRecording(true);
    this.stopAudio();
  }

  private resetState(): void {
    this.state = {
      listening: false,
      attempts: 0,
      locked: false,
      feedbackVisible: false,
      isCorrect: false,
      score: 0
    };
  }

  /* =======================
   * AUDIO MODELO
   * ======================= */

  playAudio(): void {
    this.stopAudio();

    if (this.word.audio){

      const url = this.progressService.normalizeAudioUrl(this.word.audio);
      this.audioService.play(url,1,this.speechRate);
    } else{
      this.fallbackTTS();
    }
  }

  private stopAudio(): void {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio = undefined;
  }


  /* =======================
   * MICRÓFONO (TOGGLE REAL)
   * ======================= */

  async startListening(): Promise<void> {
    if (this.state.locked) return;

    // Toggle OFF
    if (this.state.listening) {
      this.stopRecording();
      return;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstop = () => this.onRecordingFinished();

      this.mediaRecorder.start();

      // 🔴 FORZAR UPDATE VISUAL
      this.zone.run(() => {
        this.state.listening = true;
        this.state.attempts++;
      });

      // ⏱ Auto-stop
      setTimeout(() => {
        if (this.state.listening) {
          this.stopRecording();
        }
      }, 2500);

    } catch (e) {
      console.error('❌ No se pudo acceder al micrófono', e);
    }
  }

  private stopRecording(force = false): void {
    if (!this.mediaRecorder) return;

    if (this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    this.stream?.getTracks().forEach(t => t.stop());
    this.stream = undefined;

    this.zone.run(() => {
      this.state.listening = false;
    });

    if (force) {
      this.mediaRecorder = undefined;
      this.audioChunks = [];
    }
  }

  /* =======================
   * ENVÍO AL BACKEND
   * ======================= */

  private onRecordingFinished(): void {
    if (!this.audioChunks.length) return;

    const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
    this.audioChunks = [];

    const file = new File([blob], 'audio.webm', {
      type: 'audio/webm'
    });
    console.log(this.word.audio)
    this.progressService.compareAudio(file, this.word.word_id)
      .subscribe({
        next: data => {
          this.zone.run(() => {
            this.state.score = data.score * 100 ;
            this.state.isCorrect = data.correct;
            this.state.feedbackVisible = true;

            if (data.correct) {
              setTimeout(() => this.completed.emit(true), 1800);
            } else if (this.state.attempts >= this.MAX_ATTEMPTS) {
              this.state.locked = true;
              this.completed.emit(false);
            }
          });
        },
        error: err => console.error('❌ Error backend', err)
      });
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


}
