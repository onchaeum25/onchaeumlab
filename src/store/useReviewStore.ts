import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Review, ReviewInput } from '../data/review';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  fetchReviews: () => Promise<void>;
  addReview: (review: ReviewInput) => Promise<boolean>;
  updateReview: (id: number, updates: Partial<Review>) => Promise<boolean>;
  deleteReview: (id: number) => Promise<boolean>;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  isLoading: false,
  error: null,

  fetchReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      set({ reviews: data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addReview: async (review) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select();

      if (error) throw error;
      if (data) {
        set({ reviews: [data[0], ...get().reviews], isLoading: false });
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  updateReview: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      set({
        reviews: get().reviews.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        isLoading: false,
      });
      return true;
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  deleteReview: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      set({
        reviews: get().reviews.filter((r) => r.id !== id),
        isLoading: false,
      });
      return true;
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },
}));
