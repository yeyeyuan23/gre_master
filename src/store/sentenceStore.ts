import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SentenceAnalysisData } from '../services/geminiService';

export interface SavedSentence {
  id: string;
  sentence: string;
  result: SentenceAnalysisData;
  date: string;
}

interface SentenceStore {
  savedSentences: SavedSentence[];
  saveSentence: (sentenceData: Omit<SavedSentence, 'id' | 'date'>) => void;
  deleteSentence: (id: string) => void;
}

export const useSentenceStore = create<SentenceStore>()(
  persist(
    (set) => ({
      savedSentences: [],
      saveSentence: (sentenceData) =>
        set((state) => ({
          savedSentences: [
            {
              ...sentenceData,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
            ...state.savedSentences,
          ],
        })),
      deleteSentence: (id) =>
        set((state) => ({
          savedSentences: state.savedSentences.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'gre-saved-sentences',
    }
  )
);
