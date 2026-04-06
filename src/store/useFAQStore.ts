import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
}

interface FAQState {
  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, updated: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (newOrder: FAQItem[]) => void;
}

export const useFAQStore = create<FAQState>()(
  persist(
    (set) => ({
      faqs: [
        {
          id: '1',
          category: '서비스',
          question: '회원가입은 어떻게 하나요?',
          answer: '서비스 이용을 위해 회원가입이 필요합니다. 상단 메뉴에서 클릭 후 가입 진행해 주세요.',
          order: 0
        },
        {
          id: '2',
          category: '결제',
          question: '결제 방법이 궁금합니다.',
          answer: '신용카드, 계좌이체 등 다양한 결제 수단을 지원하고 있습니다.',
          order: 1
        }
      ],
      addFAQ: (faq) => set((state) => ({
        faqs: [...state.faqs, { ...faq, id: Date.now().toString() }].sort((a, b) => a.order - b.order)
      })),
      updateFAQ: (id, updated) => set((state) => ({
        faqs: state.faqs.map((f) => f.id === id ? { ...f, ...updated } : f)
      })),
      deleteFAQ: (id) => set((state) => ({
        faqs: state.faqs.filter((f) => f.id !== id)
      })),
      reorderFAQs: (newOrder) => set({ faqs: newOrder })
    }),
    {
      name: 'faq-storage'
    }
  )
);
