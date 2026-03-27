import { useEffect } from 'react';
import { Users, Code, MessageSquare, PlusCircle, Loader2, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useInquiryStore } from '../../store/useInquiryStore';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { inquiries, fetchInquiries, isLoading: isInquiryLoading } = useInquiryStore();
  const { portfolios, fetchPortfolios, isLoading: isPortfolioLoading } = usePortfolioStore();
  
  useEffect(() => {
    fetchInquiries();
    fetchPortfolios();
  }, [fetchInquiries, fetchPortfolios]);

  const stats = [
    { label: '총 문의 수', value: inquiries.length.toString(), icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: '확인 안 된 문의', value: inquiries.filter(inq => !inq.is_read).length.toString(), icon: PlusCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: '포트폴리오', value: portfolios.length.toString(), icon: Code, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '등록된 리뷰', value: '28', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const isLoading = isInquiryLoading || isPortfolioLoading;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Overview</h2>
          <p className="text-gray-500 text-sm">관리자 대시보드 요약 정보입니다.</p>
        </div>
        <button className="bg-point text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-[#1a1b66] transition-colors flex items-center gap-2">
          <span>보고서 다운로드</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center gap-5 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => {
                if(stat.label.includes('문의')) navigate('/admin/inquiries');
                if(stat.label.includes('포트폴리오')) navigate('/admin/portfolios');
              }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.bg}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                {isLoading ? <Loader2 className="animate-spin text-gray-300 h-8 w-8" /> : (
                  <h3 className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</h3>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900 border-b-2 border-point pb-1">최근 접수된 문의</h3>
            <Link to="/admin/inquiries" className="text-sm text-point font-medium hover:underline">전체보기</Link>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-point" size={32} />
              </div>
            ) : inquiries.slice(0, 4).map((inquiry) => (
              <div 
                key={inquiry.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group"
                onClick={() => navigate('/admin/inquiries')}
              >
                <div className="truncate pr-4 w-[75%]">
                  <h4 className="font-bold text-sm text-gray-800 truncate block group-hover:text-point transition-colors">
                    {inquiry.name} <span className="font-normal text-xs text-gray-400">({inquiry.service})</span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 truncate block">{inquiry.message}</p>
                </div>
                <div className="text-xs font-medium text-gray-400 shrink-0 text-right">
                  {inquiry.created_at?.split('T')[0] || 'Date'}<br />
                  <span className={`${inquiry.is_read ? 'text-gray-400' : 'text-point font-extrabold'}`}>{inquiry.is_read ? '읽음' : 'New'}</span>
                </div>
              </div>
            ))}
            {!isLoading && inquiries.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-20 bg-gray-50 rounded-2xl">최근 접수된 문의가 없습니다.</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
          <div className="flex justify-between items-center w-full mb-6">
            <h3 className="font-bold text-lg text-gray-900">시스템 정보</h3>
            <span className="text-xs text-green-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live Server
            </span>
          </div>
          <div className="w-full grow bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8">
            <BarChart3 className="text-gray-200 mb-2" size={48} />
            <p className="text-gray-400 text-sm font-medium">실시간 트래픽 분석 연동 예정</p>
            <p className="text-[11px] text-gray-300 mt-1">Google Analytics 연동 시 여기에 노출됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
