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

export interface FlowSettings {
  user: string;
  lesson?: boolean;
  meaning?: boolean;
  audio_recognition?: boolean;
  audio_discrimination?: boolean;
  pronunciation: boolean;
  spelling: boolean;
  lesson_pronunciation?: boolean;
  meaning_phoneme?: boolean;
  audio_recognition_phoneme?: boolean;
  lesson_listening?: boolean;
  lesson_grammar?: boolean;
  lesson_present?: boolean;
  lesson_past?: boolean;
  lesson_past_participle?: boolean;
  meaning_present?: boolean;
  meaning_past?: boolean;
  meaning_past_participle?: boolean;
  audio_recognition_present?: boolean;
  audio_recognition_past?: boolean;
  audio_recognition_past_participle?: boolean;
  audio_discrimination_present?: boolean;
  audio_discrimination_past?: boolean;
  audio_discrimination_past_participle?: boolean;
}

export interface Form {
  email: string;
  topic: string ;
  subtopic: string ;
  message: string ;
}

/* =========================
   SERVICE
   ========================= */

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly authBaseUrl = '/api/auth';

  constructor(private http: HttpClient) {}



  /* =========================
     USER SETTINGS
     ========================= */

  getUserSettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(
      `${this.authBaseUrl}/get_user_settings`
    );
  }

  getFlowSettings(type: string): Observable<FlowSettings> {
    return this.http.post<FlowSettings>(
      `${this.authBaseUrl}/get_flow_settings`,
      { type: type }
    );
  }

  updateFlowSettings(type: string,settings: Partial<FlowSettings>): Observable<FlowSettings> {
    return this.http.post<FlowSettings>(
      `${this.authBaseUrl}/update_profile`,
      settings
    );
  }

  updateProfile(settings: Partial<UserSettings>): Observable<UserSettings> {
    return this.http.post<UserSettings>(
      `${this.authBaseUrl}/update_profile`,
      settings
    );
  }

  updatePremium(status: boolean) {
    return this.http.post<UserSettings>(
      `${this.authBaseUrl}/update_premium`,
      { status: status }
    );
  }

  support(form:Form){
    return this.http.post(
      `${this.authBaseUrl}/support`,
      { form }
    );    
  }



}
