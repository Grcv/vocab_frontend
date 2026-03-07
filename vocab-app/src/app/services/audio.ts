// audio.service.ts
export class AudioService {

  private unlocked = false;

  unlockAudio() {
    if (this.unlocked) return;

    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEA'; 
    audio.play().catch(() => {});

    this.unlocked = true;
  }

  play(url: string) {
    const audio = new Audio(url);
    audio.play().catch(err => console.warn(err));
  }
}