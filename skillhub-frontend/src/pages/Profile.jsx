import { motion } from 'framer-motion';
import { 
  HiUser, 
  HiMail, 
  HiShieldCheck, 
  HiCalendar, 
  HiClock,
  HiAcademicCap,
  HiLogout,
  HiPencil
} from 'react-icons/hi';
// Removed FiCheckCircle import (corner badge is text-only now)
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    const name = user?.username || user?.name || user?.displayName || 'U';
    return name.substring(0, 2).toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Role badge color
  const getRoleBadgeColor = (role) => {
    const r = role?.toUpperCase?.() || '';
    if (r.includes('ADMIN')) return 'bg-linear-to-r from-purple-500 to-pink-500 text-white';
    if (r.includes('STUDENT')) return 'bg-linear-to-r from-teal-500 to-cyan-500 text-white';
    return 'bg-linear-to-r from-slate-500 to-slate-600 text-white';
  };

  // UI-only role display mapping
  const getDisplayRole = (role) => {
    if (!role) return 'User';
    const r = String(role).toUpperCase();
    if (r.includes('ADMIN')) return 'Admin';
    if (r.includes('STUDENT')) return 'User';
    // Title-case fallback
    return String(role).charAt(0).toUpperCase() + String(role).slice(1).toLowerCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/20 to-cyan-50/30 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Profile Header Card */}
        <motion.div
          variants={itemVariants}
          className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-8"
        >
          {user?.verified === true && (
            <span className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-green-400/20 backdrop-blur-md border border-green-400/30 text-green-600 text-xs font-semibold tracking-wide shadow-sm">
              Verified
            </span>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {getInitials()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg" />
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {user?.username || user?.name || user?.displayName || 'User'}
              </h1>
              <p className="text-slate-600 mb-3 flex items-center justify-center sm:justify-start gap-2">
                <HiMail className="w-4 h-4" />
                {user?.email || 'No email'}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md">
                <HiShieldCheck className="w-5 h-5" />
                <span className={`font-semibold px-3 py-1 rounded-full ${getRoleBadgeColor(user?.role)}`}>
                  {getDisplayRole(user?.role)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl shadow-md border border-slate-200/50 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
                <HiUser className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-medium text-slate-500">Username</h3>
            </div>
            <p className="text-xl font-semibold text-slate-800 ml-13">
              {user?.username || 'N/A'}
            </p>
          </motion.div>

          {/* Email Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl shadow-md border border-slate-200/50 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md">
                <HiMail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-medium text-slate-500">Email Address</h3>
            </div>
            <p className="text-xl font-semibold text-slate-800 ml-13 break-all">
              {user?.email || 'N/A'}
            </p>
          </motion.div>

          {/* Display Name Card */}
          {user?.displayName && (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white/80 backdrop-blur-xl rounded-xl shadow-md border border-slate-200/50 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                  <HiUser className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-medium text-slate-500">Display Name</h3>
              </div>
              <p className="text-xl font-semibold text-slate-800 ml-13">
                {user.displayName}
              </p>
            </motion.div>
          )}

          {/* Role Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl shadow-md border border-slate-200/50 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <HiShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-medium text-slate-500">Account Role</h3>
            </div>
            <p className="text-xl font-semibold text-slate-800 ml-13">
              {getDisplayRole(user?.role)}
            </p>
          </motion.div>
        </div>

        {/* Activity Summary (Static UI Placeholders) */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <HiAcademicCap className="w-6 h-6 text-teal-500" />
            Account Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Account Created */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-linear-to-br from-blue-50 to-indigo-50/50 rounded-xl border border-blue-200/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <HiCalendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Account Created</span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {formatDate(user?.createdAt || user?.created_at || user?.createdOn)}
              </p>
            </motion.div>

            {/* Last Login */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-linear-to-br from-teal-50 to-cyan-50/50 rounded-xl border border-teal-200/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <HiClock className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">Last Login</span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {formatDate(user?.lastLogin || new Date())}
              </p>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-linear-to-br from-purple-50 to-pink-50/50 rounded-xl border border-purple-200/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <HiAcademicCap className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Public Projects</span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                0 <span className="text-sm text-slate-500">projects</span>
              </p>
            </motion.div>

            {/* Account Status */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-linear-to-br from-green-50 to-emerald-50/50 rounded-xl border border-green-200/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <HiShieldCheck className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Status</span>
              </div>
              <p className="text-lg font-semibold text-green-700">
                {user?.verified ? '✓ Verified' : 'Active'}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Actions Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Account Actions</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Edit Profile Button (Placeholder) */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 text-slate-400 rounded-xl font-semibold cursor-not-allowed opacity-60"
            >
              <HiPencil className="w-5 h-5" />
              Edit Profile (Coming Soon)
            </motion.button>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <HiLogout className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Raw Data Section (Developer View) */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-900 text-green-400 rounded-2xl shadow-lg border border-slate-700 p-6 overflow-hidden"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Raw User Data (Developer View)
          </h2>
          <pre className="text-sm overflow-auto max-h-64 font-mono">
            {JSON.stringify(user, null, 2)}
          </pre>
        </motion.div>
      </div>
    </motion.div>
  );
}
