// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard] },
  { path: 'vocabulary', loadComponent: () => import('./pages/vocabulary/vocabulary').then(m => m.Vocabulary), canActivate: [authGuard] },
  { path: 'verbs', loadComponent: () => import('./pages/verbs/verbs').then(m => m.Verbs) , canActivate: [authGuard]},
  { path: 'contractions', loadComponent: () => import('./pages/contractions/contractions').then(m => m.Contractions) , canActivate: [authGuard]},
  { path: 'connected-speech', loadComponent: () => import('./pages/connected-speech/connected-speech').then(m => m.ConnectedSpeech), canActivate: [authGuard] },
  { path: 'idioms', loadComponent: () => import('./pages/idioms/idioms').then(m => m.Idioms), canActivate: [authGuard] },
  { path: 'listening', loadComponent: () => import('./pages/listening/listening').then(m => m.Listening), canActivate: [authGuard] },
  { path: 'phrasal_verbs', loadComponent: () => import('./pages/phrasal-verbs/phrasal-verbs').then(m => m.PhrasalVerbs), canActivate: [authGuard] },
  { path: 'vocabulary_settings', loadComponent: () => import('./pages/tab-vocabulary/tab-vocabulary').then(m => m.TabVocabulary), canActivate: [authGuard] },
  { path: 'exercises', loadComponent: () => import('./pages/exercises/exercises').then(m => m.Exercises) , canActivate: [authGuard]},
  { path: 'pronunciation', loadComponent: () => import('./pages/pronunciation/pronunciation').then(m => m.Pronunciation), canActivate: [authGuard] },
  { path: 'sound', loadComponent: () => import('./views/sound-breakdown/sound-breakdown').then(m => m.SoundBreakdown), canActivate: [authGuard] },
  { path: 'grammar', loadComponent: () => import('./pages/grammar/grammar').then(m => m.Grammar) , canActivate: [authGuard]},
  { path: 'home' , loadComponent: () => import('./pages/home/home').then(m => m.Home) , canActivate: [authGuard]}, 
  { path: 'settings' , loadComponent: () => import('./pages/settings/settings').then(m => m.Settings) , canActivate: [authGuard]},
  { path: 'progress' , loadComponent: () => import('./pages/tab-progress/tab-progress').then(m => m.TabProgress), canActivate: [authGuard] },
  { path: 'help' , loadComponent: () => import('./pages/help/help').then(m => m.Help), canActivate: [authGuard] },
  { path: 'conversation' , loadComponent: () => import('./pages/conversation/conversation').then(m => m.Conversation), canActivate: [authGuard] },


   /* 🔓 Rutas públicas */
  { path: 'login' , loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)},
  { path: 'landing' , loadComponent: () => import('./layouts/landing/landing').then(m => m.Landing) },
  { path: 'get-started' , loadComponent: () => import('./layouts/get-started/get-started').then(m => m.GetStarted) },
  { path: 'register' , loadComponent: () => import('./layouts/register/register').then(m => m.Register)},
  { path: 'recover-password' , loadComponent: () => import('./pages/recover-password/recover-password').then(m => m.RecoverPassword) },
  { path: 'reset-password/:uid/:token' , loadComponent: () => import('./pages/reset-password/reset-password').then(m => m.ResetPassword) },
  { path: 'confirm-email/:uid/:token' , loadComponent: () => import('./pages/confirm-email/confirm-email').then(m => m.ConfirmEmail) },
  { path: '**', redirectTo: '/dashboard' }
];