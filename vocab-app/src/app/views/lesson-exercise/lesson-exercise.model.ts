export interface LessonExercisePayload {
  word_id: number;
  exercise: 'lesson';
  stage: 'lesson';

  word: string;          // palabra en inglés
  translation: string;  // traducción al español
  ipa?: string;
  audio?: string;        // audio opcional
  image?: string;        // imagen opcional
}
