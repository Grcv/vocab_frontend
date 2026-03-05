import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment  } from '../environment/environment'
/* =========================
   MODELOS
   ========================= */


export interface SummaryResponse {
  user_name: string;
  cefr: string;
  total: number;
  learned: number;
  pending: number;
  by_stage: Record<string, number>;
}

export interface recoverResponse {
  message: string;
  deleted: number;
}

export interface LessonExerciseResponse {
  exercise: 'lesson';
  stage: 'lesson';
  word_id: number;
  word: string;
  translation: string;
  audio?: string | null;
  image?: string | null;
}

export interface ReviewExerciseResponse {
  exercise: 'review';
  stage: string;
  word_id: number;
  prompt?: string;
  options?: string[];
  audio?: string | null;
  audio_options?: string[];
  correct?: string;
  ipa?:string;
}


export interface PendingResponse {
  count: number;
  cefr: string;
  pending_words: {
    id: number;
    word: string;
    translation: string;
    ipa?: string;
    pos?: string;
    cefr: string;
    has_audio: boolean;
  }
}
export type NextExerciseResponse =
  | LessonExerciseResponse
  | ReviewExerciseResponse
  | { finished: true };

/* =========================
   SERVICE
   ========================= */

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly baseUrl = '/api/progress';
  private url = environment.mediaUrl;
  constructor(private http: HttpClient) {}

  /* =========================
     NEXT EXERCISE
     ========================= */

  getNextExercise(seccion_type: string | null): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/next/`, {
      type:seccion_type
    });
  }

  /* =========================
     SUBMIT ANSWER
     ========================= */

  submitAnswer(wordId: number, correct: boolean,type:string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/answer/`, {
      word_id: wordId,
      type:type,
      correct
    });
  }

  /* =========================
     SUMMARY
     ========================= */

  getSummary(type: string): Observable<SummaryResponse> {
    return this.http.post<SummaryResponse>(`${this.baseUrl}/summary/`,{type:type});
  }

  /* =========================
     RESET STUDY SESSION
     ========================= */

  resetSession(): Observable<{ reset: boolean }> {
    return this.http.post<{ reset: boolean }>(
      `${this.baseUrl}/reset/`,
      {}
    );
  }

  /* =========================
     PENDING WORDS
     ========================= */

  getPending(type:string | undefined): Observable<PendingResponse> {
    return this.http.post<PendingResponse>(`${this.baseUrl}/pending/`,{type:type});
  }

  /* =========================
     MARK AS MASTERED
     ========================= */

  submitMark(wordIds: number[]): Observable<{
    count: number;
    mastered: string[];
    skipped_ids: number[];
  }> {
    return this.http.post<{
      count: number;
      mastered: string[];
      skipped_ids: number[];
    }>(`${this.baseUrl}/mark/`, {
      word_ids: wordIds
    });
  }

  /* =========================
     Compare audio
     ========================= */

compareAudio(
  userAudio: Blob,
  word_id: number
): Observable<{
  score: number;
  correct: boolean;
}> {

  const formData = new FormData();

  // 🔹 Blob → File (clave para Django)
  const file = userAudio instanceof File
    ? userAudio
    : new File([userAudio], 'audio.webm', { type: 'audio/webm' });

  formData.append('audio', file);
  formData.append('word_id', word_id.toString());

  return this.http.post<{
    score: number;
    correct: boolean;
  }>(
    `${this.baseUrl}/compare/`,
    formData
  );
}

  /* =========================
     Recover
     ========================= */

  recoverStage(type: string | null): Observable<recoverResponse> {
    return this.http.post<recoverResponse>(`${this.baseUrl}/recover/`,{type:type});
  }

  getGeneral(): Observable<SummaryResponse[]> {
    return this.http.get<SummaryResponse[]>(
      `${this.baseUrl}/general/`
    );
  }

  normalizeAudioUrl(path: string): string {
    console.log(path)
    if (path.startsWith('http')) return path;
    return `${this.url}${path}`;
  }

}
