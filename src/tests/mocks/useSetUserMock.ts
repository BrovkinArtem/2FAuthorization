import { useMutation } from '@tanstack/react-query';
import type { User } from '@/types/user/user.ts';

type APIError =
  | { type: 'network'; message: string }
  | { type: 'invalid_data'; message: string }
  | { type: 'storage'; message: string };

const simulateError = (user?: User) => {
  if (Math.random() < 0.1) throw { type: 'network', message: 'Network error' };
  if (!user?.email || !user?.password) throw { type: 'invalid_data', message: 'Invalid user data' };
  if (Math.random() < 0.05) throw { type: 'storage', message: 'Storage unavailable' };
};

export function useSetUserMock() {
  return useMutation<User, APIError, User>({
    mutationFn: async (user: User) => {
      simulateError(user);
      await new Promise(res => setTimeout(res, 100)); // эмуляция задержки
      // Можно эмулировать запись в localStorage, если нужно:
      // localStorage.setItem('APP_USER', btoa(JSON.stringify(user)));
      return user;
    }
  });
}