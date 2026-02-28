export interface LessonGrammarExercisePayload {
  word_id: number;
  exercise: 'lesson_grammar';
  stage: 'lesson_grammar';

  word: string;          // palabra en inglés
  translation: string;  // traducción al español
  ipa?: string;
  audio?: string;        // audio opcional
  image?: string;        // imagen opcional
  type: string;
  category: string;
  theme: string;
  subtheme: string;
  explain: string;
  formula: string;
  cefr: string;
  example_es: string;
  example_en: string;
}
