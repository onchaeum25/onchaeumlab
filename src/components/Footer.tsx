export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-white/10 pb-16 gap-8">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-8">ONCHAEUM LAB</h2>
            <div className="space-y-2 text-sm text-gray-400 font-medium">
              <p><span className="text-gray-500 w-20 inline-block">ADDRESS</span> 서울특별시 강남구 테헤란로 123, 4층</p>
              <p><span className="text-gray-500 w-20 inline-block">TEL</span> 일반문의 : 010-900-3279 / 위탁문의 : 1855-0919</p>
              <p><span className="text-gray-500 w-20 inline-block">FAX</span> 02-123-4567</p>
              <p><span className="text-gray-500 w-20 inline-block">E-MAIL</span> ceo@onchaeumlab.co.kr</p>
            </div>
          </div>
          <div className="flex gap-4">
            {/* Placeholder for partner logos */}
            <div className="w-24 h-12 bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">PARTNER 1</div>
            <div className="w-24 h-12 bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">PARTNER 2</div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-medium">
          <p>&copy; ONCHAEUM LAB CO., LTD. ALL RIGHTS RESERVED. DESIGN BY ONCHAEUM</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LOGIN</a>
            <a href="#" className="text-white font-bold hover:text-gray-300 transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
