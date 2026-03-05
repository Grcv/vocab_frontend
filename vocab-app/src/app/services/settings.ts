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
