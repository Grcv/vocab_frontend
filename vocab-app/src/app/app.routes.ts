// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'vocabulary', loadComponent: () => import('./pages/vocabulary-list/vocabulary-list').then(m => m.VocabularyList) },
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
  { path: 'progress' , loadComponent: () => import('./pages/progress/progress').then(m => m.Progress) },
  { path: 'help' , loadComponent: () => import('./pages/help/help').then(m => m.Help) },
  { path: '**', redirectTo: '/dashboard' }
];