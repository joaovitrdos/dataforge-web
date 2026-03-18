import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  idUser: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;

const loadFromStorage = (): { token: string | null; user: User | null } => {
  try {
    const expiry = localStorage.getItem('df_expiry');
    if (expiry && Date.now() > Number(expiry)) {
      localStorage.removeItem('df_token');
      localStorage.removeItem('df_user');
      localStorage.removeItem('df_expiry');
      return { token: null, user: null };
    }
    const token = localStorage.getItem('df_token');
    const raw   = localStorage.getItem('df_user');
    const user  = raw ? (JSON.parse(raw) as User) : null;
    return token && user ? { token, user } : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => loadFromStorage().token);
  const [user,  setUser]  = useState<User | null>  (() => loadFromStorage().user);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('df_token',  newToken);
    localStorage.setItem('df_user',   JSON.stringify(newUser));
    localStorage.setItem('df_expiry', String(Date.now() + TEN_DAYS));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('df_token');
    localStorage.removeItem('df_user');
    localStorage.removeItem('df_expiry');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};