import { useQuery } from '@tanstack/react-query';
import type { AuthState } from '@/types/user/user.ts';

type APIError =
  | { type: 'network'; message: string }
  | { type: 'storage'; message: string }
  | { type: 'expired'; message: string }
  | { type: 'invalid_data'; message: string }
  | { type: 'not_found'; message: string };

let mockStorage: { auth?: AuthState & { expiresAt?: number } } = {};

const simulateError = () => {
  if (Math.random() < 0.1) throw { type: 'network', message: 'Network error' };
  if (Math.random() < 0.05) throw { type: 'storage', message: 'Storage unavailable' };
};

export function useGetAuthStateMock() {
  return useQuery<AuthState | null, APIError>({
    queryKey: ['getAuthState'],
    queryFn: async () => {
      simulateError();
      await new Promise(res => setTimeout(res, 100)); // эмуляция задержки

      const auth = mockStorage.auth;
      if (!auth) throw { type: 'not_found', message: 'Auth not found' };
      if (typeof auth !== 'object') throw { type: 'invalid_data', message: 'Invalid auth data' };
      if (auth.expiresAt && Date.now() > auth.expiresAt) throw { type: 'expired', message: 'Session expired' };

      const { expiresAt, ...authState } = auth;
      return authState;
    }
  });
}