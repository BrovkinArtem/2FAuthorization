import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/user/user.ts';

type APIError =
  | { type: 'network'; message: string }
  | { type: 'storage'; message: string }
  | { type: 'invalid_data'; message: string }
  | { type: 'not_found'; message: string };

const mockStorage: { user?: User } = {};

const simulateError = () => {
  if (Math.random() < 0.1) throw { type: 'network', message: 'Network error' };
  if (Math.random() < 0.05) throw { type: 'storage', message: 'Storage unavailable' };
};

export function useGetUserMock() {
  return useQuery<User | null, APIError>({
    queryKey: ['getUser'],
    queryFn: async () => {
      simulateError();
      await new Promise(res => setTimeout(res, 100)); // эмуляция задержки
      if (!mockStorage.user) throw { type: 'not_found', message: 'User not found' };
      if (typeof mockStorage.user !== 'object') throw { type: 'invalid_data', message: 'Invalid user data' };
      return mockStorage.user;
    }
  });
}