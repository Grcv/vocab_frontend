import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {

  private readonly baseUrl = '/api/progress'; // tu endpoint real

  constructor(private http: HttpClient) {}

  sendMessage(messages: ChatMessage[]): Observable<ChatResponse> {

    const lastMessage = messages[messages.length - 1];

    // Convertimos historial a texto plano
    const context = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    return this.http.post<ChatResponse>(`${this.baseUrl}/conversation/`, {
      message: lastMessage.content,
      context: context
    });
  }
}