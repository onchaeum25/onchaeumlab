import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  MessageSquare, 
  Image as ImageIcon, 
  Star, 
  HelpCircle,
  Users,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: '대시보드', href: '/admin/dashboard', icon: BarChart3 },
    { name: '문의 내역', href: '/admin/inquiries', icon: MessageSquare },
    { name: '포트폴리오', href: '/admin/portfolios', icon: ImageIcon },
    { name: '리뷰 관리', href: '/admin/reviews', icon: Star },
    { name: 'FAQ 관리', href: '/admin/faqs', icon: HelpCircle },
  ];

  // 총관리자일 경우 계정 관리 메뉴 추가
  if (user?.isSuper) {
    navItems.push({ name: '계정 관리', href: '/admin/users', icon: Users });
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <img src="/logo-black.png" alt="Logo" className="h-6" />
          <span className="font-bold text-sm text-gray-400 tracking-wider">ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">
          Management
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-point text-white shadow-md shadow-point/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 w-full transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
