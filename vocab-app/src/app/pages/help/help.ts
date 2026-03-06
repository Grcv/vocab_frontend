import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './help.html',
  styleUrls: ['./help.scss']
})
export class Help {
  faqs = [
    { question: '¿Cómo funciona el aprendizaje de palabras?', answer: 'Las palabras se muestran poco a poco. Cuando marcas una palabra como aprendida, el sistema la registra y deja de mostrártela para estudio.' },
    { question: '¿Qué significa el nivel CEFR?', answer: 'El CEFR es un estándar internacional que indica tu nivel de inglés. A1 es básico, A2 intermedio, B1 avanzado, etc.' },
    { question: '¿Qué pasa cuando marco una palabra como aprendida?', answer: 'La palabra se marca como dominada y ya no aparecerá en tus ejercicios, pero seguirá contando en tu progreso.' },
    { question: '¿Puedo volver a estudiar palabras aprendidas?', answer: 'Sí, en futuras versiones podrás repasar palabras ya aprendidas desde el historial.' },
    { question: '¿Cómo escuchar la pronunciación?', answer: 'Presiona el botón de 🔊 escuchar. Si el navegador lo permite, se reproducirá el audio automáticamente.' }
  ];

  // Formulario de soporte
  supportForm = {
    email: '',
    topic: '',
    subtopic: '',
    message: ''
  };

  topics = [
    { label: 'Error técnico', value: 'error', subtopics: ['Error en palabras', 'Comportamiento inesperado', 'Problema de audio'] },
    { label: 'Facturación', value: 'billing', subtopics: ['Pago incorrecto', 'Factura no recibida', 'Reembolso'] },
    { label: 'Cuenta / Perfil', value: 'account', subtopics: ['Actualizar perfil', 'Problema de login', 'Eliminar cuenta'] },
    { label: 'Sugerencias', value: 'suggestion', subtopics: [] },
    { label: 'Otro', value: 'other', subtopics: [] }
  ];

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private settingsservice: SettingsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.settingsservice.getUserSettings().subscribe({
      next: (data: any) => {
        this.supportForm.email = data.user;
      },
      error: err => console.error('Error loading settings', err)
    });
  }

  getCurrentSubtopics(): string[] {
    const topic = this.topics.find(t => t.value === this.supportForm.topic);
    return topic ? topic.subtopics : [];
  }

  sendSupport() {
    if (!this.supportForm.email || !this.supportForm.message || !this.supportForm.topic) {
      this.errorMessage = 'Por favor llena todos los campos obligatorios';
      return;
    }

    this.errorMessage = '';
    this.loading = true;


    this.settingsservice.support(this.supportForm).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.successMessage = data.message;
        this.supportForm.message = '';
        this.supportForm.topic = '';
        this.supportForm.subtopic = '';
      },
      error: err => console.error('Error sending support message', err)
    });


  }

  getTopicLabel() {
    const topic = this.topics.find(t => t.value === this.supportForm.topic);
    return topic ? topic.label : '';
  }
}