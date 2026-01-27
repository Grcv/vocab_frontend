// user-progress.model.ts
export class UserProgress {
  constructor(
    public userId: string = 'default-user',
    public learnedWords: number[] = [],
    public completedExercises: number[] = [],
    public currentLevel: number = 1,
    public totalScore: number = 0,
    public streakDays: number = 0,
    public lastActivity: Date = new Date(),
    public achievements: string[] = []
  ) {}
}