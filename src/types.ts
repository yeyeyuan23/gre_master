export interface WordData {
  word: string;
  pronunciation: string;
  chineseMeaning: string;
  englishMeaning: string;
  collocations: string[];
  sentences: { english: string; chinese: string }[];
}

export interface EssayFeedback {
  score: number;
  sentenceReviews: {
    original: string;
    critique: string;
    revised: string;
  }[];
  revisedEssay: string;
  summary: string[];
}
