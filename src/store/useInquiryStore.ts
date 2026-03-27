import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  budget: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface InquiryState {
  inquiries: Inquiry[];
  isLoading: boolean;
  fetchInquiries: () => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'is_read' | 'created_at'>) => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  deleteInquiry: (id: number) => Promise<void>;
}

export const useInquiryStore = create<InquiryState>((set) => ({
  inquiries: [],
  isLoading: false,

  fetchInquiries: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedData = data.map((item: any) => ({
        ...item,
        is_read: item.is_read // 필드명 확인
      }));
      
      set({ inquiries: mappedData, isLoading: false });
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      set({ isLoading: false });
    }
  },

  addInquiry: async (newInquiry) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([newInquiry]);

      if (error) throw error;
      // 추가 후 다시 불러오거나 로컬 상태에 수동 추가
    } catch (err) {
      console.error('Error adding inquiry:', err);
      throw err;
    }
  },

  markAsRead: async (id) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        inquiries: state.inquiries.map((inq) =>
          inq.id === id ? { ...inq, is_read: true } : inq
        ),
      }));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  },

  deleteInquiry: async (id) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        inquiries: state.inquiries.filter((inq) => inq.id !== id),
      }));
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  },
}));
