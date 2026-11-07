type CsrfToken = {
  headerName: string;
  token: string;
};

export const apiFetch = async (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  const method = (options.method ?? 'GET').toUpperCase();

  const headers = new Headers(options.headers);

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const csrfResponse = await fetch('/api/auth/csrf');

    if (!csrfResponse.ok) {
      throw new Error('Unable to initialize security token');
    }

    const csrf: CsrfToken = await csrfResponse.json();
    headers.set(csrf.headerName, csrf.token);
  }

  return fetch(`/api${path}`, {
    ...options,
    method,
    headers,
    credentials: 'same-origin',
  });
};
