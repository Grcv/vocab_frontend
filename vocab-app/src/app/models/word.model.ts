export class Word {
  constructor(
    public id: number,
    public english: string,
    public spanish: string,
    public category: string,
    public difficulty: 'easy' | 'medium' | 'hard',
    public imageUrl: string,
    public audioUrl?: string,
    public phonetic?: string,
    public learned: boolean = false,
    public examples: string[] = [],
    public lastPracticed?: Date
  ) {}
}


