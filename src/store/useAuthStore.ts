import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (id: string, pw: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (id, pw) => {
        // 실제 운영 환경에서는 서버 API와 연동해야 함 (현재는 테스트용 고정 계정)
        if (id === 'admin' && pw === 'admin1234') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);
