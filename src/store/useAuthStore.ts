import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  password: string;
  isSuper?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[]; // 일반 관리자 계정 목록
  login: (id: string, pw: string) => boolean;
  logout: () => void;
  addUser: (newUser: User) => void;
  deleteUser: (id: string) => void;
}

// 총관리자 계정 설정
const SUPER_ADMIN: User = {
  id: 'admin',
  name: '총관리자',
  password: '3gmlwjd2!',
  isSuper: true
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      users: [], 
      login: (id, pw) => {
        // 1. 총관리자 체크
        if (id === SUPER_ADMIN.id && pw === SUPER_ADMIN.password) {
          set({ isAuthenticated: true, user: SUPER_ADMIN });
          return true;
        }

        // 2. 일반 관리자 목록에서 체크
        const { users } = get();
        const found = users.find(u => u.id === id && u.password === pw);
        if (found) {
          set({ isAuthenticated: true, user: found });
          return true;
        }

        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      addUser: (newUser) => set((state) => ({ 
        users: [...state.users, newUser] 
      })),
      deleteUser: (id) => set((state) => ({ 
        users: state.users.filter(u => u.id !== id) 
      })),
    }),
    {
      name: 'auth-storage-v2', // 버전 업그레이드
    }
  )
);
