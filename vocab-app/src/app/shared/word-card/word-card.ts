// shared/word-card.ts (VISTA)
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-word-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-card.html',
  styleUrls: ['./word-card.scss']
})
export class WordCardComponent {
  @Input() word!: Word;
  @Output() toggleLearned = new EventEmitter<number>();
  
  onToggleLearned(): void {
    this.toggleLearned.emit(this.word.id);
  }
  
  playAudio(): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.word.english);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  }
  
  getDifficultyColor(): string {
    switch(this.word.difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'secondary';
    }
  }
}