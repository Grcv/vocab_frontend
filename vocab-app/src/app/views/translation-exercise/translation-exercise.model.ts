export interface TranslationExercisePayload {
  word_id: number;
  exercise: 'translation';
  stage: string;
  prompt: string;        // palabra en inglés
  options: string[];
  correct: string;       // respuesta correcta
  audio?: string; 
}
