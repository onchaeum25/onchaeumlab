import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import InquiriesPage from './pages/admin/InquiriesPage';
import PortfoliosPage from './pages/admin/PortfoliosPage';
import ReviewsPage from './pages/admin/ReviewsPage';
import FaqPage from './pages/admin/FaqPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 일반 고객용 공개 랜딩 페이지 */}
        <Route path="/" element={<LandingPage />} />
        
        {/* 관리자 로그인 독립 페이지 */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* 보호된 관리자 내부 페이지들 (Layout 포함) */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* 기본 경로는 문의 내역으로 리다이렉트 (대시보드 대체) */}
          <Route index element={<Navigate to="/admin/inquiries" replace />} />
          
          {/* /admin/dashboard로 직접 들어오는 경우 처리 */}
          <Route path="dashboard" element={<Navigate to="/admin/inquiries" replace />} />
          
          {/* 연락처 팝업으로 들어온 문의 내역 관리 페이지 */}
          <Route path="inquiries" element={<InquiriesPage />} />
          
          {/* 포트폴리오 관리 페이지 */}
          <Route path="portfolios" element={<PortfoliosPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="faqs" element={<FaqPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
