import type { User, AuthState } from "@/types/user/user.ts";

const USER_KEY = "APP_USER";
const AUTH_KEY = "APP_AUTH";

export const setUser = (user: User) => {
  const data = JSON.stringify(user);
  const encrypted = btoa(data);
  localStorage.setItem(USER_KEY, encrypted);
};

export const getUser = (): User | null => {
  const encrypted = localStorage.getItem(USER_KEY);
  if (!encrypted) return null;
  try {
    return JSON.parse(atob(encrypted));
  } catch {
    return null;
  }
};

export const setAuthState = (auth: AuthState) => {
  const data = {
    ...auth,
    expiresAt: Date.now() + 30 * 1000, // 30 секунд
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuthState = (): AuthState | null => {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) return null;
    const { expiresAt, ...authState } = parsed;
    return authState;
  } catch {
    return null;
  }
};

export const getAuthStateWithExpiry = (): (AuthState & { expiresAt: number }) | null => {
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) return null;
    return parsed;
  } catch {
    return null;
  }
};
