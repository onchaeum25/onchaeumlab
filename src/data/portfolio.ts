export type Category = '전체' | '랜딩페이지' | '기업&사업' | '쇼핑몰' | 'UX/UI디자인';

export interface PortfolioItem {
  id: number;
  title: string;
  category: Category;
  shortDesc: string;
  desc: string;
  thumbnail: string;
  detailImage: string[];
  siteUrl?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "연구소 플랫폼 '리플로우'",
    category: "UX/UI디자인",
    shortDesc: "#랜딩페이지 #피그마 #아임웹 #3주소요",
    desc: "<p>#랜딩페이지&nbsp;&nbsp;#피그마&nbsp;&nbsp;#아임웹&nbsp;&nbsp;#3주소요</p><p></p><p>REPLOW는&nbsp;연구실안에서&nbsp;이루어지는&nbsp;연구관련&nbsp;모든것을&nbsp;관리하는&nbsp;플랫폼이며,</p>",
    thumbnail: "https://zaqndogbhyqzacldykem.supabase.co/storage/v1/object/public/portfolios/uploads/kh0ictqn38k-1774621433457.jpg",
    detailImage: ["https://zaqndogbhyqzacldykem.supabase.co/storage/v1/object/public/portfolios/uploads/qsi547odtua-1774621437592.jpg"]
  },
  {
    id: 2,
    title: "글로벌 패션 브랜드 '오르'",
    category: "랜딩페이지",
    shortDesc: "#패션 #반응형 #쇼핑몰 #4주소요",
    desc: "글로벌 패션 브랜드의 아이덴티티를 살린 감각적인 쇼핑몰",
    thumbnail: "https://picsum.photos/seed/corporate/600/400",
    detailImage: ["https://picsum.photos/seed/corporate/1200/1600"]
  },
  {
    id: 3,
    title: "친환경 리빙 숍 '어스파사'",
    category: "쇼핑몰",
    shortDesc: "#친환경 #감성 #아임웹 #3주소요",
    desc: "자연 친화적인 소재의 제품을 소개하는 따뜻한 분위기의 숍",
    thumbnail: "https://picsum.photos/seed/fashion/600/400",
    detailImage: ["https://picsum.photos/seed/fashion/1200/1600"]
  },
  {
    id: 4,
    title: "AI 매칭 시스템 '커넥트'",
    category: "UX/UI디자인",
    shortDesc: "#AI #매칭 #앱디자인 #5주소요",
    desc: "개인 맞춤형 AI 추천 엔진을 탑재한 업무 협업 플랫폼",
    thumbnail: "https://picsum.photos/seed/smartphone/600/400",
    detailImage: ["https://picsum.photos/seed/smartphone/1200/1600"]
  },
  {
    id: 5,
    title: "테크 스타트업 '엔진'",
    category: "랜딩페이지",
    shortDesc: "#테크 #심플 #랜딩페이지 #2주소요",
    desc: "복잡한 기술을 직관적인 UI로 풀어낸 홍보용 랜딩페이지",
    thumbnail: "https://picsum.photos/seed/education/600/400",
    detailImage: ["https://picsum.photos/seed/education/1200/1600"]
  },
  {
    id: 6,
    title: "건축 사무소 '공간'",
    category: "기업&사업",
    shortDesc: "#건축 #포트폴리오 #반응형 #4주소요",
    desc: "건축가의 철학이 담긴 프로젝트들을 미니멀하게 보여주는 사이트",
    thumbnail: "https://picsum.photos/seed/cafe/600/400",
    detailImage: ["https://picsum.photos/seed/cafe/1200/1600"]
  }
];

export const categories: Category[] = ['전체', '랜딩페이지', '기업&사업', '쇼핑몰', 'UX/UI디자인', '기타'];
