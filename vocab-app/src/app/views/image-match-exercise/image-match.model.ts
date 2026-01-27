export interface ImageMatchQuestion {
  imageUrl: string;
  correctWord: string;
  options: string[];
}

export interface ImageMatchState {
  selected?: string;
  isCorrect: boolean;
}
