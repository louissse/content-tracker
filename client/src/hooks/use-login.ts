// src/hooks/use-login.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/auth-context';

const loginRequest = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Forkert brugernavn eller password');

  return response.json();
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ token }) => {
      login(token);
      navigate({ to: '/' });
    },
  });
};
