export type User = {
  email: string;
  password: string;
};

export type AuthState = {
  requires2FA: boolean;
};