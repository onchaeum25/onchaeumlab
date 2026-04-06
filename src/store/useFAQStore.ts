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
          question: '제작 기간은 보통 얼마나 걸리나요?',
          answer: '프로젝트 규모와 요구사항에 따라 다르지만, 일반적인 기업 홈페이지의 경우 기획부터 디자인, 개발, 오픈까지 약 4~6주 정도 소요됩니다. 쇼핑몰이나 복잡한 기능이 포함된 경우 일정이 추가될 수 있습니다.',
          order: 0
        },
        {
          id: '2',
          category: '기타',
          question: '유지보수도 해주시나요?',
          answer: '네, 사이트 오픈 후 1년간 기본적인 버그 수정 및 안정화에 대한 무상 유지보수를 지원합니다. 이후에는 별도의 유지보수 계약을 통해 지속적인 관리와 업데이트를 제공해 드립니다.',
          order: 1
        },
        {
          id: '3',
          category: '서비스',
          question: '제작 비용은 어떻게 산정되나요?',
          answer: '제작 비용은 필요한 페이지 수, 디자인 퀄리티, 추가 기능(결제, 다국어 등)에 따라 맞춤 산정됩니다. 프로젝트 문의를 통해 대략적인 요구사항을 남겨주시면 상세한 견적을 안내해 드립니다.',
          order: 2
        },
        {
          id: '4',
          category: '포트폴리오',
          question: '디자인 수정은 몇 번까지 가능한가요?',
          answer: '기획 단계에서 와이어프레임을 확정하고, 메인 시안 작업 시 충분한 협의를 거칩니다. 기본적으로 시안 단계에서 2~3회의 수정 과정을 포함하여 고객님이 만족하실 수 있는 결과물을 도출합니다.',
          order: 3
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
