import { useMutation } from '@tanstack/react-query';
import type { AuthState } from '@/types/user/user.ts';

type APIError =
  | { type: 'network'; message: string }
  | { type: 'invalid_data'; message: string }
  | { type: 'storage'; message: string };

const simulateError = (auth?: AuthState) => {
  if (Math.random() < 0.1) throw { type: 'network', message: 'Network error' };
  if (!auth || typeof auth !== 'object') throw { type: 'invalid_data', message: 'Invalid auth data' };
  if (Math.random() < 0.05) throw { type: 'storage', message: 'Storage unavailable' };
};

let mockStorage: { auth?: AuthState & { expiresAt: number } } = {};

export function useSetAuthStateMock() {
  return useMutation<AuthState, APIError, AuthState>({
    mutationFn: async (auth: AuthState) => {
      simulateError(auth);
      await new Promise(res => setTimeout(res, 100)); // эмуляция задержки
      mockStorage.auth = { ...auth, expiresAt: Date.now() + 30_000 };
      return auth;
    }
  });
}