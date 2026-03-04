import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordData } from '../services/geminiService';

export interface SavedWord extends WordData {
  weight: number;
}

interface StoreState {
  favorites: Record<string, SavedWord>;
  addFavorite: (wordData: WordData) => void;
  removeFavorite: (word: string) => void;
  updateWeight: (word: string, delta: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      favorites: {},
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
      }))
    }),
    { name: 'gre-store' }
  )
);
