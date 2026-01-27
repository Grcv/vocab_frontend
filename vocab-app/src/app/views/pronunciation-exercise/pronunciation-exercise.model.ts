export interface PronunciationExercisePayload {
  word_id: number;
  exercise: 'pronunciation';
  stage: string;

  prompt: string;   // palabra correcta (inglés)
  audio?: string;   // audio desde API (opcional)
}
