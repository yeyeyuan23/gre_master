import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EssayFeedback } from '../types';

export interface SavedEssay {
  id: string;
  prompt: string;
  essay: string;
  feedback: EssayFeedback;
  date: string;
}

interface EssayStore {
  savedEssays: SavedEssay[];
  saveEssay: (essay: Omit<SavedEssay, 'id' | 'date'>) => void;
  deleteEssay: (id: string) => void;
}

export const useEssayStore = create<EssayStore>()(
  persist(
    (set) => ({
      savedEssays: [],
      saveEssay: (essayData) =>
        set((state) => ({
          savedEssays: [
            {
              ...essayData,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
            ...state.savedEssays,
          ],
        })),
      deleteEssay: (id) =>
        set((state) => ({
          savedEssays: state.savedEssays.filter((e) => e.id !== id),
        })),
    }),
    {
      name: 'gre-saved-essays',
    }
  )
);
