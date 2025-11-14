import axios from 'axios';

// Resolve base URL from Vite env (strip trailing slashes to avoid double //)
const rawBaseUrl = import.meta.env.VITE_API_GATEWAY_URL || '';
const baseURL = typeof rawBaseUrl === 'string' ? rawBaseUrl.replace(/\/+$/, '') : '';

// Helper to safely read a JWT from localStorage (common keys tried)
function getStoredToken() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const candidateKeys = ['jwt', 'token', 'accessToken', 'authToken'];
    for (const key of candidateKeys) {
      const v = window.localStorage.getItem(key);
      if (v && typeof v === 'string' && v.trim()) return v.trim();
    }
    return null;
  } catch {
    return null;
  }
}

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Optional Auth logout hook that can be provided by the app (AuthContext)
let authLogoutHandler = null;
export function setAuthLogout(handler) {
  authLogoutHandler = typeof handler === 'function' ? handler : null;
}

// Attach Authorization: Bearer <token> if present
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      // Don't override if caller explicitly set Authorization
      const hasAuth = config.headers && 'Authorization' in config.headers;
      if (!hasAuth) {
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Log errors cleanly while letting callers handle them
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response, message } = error || {};
    const method = (config?.method || 'GET').toUpperCase();
    const url = config?.url || baseURL || '';

    if (response) {
      const { status, data } = response;
      const msg = (data && (data.message || data.error)) || message || 'Request failed';
      // Keep logs concise but informative
      console.error(`[API ${method} ${url}] ${status}: ${msg}`, {
        status,
        // Log a compact snapshot of data if it's an object/array
        data: typeof data === 'object' ? { ...data, ...(data?.stack ? { stack: 'omitted' } : {}) } : data,
      });

      // Gracefully handle unauthorized responses by delegating to AuthContext if available
      if (status === 401 || status === 403) {
        try {
          if (authLogoutHandler) authLogoutHandler();
        } catch (e) {
          console.error('Auth logout handler failed:', e);
        }
      }
    } else {
      console.error(`[API ${method} ${url}] Network error: ${message || 'Unknown error'}`);
    }

    return Promise.reject(error);
  }
);

export default api;
