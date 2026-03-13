import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private unlocked = false;
  private audio = new Audio();
  private context!: AudioContext;

  unlockAudio(): Promise<void> {

    if (this.unlocked) return Promise.resolve();

    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;

    this.context = new AudioContextClass();

    return this.context.resume().then(() => {
      this.unlocked = true;
    });
  }

  play(url: string, volume = 1, rate = 1) {

    if (!this.unlocked) {
      console.warn("Audio no desbloqueado");
      return;
    }

    this.audio.src = url;
    this.audio.volume = volume;
    this.audio.playbackRate = rate;

    this.audio.onended = () => {
      console.log("Audio terminado");
    };

    this.audio.play().catch(err => {
      console.warn("Autoplay bloqueado", err);
    });
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}