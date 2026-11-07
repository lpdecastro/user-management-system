import type { UserSummary } from '../types/userSummary';

export const getUserSummary = async (): Promise<UserSummary> => {
  const response = await fetch('/api/user-summary');

  if (!response.ok) {
    throw new Error('Failed to fetch user summary');
  }

  return response.json();
};
