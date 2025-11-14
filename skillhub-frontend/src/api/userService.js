import api from './axios';

// Contract:
// - All functions return response.data
// - Errors are not caught here; interceptors log and errors bubble to the caller

export async function register(data) {
  const { data: res } = await api.post('/api/users/register', data);
  return res;
}

export async function login(data) {
  const { data: res } = await api.post('/api/users/login', data);
  return res;
}

export async function getUserByEmail(email) {
  const safeEmail = encodeURIComponent(email);
  const { data: res } = await api.get(`/api/users/email/${safeEmail}`);
  return res;
}

export async function getUserById(id) {
  const { data: res } = await api.get(`/api/users/${encodeURIComponent(id)}`);
  return res;
}

export async function testProtected() {
  const { data: res } = await api.get('/api/users/test');
  return res;
}

// Send email OTP
export async function sendOtp(email) {
  const { data: res } = await api.post('/api/users/send-otp', { email });
  return res;
}

// Verify email OTP
export async function verifyOtp(email, otp) {
  const { data: res } = await api.post('/api/users/verify-otp', { email, otp });
  return res;
}

// Optional default export for convenience
export default {
  register,
  login,
  getUserByEmail,
  getUserById,
  testProtected,
  sendOtp,
  verifyOtp,
};
