import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Inquiry } from '../pages/admin/InquiriesPage';

interface InquiryState {
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
}

// 초기 테스트용 더미 데이터
const initialInquiries: Inquiry[] = [
  {
    id: 'INQ-INITIAL-1',
    name: '(주)스타트업컴퍼니',
    email: 'contact@startup.com',
    phone: '010-1234-5678',
    budget: '100-200',
    service: 'landing',
    message: '새로오픈하는 앱 서비스의 랜딩페이지 의뢰합니다. 소개 및 다운로드 유도 버튼이 잘 보여야 합니다.',
    createdAt: '2023-10-25 14:30',
    isRead: false,
  },
  {
    id: 'INQ-INITIAL-2',
    name: '김메디컬',
    email: 'kmedical@hospital.co.kr',
    phone: '010-9876-5432',
    budget: '300이상',
    service: 'corporate',
    message: '병원 공식 홈페이지 리뉴얼 건입니다. 다크모드가 있으면 좋겠습니다.',
    createdAt: '2023-10-24 09:15',
    isRead: true,
  }
];

export const useInquiryStore = create<InquiryState>()(
  persist(
    (set) => ({
      inquiries: initialInquiries,
      
      addInquiry: (newInquiry) => set((state) => ({
        inquiries: [
          {
            ...newInquiry,
            id: 'INQ-' + Date.now(),
            createdAt: new Date().toLocaleString('ko-KR', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            }).replace(/\. /g, '-').replace(/\./g, ''),
            isRead: false
          },
          ...state.inquiries
        ]
      })),

      markAsRead: (id) => set((state) => ({
        inquiries: state.inquiries.map(inq => 
          inq.id === id ? { ...inq, isRead: true } : inq
        )
      }))
    }),
    {
      name: 'inquiry-storage', // localStorage에 저장될 키 이름
    }
  )
);
