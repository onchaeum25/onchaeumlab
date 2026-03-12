export type PortfolioCategory = '랜딩페이지' | '기업' | '쇼핑몰';

export interface PortfolioItem {
  id: number;
  title: string;
  category: PortfolioCategory;
  image: string;
  description: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "A기업 랜딩페이지",
    category: "랜딩페이지",
    image: "./img/portfolio-1.jpg",
    description: "전환율을 높이는 직관적인 UI/UX 랜딩페이지"
  },
  {
    id: 2,
    title: "B스타트업 공식 홈페이지",
    category: "기업",
    image: "./img/portfolio-2.jpg",
    description: "신뢰감을 주는 모던한 기업 웹사이트"
  },
  {
    id: 3,
    title: "C브랜드 쇼핑몰",
    category: "쇼핑몰",
    image: "./img/portfolio-3.jpg",
    description: "사용자 친화적인 커머스 플랫폼"
  },
  {
    id: 4,
    title: "D서비스 프로모션",
    category: "랜딩페이지",
    image: "./img/portfolio-4.jpg",
    description: "이벤트 참여를 유도하는 인터랙티브 페이지"
  },
  {
    id: 5,
    title: "E글로벌 기업 사이트",
    category: "기업",
    image: "./img/portfolio-5.jpg",
    description: "다국어 지원 및 글로벌 스탠다드 적용"
  },
  {
    id: 6,
    title: "F패션 쇼핑몰",
    category: "쇼핑몰",
    image: "./img/portfolio-6.jpg",
    description: "트렌디한 감각의 패션 특화 쇼핑몰"
  }
];
