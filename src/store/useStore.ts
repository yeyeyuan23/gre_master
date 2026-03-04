import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordData } from '../services/geminiService';

export interface SavedWord extends WordData {
  weight: number;
}

interface StoreState {
  favorites: Record<string, SavedWord>;
  lastSearch: { query: string; result: WordData | null } | null;
  addFavorite: (wordData: WordData) => void;
  removeFavorite: (word: string) => void;
  updateWeight: (word: string, delta: number) => void;
  setLastSearch: (query: string, result: WordData | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      favorites: {},
      lastSearch: null,
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
      setLastSearch: (query, result) => set({ lastSearch: { query, result } })
    }),
    { name: 'gre-store' }
  )
);
