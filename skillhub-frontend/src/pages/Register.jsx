import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiUser, HiMail, HiLockClosed, HiUserCircle } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { register as registerApi } from '../api/userService';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ username: false, displayName: false, email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Validation matching RegisterDto requirements
  const isUsernameValid = useMemo(() => {
    if (!username) return false;
    // Allow letters, numbers, underscore, dot, hyphen; 3-30 chars
    return /^[A-Za-z0-9._-]{3,30}$/.test(username);
  }, [username]);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /.+@.+\..+/.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => {
    return password && password.length >= 6; // keep minimal length; backend only requires non-blank
  }, [password]);

  const usernameInvalid = submitted || touched.username ? !isUsernameValid : false;
  const emailInvalid = submitted || touched.email ? !isEmailValid : false;
  const passwordInvalid = submitted || touched.password ? !isPasswordValid : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError('');
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      setLoading(false);
      setError('Please fix the highlighted fields and try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      try { toast.error('Please fix the highlighted fields and try again.'); } catch {}
      return;
    }
    try {
      // Backend expects RegisterDto: { username, email, password, displayName? }
      await registerApi({ username, email, password, displayName: displayName || undefined });
      // After successful registration we require email verification before login.
      try { toast.success('Account created! Please verify your email.'); } catch {}
      navigate(`/verify-email?email=${encodeURIComponent(email)}`, { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      const backendMsg = err?.response?.data?.message || err?.response?.data?.error;
      let friendly = 'Registration failed. Please try again.';
      if (status === 409) {
        friendly = backendMsg || 'An account with this email or username already exists.';
      } else if (status === 400) {
        friendly = backendMsg || 'Invalid input. Please review your entries.';
      } else if (!err?.response) {
        friendly = 'Network error. Please check your connection and try again.';
      } else if (backendMsg) {
        friendly = backendMsg;
      }
      setError(friendly);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      try { toast.error(friendly); } catch {}
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-8 transition-colors duration-200"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiArrowLeft className="text-xl" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        {/* Glassmorphic Card */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden"
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-cyan-600 mb-2"
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-sm"
            >
              Join SkillHub and start your journey
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10" />
                <input
                  type="text"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 rounded-xl text-slate-700 focus:outline-none transition-all duration-300 ${
                    usernameInvalid
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                  }`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                  aria-invalid={usernameInvalid}
                  disabled={loading}
                  required
                />
              </div>
              <AnimatePresence>
                {usernameInvalid && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  >
                    Username must be 3-30 characters (letters, numbers, . _ -)
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="relative"
            >
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10" />
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 rounded-xl text-slate-700 focus:outline-none transition-all duration-300 ${
                    emailInvalid
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                  }`}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={emailInvalid}
                  autoComplete="email"
                  disabled={loading}
                  required
                />
              </div>
              <AnimatePresence>
                {emailInvalid && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Display Name Field (Optional) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="relative">
                <HiUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300"
                  placeholder="Display Name (Optional)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, displayName: true }))}
                  disabled={loading}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="relative"
            >
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10" />
                <input
                  type="password"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 rounded-xl text-slate-700 focus:outline-none transition-all duration-300 ${
                    passwordInvalid
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  aria-invalid={passwordInvalid}
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />
              </div>
              <AnimatePresence>
                {passwordInvalid && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  >
                    Password must be at least 6 characters
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={loading}
              className="w-full relative bg-linear-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </span>
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-6 text-sm text-slate-600"
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200"
            >
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
