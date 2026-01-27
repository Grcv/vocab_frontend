// exercise-manager.service.ts (CONTROLADOR)
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { Word } from '../models/word.model';
import { VocabularyService } from './vocabulary';

@Injectable({
  providedIn: 'root'
})
export class ExerciseManagerService {
  private exercises: Exercise[] = [
    new Exercise(1, 'image-match', 'Relaciona imagen con palabra', 
                'Selecciona la palabra correcta para cada imagen', [1, 2, 3, 4]),
    new Exercise(2, 'audio-match', 'Relaciona audio con significado', 
                'Escucha y selecciona el significado correcto', [5, 6, 7, 8]),
    new Exercise(3, 'translation', 'Traducción español-inglés', 
                'Traduce las palabras del español al inglés', [9, 10, 11, 12]),
    new Exercise(4, 'spelling', 'Ortografía', 
                'Escribe correctamente las palabras en inglés', [1, 4, 7, 10]),
    new Exercise(5, 'pronunciation', 'Pronunciación', 
                'Practica la pronunciación de las palabras', [2, 5, 8, 11])
  ];

  constructor(private vocabularyService: VocabularyService) {}

  // Métodos del controlador

}