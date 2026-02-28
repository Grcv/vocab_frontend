export interface LessonListeningExercisePayload {
  word_id: number;
  exercise: 'lesson_listening';
  stage: 'lesson_listening';

  word: string;          // palabra en inglés
  translation: string;  // traducción al español
  ipa?: string;
  audio?: string;        // audio opcional
  image?: string;        // imagen opcional
  cefr: string;
  theme: string;
  situation: string;
  story_type: string;

}
