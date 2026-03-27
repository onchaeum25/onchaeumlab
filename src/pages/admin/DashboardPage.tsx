import { Users, Code, MessageSquare, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useInquiryStore } from '../../store/useInquiryStore';

export default function DashboardPage() {
  const navigate = useNavigate();
  const inquiries = useInquiryStore((state) => state.inquiries);
  
  const stats = [
    { label: '총 문의 수', value: inquiries.length.toString(), icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: '오늘 새 문의', value: inquiries.filter(inq => !inq.isRead).length.toString(), icon: PlusCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: '포트폴리오', value: '12', icon: Code, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '등록된 리뷰', value: '28', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* 최고 상단 헤더 대신, 페이지 타이틀을 AdminHeader가 처리하므로 본문 내용만 입력 */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Overview</h2>
          <p className="text-gray-500 text-sm">관리자 대시보드 요약 정보입니다.</p>
        </div>
        <button className="bg-point text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-[#1a1b66] transition-colors flex items-center gap-2">
          <span>보고서 다운로드</span>
        </button>
      </div>

      {/* 통계 카드 4개 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center gap-5 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 최근 들어온 항목들 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* 최근 문의 영역 (실시간 데이터 연동) */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900 border-b-2 border-point pb-1">최근 접수된 문의</h3>
            <Link to="/admin/inquiries" className="text-sm text-point font-medium hover:underline">전체보기</Link>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {inquiries.slice(0, 3).map((inquiry) => (
              <div 
                key={inquiry.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate('/admin/inquiries')}
              >
                <div className="truncate pr-4 w-[75%]">
                  <h4 className="font-bold text-sm text-gray-800 truncate block">
                    {inquiry.name} <span className="font-normal text-xs text-gray-400">({inquiry.service})</span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 truncate block">{inquiry.message}</p>
                </div>
                <div className="text-xs font-medium text-gray-400 shrink-0 text-right">
                  {inquiry.createdAt.split(' ')[0]}<br />
                  <span className={`${inquiry.isRead ? 'text-gray-400' : 'text-point font-bold'}`}>{inquiry.isRead ? '열람됨' : '새 문의'}</span>
                </div>
              </div>
            ))}
            {inquiries.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-8">최근 접수된 문의가 없습니다.</div>
            )}
          </div>
        </div>

        {/* 간단한 통계 차트 영역 (더미) */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-gray-400 text-sm mb-4">월별 방문자 통계 예정 (Chart.js 등 연동)</div>
          <div className="w-full h-48 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-gray-300">
            [차트 영역]
          </div>
        </div>
      </div>
    </div>
  );
}
