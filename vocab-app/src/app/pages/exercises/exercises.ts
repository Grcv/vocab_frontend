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
import {LessonExerciseComponent} from '../../views/lesson-exercise/lesson-exercise';
import {FinishedLesson} from '../../views/finished-lesson/finished-lesson';
import {LessonGrammar} from '../../views/lesson-grammar/lesson-grammar';
import {LessonListening} from '../../views/lesson-listening/lesson-listening';
import {LessonPronunciation} from '../../views/lesson-pronunciation/lesson-pronunciation';
import {TranslationPhonemeExercise} from '../../views/translation-phoneme-exercise/translation-phoneme-exercise'
import {AudioMatchPhonemeExercise} from '../../views/audio-match-phoneme-exercise/audio-match-phoneme-exercise'
import { SettingsService } from '../../services/settings'
type ExerciseType =
  | 'lesson'
  | 'lesson_grammar'
  | 'lesson_listening'
  | 'lesson_pronunciation'
  | 'translation'
  | 'translation_phoneme'
  | 'audio'
  | 'audio_phoneme'
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
    LessonGrammar,
    LessonListening,
    LessonPronunciation,
    TranslationPhonemeExercise,
    AudioMatchPhonemeExercise
  ],
  templateUrl: './exercises.html',
  styleUrls: ['./exercises.scss']
})
export class Exercises implements OnInit {

  currentExercise: ExerciseType | null = null;
  currentWord: any = null;

  loading = false;
  finished = false;
  type: string = '';
  seccion_type: string = '';
  isPremium:boolean = false;
  speechRate:number = 1;
  constructor(private progressService: ProgressService,private router: Router,private settingsservice:SettingsService) {}

  ngOnInit(): void {
    console.log('Exercises init');
    this.loadData();
    this.loadNextExercise();
    this.recover();
  }

  recover(): void {
    const seccion_type = localStorage.getItem('section');
    this.progressService.recoverStage(seccion_type)

  }

  loadData(): void {
    this.settingsservice.getUserSettings().subscribe({
      next: (data: any) => {
        this.isPremium = data.premium;
        this.speechRate = data.playback_speed;
      },
      error: err => console.error('Error loading settings', err)
    });
  }


    /** 🔄 Pedir al backend el siguiente ejercicio */
  loadNextExercise(): void {
    const seccion_type = localStorage.getItem('section');
    this.loading = true;
    this.progressService.getNextExercise(seccion_type).subscribe({
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
        this.type= data.type
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
      .submitAnswer(this.currentWord.word_id, correct,this.type)
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
  const sectionType = localStorage.getItem('section');
  console.log("sectionType:",sectionType)
  localStorage.removeItem('section');

  if (sectionType) {
    this.router.navigate([`/${sectionType}`]);
  } else {
    this.router.navigate(['/dashboard']);
  }

  console.log('Go to dashboard');
}

  
}
