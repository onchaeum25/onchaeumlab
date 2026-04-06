import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Briefcase, Star, HelpCircle } from 'lucide-react';
import { useInquiryStore } from '../../store/useInquiryStore';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useReviewStore } from '../../store/useReviewStore';
import { useFAQStore } from '../../store/useFAQStore';

export default function DashboardPage() {
  const { inquiries, fetchInquiries } = useInquiryStore();
  const { portfolios, fetchPortfolios } = usePortfolioStore();
  const { reviews, fetchReviews } = useReviewStore();
  const { faqs } = useFAQStore();

  useEffect(() => {
    // 페이지 진입 시 모든 데이터 갱신
    fetchInquiries();
    fetchPortfolios();
    fetchReviews();
  }, []);

  const stats = [
    { title: '전체 문의', count: inquiries.length, icon: <Mail className="text-blue-500" />, color: 'bg-blue-50' },
    { title: '포트폴리오', count: portfolios.length, icon: <Briefcase className="text-indigo-500" />, color: 'bg-indigo-50' },
    { title: '고객 리뷰', count: reviews.length, icon: <Star className="text-yellow-500" />, color: 'bg-yellow-50' },
    { title: 'FAQ 질문', count: faqs.length, icon: <HelpCircle className="text-green-500" />, color: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 mt-1">온채움랩 사이트의 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4"
          >
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 최근 현황 섹션 (필요시 추가 확장 가능) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 문의 내역</h2>
          <div className="space-y-4">
            {inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                <span className="font-medium text-gray-800">{inquiry.name}</span>
                <span className="text-gray-400">{new Date(inquiry.created_at).toLocaleDateString()}</span>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-gray-400 text-sm">최근 문의가 없습니다.</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">사이트 운영 안내</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• 현재 포트폴리오와 리뷰가 정상적으로 표시되고 있습니다.</p>
            <p>• 새로운 문의가 들어오면 '전체 문의' 수치가 업데이트됩니다.</p>
            <p>• FAQ는 관리자 페이지에서 상시 수정 가능합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
