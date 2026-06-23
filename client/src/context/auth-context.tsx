// src/context/auth-context.tsx
import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  username: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const getPayload = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const payload = token ? getPayload(token) : null;

  const [username, setUsername] = useState<string | null>(
    payload?.username ?? null
  );
  const [role, setRole] = useState<string | null>(payload?.role ?? null);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const payload = getPayload(token);
    setUsername(payload?.username);
    setRole(payload?.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth skal bruges inden i AuthProvider');
  return context;
};
