import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordData, SentenceAnalysisData, EssayFeedback } from '../services/geminiService';

export interface SavedWord extends WordData {
  weight: number;
}

interface StoreState {
  favorites: Record<string, SavedWord>;
  lastSearch: { query: string; results: WordData[] } | null;
  lastSentenceAnalysis: { query: string; result: SentenceAnalysisData[] | null } | null;
  lastEssayGrader: { prompt: string; essay: string; feedback: EssayFeedback | null } | null;
  flashcardState: {
    deck: SavedWord[];
    currentIndex: number;
    isFlipped: boolean;
    isReviewing: boolean;
    reviewLimit: number | 'all';
  };
  addFavorite: (wordData: WordData) => void;
  removeFavorite: (word: string) => void;
  updateWeight: (word: string, delta: number) => void;
  updateFavoriteData: (word: string, data: Partial<WordData>) => void;
  setLastSearch: (query: string, results: WordData[]) => void;
  setLastSentenceAnalysis: (query: string, result: SentenceAnalysisData[] | null) => void;
  setLastEssayGrader: (prompt: string, essay: string, feedback: EssayFeedback | null) => void;
  setFlashcardState: (state: Partial<StoreState['flashcardState']>) => void;
  needsKeySelection: boolean;
  setNeedsKeySelection: (needs: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      favorites: {},
      lastSearch: null,
      lastSentenceAnalysis: null,
      lastEssayGrader: null,
      flashcardState: {
        deck: [],
        currentIndex: 0,
        isFlipped: false,
        isReviewing: false,
        reviewLimit: 20,
      },
      addFavorite: (wordData) => set((state) => ({
        favorites: { ...state.favorites, [wordData.word]: { ...wordData, weight: 0 } }
      })),
      removeFavorite: (word) => set((state) => {
        const newFavs = { ...state.favorites };
        delete newFavs[word];
        return { favorites: newFavs };
      }),
      updateWeight: (word, delta) => set((state) => ({
        favorites: {
          ...state.favorites,
          [word]: { ...state.favorites[word], weight: state.favorites[word].weight + delta }
        }
      })),
      updateFavoriteData: (word, data) => set((state) => ({
        favorites: {
          ...state.favorites,
          [word]: { ...state.favorites[word], ...data }
        }
      })),
      setLastSearch: (query, results) => set({ lastSearch: { query, results } }),
      setLastSentenceAnalysis: (query, result) => set({ lastSentenceAnalysis: { query, result } }),
      setLastEssayGrader: (prompt, essay, feedback) => set({ lastEssayGrader: { prompt, essay, feedback } }),
      setFlashcardState: (newState) => set((state) => ({
        flashcardState: { ...state.flashcardState, ...newState }
      })),
      needsKeySelection: false,
      setNeedsKeySelection: (needs) => set({ needsKeySelection: needs })
    }),
    { name: 'gre-store' }
  )
);
