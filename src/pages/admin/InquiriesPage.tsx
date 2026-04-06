import { useState, useEffect } from 'react';
import { Eye, Search, Filter, Mail, Phone, Calendar, CheckCircle2, Circle, X, MessageSquare, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useInquiryStore, Inquiry } from '../../store/useInquiryStore';

// 서비스 코드 -> 읽기 쉬운 라벨 변환
const serviceMap: Record<string, string> = {
  landing: '랜딩&광고페이지',
  corporate: '기업&사업 홈페이지',
  shop: '쇼핑몰',
  uxui: 'UXUI 디자인협업',
  other: '기타'
};

const budgetMap: Record<string, string> = {
  '100이하': '100만원 이하',
  '100-200': '100만원 ~ 200만원',
  '200-300': '200만원 ~ 300만원',
  '300이상': '300만원 이상',
  '미정': '미정'
};

export default function InquiriesPage() {
  const { inquiries, isLoading, fetchInquiries, markAsRead, deleteInquiry } = useInquiryStore();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // 필터링 및 검색 로직
  const filteredInquiries = inquiries.filter(inq => {
    // 탭 필터링
    const matchesTab = 
      activeTab === 'all' ? true : 
      activeTab === 'unread' ? !inq.is_read : 
      inq.is_read;
    
    // 검색 필터링
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleInquirySelect = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.is_read) {
      markAsRead(inquiry.id);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm('이 문의 내역을 정말 삭제하시겠습니까?')) {
      await deleteInquiry(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-point transition-colors" />
            <input 
              type="text" 
              placeholder="이름, 이메일, 내용 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-point/20 focus:border-point transition-all font-medium"
            />
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shrink-0">
            <Filter size={16} />
            <span className="hidden sm:inline">필터링 적용됨</span>
          </div>
        </div>
        
        <div className="flex bg-gray-50 p-1 rounded-xl shrink-0 w-full md:w-auto overflow-x-auto">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all shrink-0 ${activeTab === 'all' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            전체보기
          </button>
          <button 
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all shrink-0 ${activeTab === 'unread' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            안 읽음
          </button>
          <button 
            onClick={() => setActiveTab('read')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all shrink-0 ${activeTab === 'read' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            읽음
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 uppercase text-xs font-bold text-gray-400 tracking-wider">
                <th className="p-4 pl-6 whitespace-nowrap">상태</th>
                <th className="p-4 whitespace-nowrap">이름/회사명</th>
                <th className="p-4 whitespace-nowrap">요청 서비스</th>
                <th className="p-4 whitespace-nowrap">예산</th>
                <th className="p-4 whitespace-nowrap">접수일시</th>
                <th className="p-4 pr-6 text-right whitespace-nowrap">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInquiries.map((inquiry) => (
                <tr 
                   key={inquiry.id} 
                   className={`hover:bg-gray-50/80 transition-colors group cursor-pointer ${!inquiry.is_read ? 'bg-indigo-50/20' : ''}`}
                   onClick={() => handleInquirySelect(inquiry)}
                >
                  <td className="p-4 pl-6">
                    <div className={`flex items-center gap-2 text-sm font-medium ${inquiry.is_read ? 'text-gray-400' : 'text-point'}`}>
                      {inquiry.is_read ? <CheckCircle2 size={16} /> : <Circle size={16} className="fill-point shadow-sm rounded-full" />}
                      {inquiry.is_read ? '열람됨' : '새 문의'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{inquiry.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{inquiry.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                      {serviceMap[inquiry.service] || inquiry.service}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-700">
                    {budgetMap[inquiry.budget] || inquiry.budget}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-point hover:bg-indigo-50 rounded-lg transition-colors inline-block"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInquirySelect(inquiry);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                        onClick={(e) => handleDelete(e, inquiry.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <Search size={40} className="opacity-20" />
                      <p className="text-sm font-medium uppercase tracking-wider">검색 결과가 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-sm text-gray-500 font-medium">총 {filteredInquiries.length}건의 문의내역</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-point text-white font-bold text-sm shadow-md">1</button>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedInquiry(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex px-3 py-1 rounded-full bg-point/10 text-point text-xs font-bold uppercase tracking-wider">
                      {serviceMap[selectedInquiry.service]}
                    </span>
                    <span className="text-sm text-gray-400 font-medium flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(selectedInquiry.created_at).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedInquiry.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 shadow-sm transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-admin-scroll flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">이메일</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedInquiry.email}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">연락처</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedInquiry.phone}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 sm:col-span-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm shrink-0">
                      <span className="font-bold text-lg text-gray-400">₩</span>
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">예산 정보</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{budgetMap[selectedInquiry.budget]}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare size={16} className="text-point" />
                    상세 문의 내용
                  </h4>
                  <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap border border-gray-100">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  닫기
                </button>
                <button 
                  className="px-6 py-2.5 rounded-xl bg-point text-white text-sm font-bold hover:bg-point/90 transition-colors shadow-lg shadow-point/20 flex items-center gap-2"
                >
                  <Mail size={16} />
                  답변 메일 보내기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
