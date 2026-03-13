import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AudioService {

  private unlocked = false;

unlockAudio(): Promise<void> {
  if (this.unlocked) return Promise.resolve();

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const context = new AudioContextClass();

  return context.resume().then(() => {
    this.unlocked = true;
  });
}

  play(url: string) {
    const audio = new Audio(url);
    audio.play().catch(err => console.warn(err));
  }
}