import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService, ChatMessage } from '../../services/chat';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation.html',
  styleUrl: './conversation.scss',
})
export class Conversation {

  conversation: ChatMessage[] = [];

  state = {
    listening: false,
    loading: false
  };

  recognition: any;

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initSpeechRecognition();
    this.startConversation();
  }

  // 🔹 Mensaje inicial
  startConversation() {
    this.conversation.push({
      role: 'user',
      content: 'Start conversation'
    });

    this.sendToAPI();
  }

  // 🔥 ENVÍA TODO EL ARRAY
  sendToAPI() {

    this.state.loading = true;

    this.chatService.sendMessage(this.conversation).subscribe({
      next: (res) => {

        this.conversation.push({
          role: 'assistant',
          content: res.reply
        });
        this.recognition.stop();
        this.speak(res.reply);

        this.state.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.state.loading = false;
      }
    });
  }

  // 🔊 TEXT TO SPEECH
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  }

  // 🎤 SPEECH RECOGNITION
  initSpeechRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';

    this.recognition.continuous = true;      // 🔥 clave
    this.recognition.interimResults = true;  // 🔥 clave

    this.recognition.onresult = (event: any) => {

      let transcript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }

      if (event.results[event.results.length - 1].isFinal) {

        this.conversation.push({
          role: 'user',
          content: transcript.trim()
        });

        this.state.listening = false;
        this.recognition.stop();

        this.sendToAPI();
      }
    };

    this.recognition.onend = () => {
      if (this.state.listening) {
        this.recognition.start(); // 🔁 reinicia automáticamente
      }
    };

    this.recognition.onerror = () => {
      this.state.listening = false;
    };
  }
  startListening() {
    if (!this.recognition || this.state.loading) return;
    this.state.listening = true;
    this.recognition.start();
  }
}