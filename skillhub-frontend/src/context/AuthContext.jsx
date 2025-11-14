import { createContext, useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { setAuthLogout } from '../api/axios';

// LocalStorage keys
const TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // Initialize from localStorage (safe parsing)
  const [token, setToken] = useState(() => {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage in sync when token/user change
  useEffect(() => {
    try {
      if (token) {
        window.localStorage.setItem(TOKEN_KEY, token);
      } else {
        window.localStorage.removeItem(TOKEN_KEY);
      }
    } catch {}
  }, [token]);

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(USER_KEY);
      }
    } catch {}
  }, [user]);

  const login = useCallback((newToken, userData) => {
    setToken(newToken || null);
    setUser(userData || null);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    // User-initiated logout toast (auto-logout may redirect before showing)
    try { toast.success('Logged out successfully'); } catch {}
  }, []);

  // Register a global logout hook for axios 401/403 handling
  useEffect(() => {
    const handler = () => {
      logout();
      if (typeof window !== 'undefined') {
        const path = window.location?.pathname || '';
        if (path !== '/login') window.location.replace('/login');
      }
    };
    setAuthLogout(handler);
    return () => setAuthLogout(null);
  }, [logout]);

  const value = useMemo(() => ({ token, user, login, logout }), [token, user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  // Lazy import to avoid extra dependency in consumer files
  return useContext(AuthContext);
}

export default AuthProvider;
