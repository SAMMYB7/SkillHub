import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { sendOtp, verifyOtp } from '../api/userService';
import { HiMail, HiShieldCheck, HiRefresh, HiArrowLeft } from 'react-icons/hi';

// Assumption: After successful verification user is redirected to login page to authenticate.
// (If you prefer auto-login + redirect to dashboard, adjust the navigate target.)

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0); // seconds remaining for resend

  // Simple cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const isOtpValid = /^[0-9]{6}$/.test(otp);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isOtpValid) {
      setError('Please enter a valid 6-digit code.');
      try { toast.error('Invalid OTP format'); } catch {}
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await verifyOtp(email, otp);
      try { toast.success('Email verified! You can now sign in.'); } catch {}
      navigate('/login', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Verification failed.';
      setError(msg);
      try { toast.error(msg); } catch {}
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || !email) return;
    setResending(true);
    setError('');
    try {
      await sendOtp(email);
      try { toast.success('OTP sent to your email.'); } catch {}
      setCooldown(30); // 30s cooldown
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Failed to resend OTP.';
      setError(msg);
      try { toast.error(msg); } catch {}
    } finally {
      setResending(false);
    }
  }, [email, cooldown]);

  useEffect(() => {
    // Auto-resend on first mount if no OTP has been explicitly triggered and we have email
    // You can remove this if backend already sends OTP after registration.
    // We'll keep it passive; only trigger if needed.
  }, []);

  if (!email) {
    return (
      <motion.div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 px-4">
        <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
          <p className="text-slate-700 mb-4">Missing email address. Please register again.</p>
          <Link to="/register" className="text-teal-600 font-medium hover:text-teal-700">Go to Registration</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 px-4 py-12"
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

        <motion.div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10" />

          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-cyan-600 mb-2"
            >
              Verify Email
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-sm"
            >
              Enter the 6-digit code sent to <span className="font-medium text-teal-600">{email}</span>
            </motion.p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6" aria-busy={submitting}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]*"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 rounded-xl text-slate-700 focus:outline-none transition-all duration-300 ${
                    otp && !isOtpValid
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100'
                  }`}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  autoComplete="one-time-code"
                  disabled={submitting}
                  required
                />
              </div>
              <AnimatePresence>
                {otp && !isOtpValid && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  >
                    Code must be exactly 6 digits.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

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

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={submitting || !isOtpValid}
              className="w-full relative bg-linear-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3.5 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              whileHover={{ scale: submitting || !isOtpValid ? 1 : 1.02 }}
              whileTap={{ scale: submitting || !isOtpValid ? 1 : 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitting && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                )}
                {submitting ? 'Verifying...' : 'Verify Email'}
              </span>
            </motion.button>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleResend}
              disabled={resending || cooldown > 0}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {resending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-teal-300 border-t-teal-600 rounded-full"
                />
              ) : (
                <HiRefresh className="w-4 h-4" />
              )}
              {cooldown > 0 ? `Resend (${cooldown}s)` : 'Resend Code'}
            </button>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <HiShieldCheck className="text-teal-500" /> Secure verification
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Didn’t get the email? Check your spam folder or resend.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
