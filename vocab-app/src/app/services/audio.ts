import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AudioService {

  private unlocked = false;

  unlockAudio(): Promise<void> {
    if (this.unlocked) return Promise.resolve();

    const audio = new Audio(
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
    );

    audio.volume = 0;

    return audio.play()
      .then(() => {
        this.unlocked = true;
      })
      .catch(() => {});
  }

  play(url: string) {
    const audio = new Audio(url);
    audio.play().catch(err => console.warn(err));
  }
}