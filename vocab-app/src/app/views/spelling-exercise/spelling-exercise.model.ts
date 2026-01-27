export interface SpellingExercisePayload {
  word_id: number;
  exercise: 'spelling';
  stage: string;
  correct:string;
  prompt: string;   // palabra correcta (inglés)
  audio?: string;   // audio desde API (opcional)
}
