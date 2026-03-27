import { Bell, Search, UserCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AdminHeader() {
  const location = useLocation();

  // URL 경로에 따라 동적으로 타이틀 생성
  const getPageTitle = (pathname: string) => {
    if (pathname.includes('/dashboard')) return '대시보드';
    if (pathname.includes('/inquiries')) return '문의 내역 관리';
    if (pathname.includes('/portfolios')) return '포트폴리오 관리';
    if (pathname.includes('/reviews')) return '고객 리뷰 관리';
    if (pathname.includes('/faqs')) return 'FAQ 관리';
    return '관리자 페이지';
  };

  return (
    <header className="h-16 bg-white shrink-0 flex items-center justify-between px-8 border-b border-gray-100/50 shadow-sm z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-point transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-64 bg-gray-50 border-none rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-point/20 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-gray-200 pl-6 h-6">
          <button className="relative p-2 text-gray-400 hover:text-gray-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-point flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              <UserCircle size={20} />
            </div>
            <span className="text-sm font-semibold text-gray-700">관리자님</span>
          </div>
        </div>
      </div>
    </header>
  );
}
