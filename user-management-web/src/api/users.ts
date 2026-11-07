import type { UserFormValues } from '../schemas/user';
import type { UsersResponse } from '../types/user';
import ApiError from './ApiError';
import { apiFetch } from './apiFetch';

type UserParams = {
  search: string;
  role: string;
  team: string;
  page: number;
  size: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
};

type UpdateUserParams = {
  id: number;
  values: UserFormValues;
};

export const getUsers = async (params: UserParams) => {
  const query = new URLSearchParams({
    name: params.search,
    role: params.role,
    team: params.team,
    page: String(params.page),
    size: String(params.size),
    sort: `${params.sortBy},${params.sortDirection}`,
  });

  const response = await apiFetch(`/users?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: UsersResponse = await response.json();

  return {
    users: data._embedded?.users ?? [],
    totalElements: data.page.totalElements,
  };
};

export const createUser = async (user: UserFormValues) => {
  const response = await apiFetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new ApiError(
      response.status,
      error?.code,
      error?.message ?? 'Failed to create user'
    );
  }
};

export const updateUser = async ({ id, values }: UpdateUserParams) => {
  const response = await apiFetch(`/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new ApiError(
      response.status,
      error?.code,
      error?.message ?? 'Failed to update user'
    );
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await apiFetch(`/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user (${response.status})`);
  }
};
