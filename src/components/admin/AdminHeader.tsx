import { useState, useRef, useEffect } from 'react';
import { Bell, Search, UserCircle, X, ChevronRight, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useInquiryStore } from '../../store/useInquiryStore';

export default function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { inquiries } = useInquiryStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 알림창 밖을 클릭하면 닫히게 하는 로직
  const notificationRef = useRef<HTMLDivElement>(null);

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 미확인 문의 필터링 (임의로 최근 5개 표시)
  const recentInquiries = inquiries.slice(0, 5);
  const hasNotifications = inquiries.length > 0;

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
        {/* 검색창 */}
        <div className="relative hidden md:block group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-point transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-64 bg-gray-50 border-none rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-point/20 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-gray-200 pl-6 h-6">
          {/* 알림 버튼 및 레이어 컴포넌트 생략(기존 동일) */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <Bell size={20} />
              {/* 알림 있으면 빨강, 없으면 초록 */}
              <span className={`absolute top-1 right-2 w-2 h-2 rounded-full border border-white ${hasNotifications ? 'bg-red-500' : 'bg-green-500'}`}></span>
            </button>

            {/* 알림 레이어 */}
            <AnimatePresence>
              {showNotifications && hasNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-800">새로운 알림</span>
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">NEW {inquiries.length}</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {recentInquiries.map((inquiry) => (
                      <div 
                        key={inquiry.id}
                        onClick={() => {
                          navigate('/admin/inquiries');
                          setShowNotifications(false);
                        }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <MessageSquareIcon size={14} className="text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{inquiry.name}님의 새로운 문의</p>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{inquiry.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{new Date(inquiry.created_at).toLocaleString()}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-300 self-center" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      navigate('/admin/inquiries');
                      setShowNotifications(false);
                    }}
                    className="w-full py-3 bg-gray-50 text-gray-500 text-xs font-bold hover:bg-gray-100 transition-colors"
                  >
                    전체 보기
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* 프로필 및 수정 모달 */}
          <div 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-point flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={20} />
              )}
            </div>
            <span className="text-sm font-semibold text-gray-700">관리자님</span>
          </div>
        </div>
      </div>

      {/* 개인정보 수정 모달 */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* 파일 입력 필드 (숨김) */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">개인정보 수정</h2>
                  <button 
                    onClick={() => setShowProfileModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="w-24 h-24 rounded-full bg-point flex items-center justify-center text-white shadow-xl overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle size={56} />
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm font-bold text-point hover:underline"
                    >
                      프로필 사진 변경
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">관리자 성함</label>
                      <input 
                        type="text" 
                        defaultValue="관리자" 
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-point/20 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">이메일 계정</label>
                      <input 
                        type="email" 
                        defaultValue="admin@onchaeumlab.co.kr" 
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-point/20 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">비밀번호 변경</label>
                      <input 
                        type="password" 
                        placeholder="새 비밀번호 입력"
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-point/20 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setShowProfileModal(false)}
                      className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                    >
                      취소
                    </button>
                    <button 
                      onClick={() => {
                        alert('개인정보가 성공적으로 수정되었습니다.');
                        setShowProfileModal(false);
                      }}
                      className="flex-1 py-4 bg-point text-white font-bold rounded-2xl shadow-lg shadow-point/30 hover:bg-point/90 transition-all flex items-center justify-center gap-2"
                    >
                      <Check size={18} />
                      저장하기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

// 아이콘 헬퍼 (Lucide에는 Mail인데 여기선 메시지로 사용)
function MessageSquareIcon({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 21 1.9-1.9a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}
