import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =========================
   MODELOS
   ========================= */

export interface UserSettings {
  user_name: string;
  cefr: string | null;
  premium: boolean;
  playback_speed: number;
  audio_autoplay?: boolean;
}

export interface SummaryResponse {
  user_name: string;
  cefr: string;
  total: number;
  learned: number;
  pending: number;
  by_stage: Record<string, number>;
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
  private readonly authBaseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  /* =========================
     NEXT EXERCISE
     ========================= */

  getNextExercise(): Observable<NextExerciseResponse> {
    return this.http.get<NextExerciseResponse>(`${this.baseUrl}/next/`);
  }

  /* =========================
     SUBMIT ANSWER
     ========================= */

  submitAnswer(wordId: number, correct: boolean): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/answer/`, {
      word_id: wordId,
      correct
    });
  }

  /* =========================
     SUMMARY
     ========================= */

  getSummary(): Observable<SummaryResponse> {
    return this.http.get<SummaryResponse>(`${this.baseUrl}/summary/`);
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

  getPending(): Observable<{
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
    }[];
  }> {
    return this.http.get<{
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
      }[];
    }>(`${this.baseUrl}/pending/`);
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
     USER SETTINGS
     ========================= */

  getUserSettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(
      `${this.authBaseUrl}/get_user_settings`
    );
  }

  updateProfile(settings: Partial<UserSettings>): Observable<UserSettings> {
    return this.http.post<UserSettings>(
      `${this.authBaseUrl}/update_profile`,
      settings
    );
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

}
