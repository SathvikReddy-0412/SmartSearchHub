import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authApi from '../api/authApi';

const MOCK_USERS = [
  {
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password123',
    role: 'USER',
  },
  {
    name: 'Platform Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
  },
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      registeredUsers: MOCK_USERS,

      login: async (email, password) => {
        try {
          const res = await authApi.loginUser(email, password);
          const token = res?.token || res?.access_token;
          const user = res?.user || res;
          if (token) {
            localStorage.setItem('jwt_token', token);
            const cleanUser = {
              id: user.id || user._id || user.email,
              name: user.name || user.username,
              email: user.email,
              role: user.role || 'USER',
            };
            set({ isAuthenticated: true, user: cleanUser });
            return { success: true };
          }
          return { success: false, message: 'Invalid login response from backend' };
        } catch (error) {
          const message = error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Unable to login';
          return { success: false, message };
        }
      },

      register: async (userData) => {
        try {
          const res = await authApi.registerUser(userData);
          if (res?.message) {
            return { success: true, message: res.message };
          }
          return { success: true };
        } catch (error) {
          const message = error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Unable to register';
          return { success: false, message };
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('jwt_token');
      },

      checkAuth: () => {
        const token = localStorage.getItem('jwt_token');
        const { user } = get();
        if (token && user) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false, user: null });
        }
      },

      isAdmin: () => get().user?.role === 'ADMIN',
    }),
    {
      name: 'search-platform-auth',
      partialize: (state) => ({
        registeredUsers: state.registeredUsers,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
