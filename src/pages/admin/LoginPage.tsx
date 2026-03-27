import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center">
          <img src="/logo-black.png" alt="Logo" className="h-8 mb-6" />
          <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            관리자 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            허가된 관계자만 접근할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-point/20 focus:border-point transition-all placeholder:text-gray-400 font-medium outline-none"
                  placeholder="admin@onchaeumlab.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 px-4 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-point/20 focus:border-point transition-all placeholder:text-gray-400 font-medium outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-point focus:ring-point border-gray-300 rounded accent-point"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer user-select-none">
                  로그인 상태 유지
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-point hover:text-[#1a1b66] transition-colors">
                  비밀번호 찾기
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-point/20 text-sm font-bold text-white bg-point hover:bg-[#1a1b66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-point transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // For now, redirect to dashboard manually (Will be connected to Supabase Auth)
                  window.location.href = '/admin/dashboard';
                }}
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
