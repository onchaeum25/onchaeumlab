import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden text-gray-900 font-sans">
      {/* 🔹 왼쪽 고정 사이드바 */}
      <AdminSidebar />
      
      {/* 🔹 오른쪽 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] relative z-0">
        <AdminHeader />
        
        {/* 컨텐츠 스크롤 영역 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full p-8 custom-admin-scroll">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
