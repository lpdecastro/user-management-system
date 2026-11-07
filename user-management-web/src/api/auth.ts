import type { LoginFormValues } from '../schemas/auth';
import { apiFetch } from './apiFetch';

type AuthUser = {
  email: string;
  role: string;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const response = await apiFetch('/auth/me');

  if (response.status === 401) return null;

  if (!response.ok) {
    throw new Error('Failed to check authentication');
  }

  return response.json();
};

export const login = async (values: LoginFormValues): Promise<AuthUser> => {
  const body = new URLSearchParams({
    username: values.email,
    password: values.password,
  });

  const response = await apiFetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid email or password');
    }

    throw new Error('Unable to sign in. Please try again.');
  }

  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unable to verify your session');
  }

  return user;
};

export const logout = async () => {
  const response = await apiFetch('/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to sign out');
  }
};
