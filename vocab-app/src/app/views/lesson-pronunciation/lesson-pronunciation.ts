import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { LessonPronunciationExercisePayload } from './lesson-pronunciation.model';
import { ProgressService } from '../../services/user-progress'
import { AudioService } from '../../services/audio';


@Component({
  selector: 'app-lesson-pronunciation',
  standalone: true,
  imports: [],
  templateUrl: './lesson-pronunciation.html',
  styleUrl: './lesson-pronunciation.scss',
})
export class LessonPronunciation {
  @Input({ required: true })
  pronunciation!: LessonPronunciationExercisePayload;
  @Input({ required: true }) speechRate!: number;
  @Input({ required: true }) isPremium!: boolean;

  @Output()
  completed = new EventEmitter<boolean>();

  private audio?: HTMLAudioElement;

  isPlaying = false;
  highlightedIPA: string = '';

  private phonemeMap: Record<string, string[]> = {
    'ʃ': ['sh', 'ti', 'ci', 'ssi'],
    'tʃ': ['ch', 'tch'],
    'θ': ['th'],
    'ð': ['th'],
    'f': ['f', 'ph'],
    'k': ['k', 'c', 'ck', 'ch'],
    'iː': ['ee', 'ea', 'ie', 'e'],
    'eɪ': ['a', 'ai', 'ay'],
    'aɪ': ['i', 'igh', 'y'],
    'uː': ['oo', 'u'],
    'ɔː': ['or', 'aw', 'au'],
  };

  constructor(private progressService: ProgressService,private audioService:AudioService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pronunciation']) {
      this.generatehighlightedIPA();
      this.autoPlay();
    }
  }

  autoPlay(): void {
    this.stopAudio();
    if (!this.pronunciation.audio) return;

    this.isPlaying = true;
    const audioUrl = this.progressService.normalizeAudioUrl(this.pronunciation.audio);
    this.audioService.play(audioUrl,1,this.speechRate);
  }

  playAudio(): void {
    this.autoPlay();
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


  private generatehighlightedIPA(): void {
    if (!this.pronunciation?.ipa || !this.pronunciation?.phoneme) {
      this.highlightedIPA = this.pronunciation?.ipa || '';
      return;
    }

    const ipa = this.pronunciation.ipa;
    const phoneme = this.pronunciation.phoneme.replace(/\//g, '');

    let patterns: string[] = [];

    // Si existe mapeo fonético
    if (this.phonemeMap[phoneme]) {
      patterns = this.phonemeMap[phoneme];
    } else {
      // fallback → intentar coincidencia literal
      patterns = [phoneme];
    }

    let highlighted = ipa;

    patterns.forEach(pattern => {
      const regex = new RegExp(pattern, 'gi');
      highlighted = highlighted.replace(
        regex,
        match => `<span class="highlight">${match}</span>`
      );
    });

    this.highlightedIPA = highlighted;
  }

}
