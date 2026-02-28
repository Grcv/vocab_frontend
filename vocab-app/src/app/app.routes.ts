// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'vocabulary', loadComponent: () => import('./pages/vocabulary/vocabulary').then(m => m.Vocabulary) },
  { path: 'verbs', loadComponent: () => import('./pages/verbs/verbs').then(m => m.Verbs) },
  { path: 'contractions', loadComponent: () => import('./pages/contractions/contractions').then(m => m.Contractions) },
  { path: 'connected-speech', loadComponent: () => import('./pages/connected-speech/connected-speech').then(m => m.ConnectedSpeech) },
  { path: 'idioms', loadComponent: () => import('./pages/idioms/idioms').then(m => m.Idioms) },
  { path: 'listening', loadComponent: () => import('./pages/listening/listening').then(m => m.Listening) },
  { path: 'phrasal_verbs', loadComponent: () => import('./pages/phrasal-verbs/phrasal-verbs').then(m => m.PhrasalVerbs) },
  { path: 'vocabulary_settings', loadComponent: () => import('./pages/tab-vocabulary/tab-vocabulary').then(m => m.TabVocabulary) },
  { path: 'exercises', loadComponent: () => import('./pages/exercises/exercises').then(m => m.Exercises) },
  { path: 'pronunciation', loadComponent: () => import('./pages/pronunciation/pronunciation').then(m => m.Pronunciation) },
  { path: 'sound', loadComponent: () => import('./views/sound-breakdown/sound-breakdown').then(m => m.SoundBreakdown) },
  { path: 'grammar', loadComponent: () => import('./pages/grammar/grammar').then(m => m.Grammar) },
  { path: 'home' , loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'login' , loadComponent: () => import('./pages/auth/login/login').then(m => m.Login) },
  { path: 'landing' , loadComponent: () => import('./layouts/landing/landing').then(m => m.Landing) },
  { path: 'get-started' , loadComponent: () => import('./layouts/get-started/get-started').then(m => m.GetStarted) },
  { path: 'register' , loadComponent: () => import('./layouts/register/register').then(m => m.Register) },
  { path: 'settings' , loadComponent: () => import('./pages/settings/settings').then(m => m.Settings) },
  { path: 'progress' , loadComponent: () => import('./pages/tab-progress/tab-progress').then(m => m.TabProgress) },
  { path: 'help' , loadComponent: () => import('./pages/help/help').then(m => m.Help) },
  { path: '**', redirectTo: '/dashboard' }
];