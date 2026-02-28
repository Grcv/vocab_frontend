export interface LessonPronunciationExercisePayload {
  word_id: number;
  exercise: 'lesson_pronunciation';
  stage: 'lesson_pronunciation';

  word: string;          // palabra en inglés
  ipa?: string;
  audio?: string;        // audio opcional
  image?: string;        // imagen opcional
  phoneme: string;
  translation:string;
}
