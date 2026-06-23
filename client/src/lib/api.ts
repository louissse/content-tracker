// src/lib/api.ts
const BASE_URL = 'http://localhost:3001';

const getToken = () => localStorage.getItem('token');

const api = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const apiGet = (url: string) => api(url);

export const apiPost = (url: string, body: unknown) =>
  api(url, { method: 'POST', body: JSON.stringify(body) });

export const apiPatch = (url: string, body: unknown) =>
  api(url, { method: 'PATCH', body: JSON.stringify(body) });

export const apiDelete = (url: string) => api(url, { method: 'DELETE' });
