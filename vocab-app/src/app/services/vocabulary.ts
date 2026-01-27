// vocabulary.service.ts (CONTROLADOR)
import { Injectable } from '@angular/core';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private words: Word[] = [
    new Word(1, 'Apple', 'Manzana', 'Food', 'easy', 
             'images/apple.png', 'assets/audio/apple.mp3', 
             '/ˈæp.əl/', false, ['I eat an apple every day.', 'The apple is red.']),
    new Word(2, 'Book', 'Libro', 'Objects', 'easy', 
             'assets/images/book.png', 'assets/audio/book.mp3', 
             '/bʊk/', false, ['I read a book every night.', 'This book is interesting.']),
    new Word(3, 'Cat', 'Gato', 'Animals', 'easy', 
             'assets/images/cat.png', 'assets/audio/cat.mp3', 
             '/kæt/', false, ['The cat is sleeping.', 'I have a black cat.']),
    new Word(4, 'House', 'Casa', 'Places', 'medium', 
             'images/house.png', 'assets/audio/house.mp3', 
             '/haʊs/', false, ['My house is big.', 'We live in a white house.']),
    new Word(5, 'Water', 'Agua', 'Nature', 'easy', 
             'assets/images/water.png', 'assets/audio/water.mp3', 
             '/ˈwɔː.tər/', false, ['I drink water every day.', 'The water is cold.']),
    new Word(6, 'Sun', 'Sol', 'Nature', 'easy', 
             'assets/images/sun.png', 'assets/audio/sun.mp3', 
             '/sʌn/', false, ['The sun is shining.', 'We need sun for vitamin D.']),
    new Word(7, 'Friend', 'Amigo', 'People', 'medium', 
             'assets/images/friend.png', 'assets/audio/friend.mp3', 
             '/frend/', false, ['My friend is very kind.', 'We are good friends.']),
    new Word(8, 'School', 'Escuela', 'Places', 'medium', 
             'assets/images/school.png', 'assets/audio/school.mp3', 
             '/skuːl/', false, ['I go to school every day.', 'The school is near my house.']),
    new Word(9, 'Computer', 'Computadora', 'Technology', 'medium', 
             'images/computer.png', 'assets/audio/computer.mp3', 
             '/kəmˈpjuː.tər/', false, ['I use the computer for work.', 'My computer is fast.']),
    new Word(10, 'Music', 'Música', 'Arts', 'medium', 
             'images/music.png', 'assets/audio/music.mp3', 
             '/ˈmjuː.zɪk/', false, ['I listen to music every day.', 'This music is beautiful.']),
    new Word(11, 'Beautiful', 'Hermoso', 'Adjectives', 'hard', 
             'assets/images/beautiful.png', 'assets/audio/beautiful.mp3', 
             '/ˈbjuː.tɪ.fəl/', false, ['The sunset is beautiful.', 'She has a beautiful voice.']),
    new Word(12, 'Exercise', 'Ejercicio', 'Activities', 'hard', 
             'assets/images/exercise.png', 'assets/audio/exercise.mp3', 
             '/ˈek.sə.saɪz/', false, ['I do exercise every morning.', 'Exercise is good for health.'])
  ];

  constructor() {
    
  }

  // Métodos del controlador
  getAllWords(): Word[] {
    return [...this.words];
  }


}