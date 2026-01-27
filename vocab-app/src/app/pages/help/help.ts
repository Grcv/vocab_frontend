import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.html',
  styleUrls: ['./help.scss']
})
export class Help {

  faqs = [
    {
      question: '¿Cómo funciona el aprendizaje de palabras?',
      answer:
        'Las palabras se muestran poco a poco. Cuando marcas una palabra como aprendida, el sistema la registra y deja de mostrártela para estudio.'
    },
    {
      question: '¿Qué significa el nivel CEFR?',
      answer:
        'El CEFR es un estándar internacional que indica tu nivel de inglés. A1 es básico, A2 intermedio, B1 avanzado, etc.'
    },
    {
      question: '¿Qué pasa cuando marco una palabra como aprendida?',
      answer:
        'La palabra se marca como dominada y ya no aparecerá en tus ejercicios, pero seguirá contando en tu progreso.'
    },
    {
      question: '¿Puedo volver a estudiar palabras aprendidas?',
      answer:
        'Sí, en futuras versiones podrás repasar palabras ya aprendidas desde el historial.'
    },
    {
      question: '¿Cómo escuchar la pronunciación?',
      answer:
        'Presiona el botón de 🔊 escuchar. Si el navegador lo permite, se reproducirá el audio automáticamente.'
    }
  ];

}
