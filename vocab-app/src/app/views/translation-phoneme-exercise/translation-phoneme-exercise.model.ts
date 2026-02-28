export interface TranslationPhonemeExercisePayload {
  word_id: number;
  exercise: 'translation_phoneme';
  stage: string;
  prompt: string;        // palabra en inglés
  options: string[];
  correct: string;       // respuesta correcta
  audio?: string; 
}
