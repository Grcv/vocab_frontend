export interface AudioToAudioExercisePayload {
  word_id: number;
  exercise: 'audiotoaudio';
  stage: string;
  prompt: string;      // palabra objetivo
  correct: string;     // audio correcto (URL)
  audio_options?: string[];

  // calculado en frontend
  correct_index?: number;
}
