import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { ImageMatchQuestion, ImageMatchState } from './image-match.model';

@Component({
  selector: 'app-image-match-exercise',
  standalone: true,
  imports: [],
  templateUrl: './image-match-exercise.html',
  styleUrl: './image-match-exercise.scss',
})
export class ImageMatchExercise implements OnInit {

  @Output() completed = new EventEmitter<boolean>();

  questions: ImageMatchQuestion[] = [];

  currentIndex = 0;
  currentQuestion!: ImageMatchQuestion;

  state: ImageMatchState = {
    isCorrect: false
  };

  ngOnInit(): void {
    const rawLesson = localStorage.getItem('currentLesson');
    if (!rawLesson) return;

    const lesson = JSON.parse(rawLesson);

    this.questions = this.shuffleArray(
      this.buildQuestionsFromLesson(lesson.words)
    );

    if (this.questions.length) {
      this.loadQuestion();
    }
  }

  private buildQuestionsFromLesson(words: string[]): ImageMatchQuestion[] {
    const normalizedWords = words.map(w => w.toLowerCase());

    return normalizedWords.map(word => ({
      imageUrl: `images/${word}.png`,
      correctWord: word,
      options: this.buildOptions(word, normalizedWords)
    }));
  }

  private buildOptions(correct: string, allWords: string[]): string[] {
    const distractors = allWords
      .filter(w => w !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return this.shuffleArray([correct, ...distractors]);
  }

  loadQuestion(): void {
    this.currentQuestion = this.questions[this.currentIndex];

    this.state = {
      isCorrect: false,
      selected: undefined
    };

    setTimeout(() => this.playAudio(), 300);
  }

  private playAudio(): void {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      this.currentQuestion.correctWord
    );
    utterance.lang = 'en-US';

    speechSynthesis.speak(utterance);
  }

  // 🎯 AQUÍ está la magia
  selectOption(word: string): void {
    if (this.state.isCorrect) return; // evita doble click

    this.state.selected = word;
    this.state.isCorrect = word === this.currentQuestion.correctWord;

    if (this.state.isCorrect) {
      setTimeout(() => {
        this.next();
      }, 700); // ⏱️ feedback visual
    }
  }

  private next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.loadQuestion();
    } else {
      this.completed.emit();
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
