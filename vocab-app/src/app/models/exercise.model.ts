// exercise.model.ts
export class Exercise {
  constructor(
    public id: number,
    public type: 'image-match' | 'audio-match' | 'translation' | 'spelling' | 'pronunciation',
    public title: string,
    public description: string,
    public words: number[],
    public completed: boolean = false,
    public score?: number,
    public lastAttempt?: Date
  ) {}
}