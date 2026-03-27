export type Category = '전체' | '랜딩페이지' | '기업&사업' | '쇼핑몰' | 'UX/UI디자인';

export interface PortfolioItem {
  id: number;
  title: string;
  category: Category;
  desc: string;
  thumbnail: string;
  detailImage: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Premium Brand Identity",
    category: "UX/UI디자인",
    desc: "브랜드의 가치를 극대화하는 고감도 디자인 시스템 구축",
    thumbnail: "https://picsum.photos/seed/branding/600/400",
    detailImage: "https://picsum.photos/seed/branding/1200/1600"
  },
  {
    id: 2,
    title: "Corporate Landing Page",
    category: "랜딩페이지",
    desc: "기업의 핵심 메시지를 전달하는 랜딩페이지 제작",
    thumbnail: "https://picsum.photos/seed/corporate/600/400",
    detailImage: "https://picsum.photos/seed/corporate/1200/1600"
  },
  {
    id: 3,
    title: "Luxury Shopping Mall",
    category: "쇼핑몰",
    desc: "프리미엄 브랜드를 위한 온라인 쇼핑 경험 설계",
    thumbnail: "https://picsum.photos/seed/fashion/600/400",
    detailImage: "https://picsum.photos/seed/fashion/1200/1600"
  },
  {
    id: 4,
    title: "D앱 서비스 UX/UI 리뉴얼",
    category: "UX/UI디자인",
    desc: "사용자 경험을 최우선으로 고려한 모바일 앱 리뉴얼",
    thumbnail: "https://picsum.photos/seed/smartphone/600/400",
    detailImage: "https://picsum.photos/seed/smartphone/1200/1600"
  },
  {
    id: 5,
    title: "E교육 플랫폼 랜딩페이지",
    category: "랜딩페이지",
    desc: "전환율을 높이는 전략적인 교육 플랫폼 랜딩페이지",
    thumbnail: "https://picsum.photos/seed/education/600/400",
    detailImage: "https://picsum.photos/seed/education/1200/1600"
  },
  {
    id: 6,
    title: "F프랜차이즈 기업 홈페이지",
    category: "기업&사업",
    desc: "신뢰감을 주는 프랜차이즈 공식 웹사이트 구축",
    thumbnail: "https://picsum.photos/seed/cafe/600/400",
    detailImage: "https://picsum.photos/seed/cafe/1200/1600"
  }
];

export const categories: Category[] = ['전체', '랜딩페이지', '기업&사업', '쇼핑몰', 'UX/UI디자인'];
