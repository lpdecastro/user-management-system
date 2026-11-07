import type { User } from '../types/user';
import type { UsersTableProps } from './UsersTable';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UsersTable from './UsersTable';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    team: 'Engineering',
  },
];

const defaultProps: UsersTableProps = {
  users: mockUsers,
  totalElements: 1,
  isPending: false,
  isError: false,
  page: 0,
  rowsPerPage: 10,
  sortBy: 'id',
  sortDirection: 'asc' as const,
  onSort: vi.fn(),
  onPageChange: vi.fn(),
  onRowsPerPageChange: vi.fn(),
  onEdit: vi.fn(),
  onDelete: vi.fn(),
};

describe('UsersTable', () => {
  it('renders users correctly', () => {
    render(<UsersTable {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
});
