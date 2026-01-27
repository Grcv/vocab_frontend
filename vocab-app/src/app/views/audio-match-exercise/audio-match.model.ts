export interface AudioMatchExercisePayload {
  word_id: number;
  exercise: 'audio';
  stage: string;

  prompt: string;        // palabra correcta (texto de referencia)
  options: string[];     // opciones visibles
  correct: string;       // respuesta correcta

  audio?: string;        // URL del audio (desde la API)
  ipa?:string;
}
