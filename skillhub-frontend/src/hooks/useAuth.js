import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

// Custom hook that guarantees a valid context
export default function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx || typeof ctx.login !== 'function' || typeof ctx.logout !== 'function') {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const { token, user, login, logout } = ctx;
  return { token, user, login, logout };
}

export { useAuth };
