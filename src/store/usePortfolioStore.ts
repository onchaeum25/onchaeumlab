import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { PortfolioItem } from '../data/portfolio';

interface PortfolioState {
  portfolios: PortfolioItem[];
  isLoading: boolean;
  fetchPortfolios: () => Promise<void>;
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
  updatePortfolio: (id: number, item: Partial<PortfolioItem>) => Promise<void>;
  deletePortfolio: (id: number) => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
  uploadImages: (files: File[]) => Promise<string[]>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  isLoading: false,

  fetchPortfolios: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedData = data.map((item: any) => ({
        ...item,
        detailImage: Array.isArray(item.detail_image) ? item.detail_image : (item.detail_image ? [item.detail_image] : []),
        siteUrl: item.site_url,
        shortDesc: item.short_desc || ''
      }));
      
      set({ portfolios: mappedData, isLoading: false });
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      set({ isLoading: false });
    }
  },

  addPortfolio: async (newItem) => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .insert([{
          title: newItem.title,
          short_desc: newItem.shortDesc,
          desc: newItem.desc,
          category: newItem.category,
          thumbnail: newItem.thumbnail,
          detail_image: newItem.detailImage,
          site_url: newItem.siteUrl
        }])
        .select();

      if (error) throw error;
      
      const mappedItem = {
        ...data[0],
        detailImage: Array.isArray(data[0].detail_image) ? data[0].detail_image : (data[0].detail_image ? [data[0].detail_image] : []),
        siteUrl: data[0].site_url,
        shortDesc: data[0].short_desc || ''
      };
      
      set((state) => ({
        portfolios: [mappedItem, ...state.portfolios]
      }));
    } catch (err) {
      console.error('Error adding portfolio:', err);
    }
  },

  updatePortfolio: async (id, updatedFields) => {
    try {
      const fields: any = { ...updatedFields };
      if (fields.detailImage !== undefined) {
        fields.detail_image = fields.detailImage;
        delete fields.detailImage;
      }
      if (fields.siteUrl !== undefined) {
        fields.site_url = fields.siteUrl;
        delete fields.siteUrl;
      }
      if (fields.shortDesc !== undefined) {
        fields.short_desc = fields.shortDesc;
        delete fields.shortDesc;
      }

      const { error } = await supabase
        .from('portfolios')
        .update(fields)
        .eq('id', id);

      if (error) throw error;
      
      set((state) => ({
        portfolios: state.portfolios.map(item => 
          item.id === id ? { ...item, ...updatedFields } : item
        )
      }));
    } catch (err) {
      console.error('Error updating portfolio:', err);
    }
  },

  deletePortfolio: async (id) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set((state) => ({
        portfolios: state.portfolios.filter(item => item.id !== id)
      }));
    } catch (err) {
      console.error('Error deleting portfolio:', err);
    }
  },

  uploadImage: async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolios')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolios')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  },

  uploadImages: async (files) => {
    const uploadPromises = files.map(file => get().uploadImage(file));
    const urls = await Promise.all(uploadPromises);
    return urls.filter((url): url is string => url !== null);
  }
}));
