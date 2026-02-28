import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonPronunciationExercisePayload } from './lesson-pronunciation.model';


@Component({
  selector: 'app-lesson-pronunciation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-pronunciation.html',
  styleUrl: './lesson-pronunciation.scss',
})
export class LessonPronunciation {
  @Input({ required: true })
  pronunciation!: LessonPronunciationExercisePayload;

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
    const audioUrl = this.normalizeAudioUrl(this.pronunciation.audio);
    this.audio = new Audio(audioUrl);

    this.audio.play().catch(() => {});
    this.audio.onended = () => this.isPlaying = false;
  }

  playAudio(): void {
    this.autoPlay();
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

  private normalizeAudioUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `http://127.0.0.1:8000${path}`;
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
