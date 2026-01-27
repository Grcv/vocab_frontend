import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/user-progress';

// Ejercicios

import { TranslationExercise } from '../../views/translation-exercise/translation-exercise';
import { AudioMatchExercise } from '../../views/audio-match-exercise/audio-match-exercise';
import { AudioToAudioExercise } from '../../views/audio-audio-exercise/audio-to-audio-exercise';
import { PronunciationExercise } from '../../views/pronunciation-exercise/pronunciation-exercise';
import { SpellingExercise } from '../../views/spelling-exercise/spelling-exercise';
import {LessonExerciseComponent} from '../../views/lesson-exercise/lesson-exercise'
import {FinishedLesson} from '../../views/finished-lesson/finished-lesson'
type ExerciseType =
  | 'lesson'
  | 'translation'
  | 'audio'
  | 'audiotoaudio'
  | 'pronunciation'
  | 'spelling';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    CommonModule,
    TranslationExercise,
    AudioMatchExercise,
    AudioToAudioExercise,
    PronunciationExercise,
    SpellingExercise,
    LessonExerciseComponent,
    FinishedLesson,
  ],
  templateUrl: './exercises.html',
  styleUrls: ['./exercises.scss']
})
export class Exercises implements OnInit {

  currentExercise: ExerciseType | null = null;
  currentWord: any = null;

  loading = false;
  finished = false;

  constructor(private progressService: ProgressService,private router: Router) {}

  ngOnInit(): void {
    console.log('Exercises init');
    this.loadNextExercise();
  }

  /** 🔄 Pedir al backend el siguiente ejercicio */
loadNextExercise(): void {
  this.loading = true;

  this.progressService.getNextExercise().subscribe({
    next: (data: any) => {
      console.log('Respuesta backend:', data);

      // 🔴 CASO FIN DE SESIÓN
      if (data.finished === true) {
        this.finished = true;
        this.currentExercise = null;
        this.currentWord = null;
        this.loading = false;
        return;
      }

      // 🟢 CASO EJERCICIO NORMAL
      this.finished = false;
      this.currentExercise = data.exercise as ExerciseType;
      this.currentWord = data;

      this.loading = false;
    },
    error: () => {
      // fallback de seguridad
      this.finished = true;
      this.currentExercise = null;
      this.currentWord = null;
      this.loading = false;
    }
  });
}

  /** ✅ Cuando el usuario termina un ejercicio */
  onExerciseCompleted(correct: boolean): void {
    if (!this.currentWord) return;

    this.progressService
      .submitAnswer(this.currentWord.word_id, correct)
      .subscribe(() => {
        this.loadNextExercise();
      });
  }

restartSession() {
  this.restart()
}

restart() {
  this.progressService.resetSession().subscribe(() => {
    this.finished = false;
    this.loadNextExercise();
  });
}

goToDashboard() {
  this.router.navigate(['/dashboard']);
  console.log('Go to dashboard');
}
  
}
