import { describe, expect, it, vi } from 'vitest';
import useUserSummary from '../hooks/useUserSummary';
import { render, screen } from '@testing-library/react';
import UserSummary from './UserSummary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { server } from '../test/server';
import { delay, http, HttpResponse } from 'msw';

const API_URL = '*/api/user-summary';

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <UserSummary />
    </QueryClientProvider>
  );
};

describe('UserSummary', () => {
  it('displays summary values', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json({
          totalUsers: 100,
          engineering: 50,
          marketing: 30,
          design: 20,
        });
      })
    );

    renderComponent();

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(await screen.findByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('displays loading skeletons', () => {
    server.use(
      http.get(API_URL, async () => {
        await delay('infinite');
        return HttpResponse.json({});
      })
    );

    const { container } = renderComponent();

    expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(4);
  });

  it('displays error message', async () => {
    server.use(
      http.get(API_URL, () => new HttpResponse(null, { status: 500 }))
    );

    renderComponent();

    expect(
      await screen.findByText('Failed to load user summary')
    ).toBeInTheDocument();
  });
});
