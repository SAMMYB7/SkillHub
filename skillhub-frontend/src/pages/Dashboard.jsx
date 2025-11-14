import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiAcademicCap, 
  HiUserGroup, 
  HiChartBar, 
  HiCheckCircle,
  HiUsers,
  HiCog,
  HiTrendingUp,
  HiBookOpen,
  HiLightningBolt,
  HiCode,
  HiSparkles,
  HiShieldCheck,
  HiLightBulb,
  HiCollection,
  HiUserAdd
} from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import { testProtected } from '../api/userService';
import Footer from '../components/Footer';

export default function Dashboard() {
  const { user, logout } = useAuth();

  // Derive expected fields with safe fallbacks
  const { username, email, role, bio, createdAt, verified } = useMemo(() => {
    const username = user?.username ?? user?.name ?? user?.userName ?? 'Unknown';
    const email = user?.email ?? 'Unknown';
    const role = user?.role ?? (Array.isArray(user?.roles) ? user.roles[0] : undefined) ?? 'User';
    const bio = user?.bio ?? user?.about ?? null;
    const createdRaw = user?.createdAt ?? user?.created_at ?? user?.createdOn ?? user?.createdDate ?? null;

    let createdAt = '—';
    if (createdRaw) {
      try {
        const d = new Date(createdRaw);
        createdAt = isNaN(d.getTime()) ? String(createdRaw) : d.toLocaleString();
      } catch {
        createdAt = String(createdRaw);
      }
    }

    const verified = (user?.verified ?? user?.isVerified ?? user?.emailVerified ?? false) === true;

    return { username, email, role, bio, createdAt, verified };
  }, [user]);

  // Protected endpoint call on mount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [protectedMsg, setProtectedMsg] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let ignore = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await testProtected();
        const msg = typeof res === 'string' ? res : res?.message || 'Protected endpoint OK';
        if (!ignore) setProtectedMsg(msg);
      } catch (e) {
        if (!ignore) setError(e?.response?.data?.message || e?.message || 'Failed to reach protected endpoint');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [user]);

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

  // UI-only role display mapping
  const getDisplayRole = (r) => {
    if (!r) return 'User';
    const role = String(r).toUpperCase();
    if (role.includes('ADMIN')) return 'Admin';
    if (role.includes('STUDENT')) return 'User';
    return String(r).charAt(0).toUpperCase() + String(r).slice(1).toLowerCase();
  };

  // Logged-out hero section
  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/20 to-cyan-50/30">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 mx-auto max-w-6xl text-center"
            >
              {/* Icon Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-teal-500 to-cyan-500 mb-8 shadow-2xl shadow-teal-500/30"
              >
                <HiCode className="w-12 h-12 text-white" />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Build. Share. Grow.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-6 font-medium max-w-3xl mx-auto"
              >
                Your developer portfolio and community platform
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base sm:text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Showcase your projects, connect with developers, and build your professional presence. 
                Join a community-driven ecosystem built with modern cloud-native architecture.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              >
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-4 bg-linear-to-r from-teal-500 via-cyan-500 to-blue-500 text-white rounded-2xl font-semibold shadow-xl shadow-teal-500/30 overflow-hidden min-w-[200px]"
                  >
                    <span className="relative z-10">Sign In</span>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-4 bg-white text-teal-600 rounded-2xl font-semibold shadow-lg border-2 border-teal-200 hover:border-teal-300 hover:shadow-xl transition-all min-w-[200px]"
                  >
                    Create Account
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5 text-teal-500" />
                  <span>Free & Open</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiShieldCheck className="w-5 h-5 text-teal-500" />
                  <span>Secure by Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCode className="w-5 h-5 text-teal-500" />
                  <span>Developer First</span>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Feature Highlights Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
                  What You Can Do
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  A complete platform for developers to showcase work and connect
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HiCollection,
                    title: 'Showcase Projects',
                    desc: 'Create and display your developer projects with rich documentation, code snippets, and live demos',
                    gradient: 'from-blue-500 to-indigo-500',
                    bgGradient: 'from-blue-50 to-indigo-50/50'
                  },
                  {
                    icon: HiUserGroup,
                    title: 'Build Your Profile',
                    desc: 'Craft a personalized developer portfolio with skills, experience, and social proof that stands out',
                    gradient: 'from-teal-500 to-cyan-500',
                    bgGradient: 'from-teal-50 to-cyan-50/50'
                  },
                  {
                    icon: HiUsers,
                    title: 'Connect & Collaborate',
                    desc: 'Follow developers, engage with their work, and build meaningful connections in the community',
                    gradient: 'from-amber-500 to-orange-500',
                    bgGradient: 'from-amber-50 to-orange-50/50'
                  }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`relative p-8 bg-linear-to-br ${feature.bgGradient} rounded-3xl shadow-lg hover:shadow-2xl transition-shadow group`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${feature.gradient} mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why SkillHub Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
                  Why SkillHub?
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Built for developers, by developers
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HiLightBulb,
                    title: 'Developer-Centric',
                    desc: 'Every feature is designed with developer workflows in mind—clean, intuitive, and powerful',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-100'
                  },
                  {
                    icon: HiCog,
                    title: 'Cloud-Native Architecture',
                    desc: 'Built on modern microservices with Spring Boot, React, and scalable cloud infrastructure',
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-100'
                  },
                  {
                    icon: HiShieldCheck,
                    title: 'Secure & Fast',
                    desc: 'JWT authentication, API Gateway routing, and optimized performance ensure a secure experience',
                    color: 'text-teal-600',
                    bgColor: 'bg-teal-100'
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    className="text-center p-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${item.bgColor} ${item.color} mb-6 shadow-lg`}
                    >
                      <item.icon className="w-10 h-10" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section (Join Now) */}
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-5xl relative overflow-hidden rounded-3xl bg-linear-to-r from-teal-500 via-cyan-500 to-blue-500 p-12 sm:p-16 shadow-2xl"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-40 h-40 border-4 border-white rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-20 -left-20 w-60 h-60 border-4 border-white rounded-full"
                />
              </div>

              <div className="relative z-10 text-center text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl sm:text-5xl font-bold mb-6"
                >
                  Ready to Start Building?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
                >
                  Join developers from around the world building their portfolio and network on SkillHub
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-12 py-5 bg-white text-teal-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                    >
                      Create Free Account
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  // Student Dashboard
  if (role === 'STUDENT') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Welcome card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6 md:p-8 mb-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome back, {username}! 👋
                </h1>
                <p className="text-slate-600">Ready to build something great?</p>
              </div>
              {verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-100 to-emerald-100 rounded-full"
                >
                  <HiCheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Verified</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Student action cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: HiCollection,
                title: 'My Projects',
                desc: 'Continue building from where you left off',
                gradient: 'from-blue-500 to-indigo-500',
                bgGradient: 'from-blue-50 to-indigo-50'
              },
              {
                icon: HiUserGroup,
                title: 'Find Collaborators',
                desc: 'Connect with developers and teammates',
                gradient: 'from-teal-500 to-cyan-500',
                bgGradient: 'from-teal-50 to-cyan-50'
              },
              {
                icon: HiChartBar,
                title: 'Profile Insights',
                desc: 'Monitor your profile growth and engagement',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50'
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-linear-to-br ${card.bgGradient} rounded-xl shadow-md border border-slate-200/50 p-6 cursor-pointer transition-shadow hover:shadow-xl`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${card.gradient} mb-4 shadow-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Protected endpoint status */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <HiCheckCircle className="w-5 h-5 text-teal-500" />
              System Status
            </h2>
            {loading && <p className="text-sm text-slate-600">Checking connection…</p>}
            {!loading && error && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                {error}
              </p>
            )}
            {!loading && !error && (
              <p className="text-sm text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {protectedMsg}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Admin Dashboard
  if (role === 'ADMIN') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Admin header */}
          <motion.div
            variants={itemVariants}
            className="bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Control Panel</h1>
                <p className="text-purple-100">Welcome, {username}</p>
              </div>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
              >
                <HiCog className="w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Admin stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: HiUsers,
                title: 'Total Users',
                value: '1,234',
                change: '+12%',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50'
              },
              {
                icon: HiCog,
                title: 'Manage Users',
                value: 'Actions',
                change: 'View all',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50'
              },
              {
                icon: HiTrendingUp,
                title: 'System Stats',
                value: '99.9%',
                change: 'Uptime',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50'
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`bg-linear-to-br ${stat.bgGradient} rounded-xl shadow-lg border border-slate-200/50 p-6 cursor-pointer transition-shadow hover:shadow-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-linear-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, type: 'spring' }}
                  className="text-2xl font-bold text-slate-800"
                >
                  {stat.value}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Protected endpoint status */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <HiCheckCircle className="w-5 h-5 text-purple-500" />
              System Status
            </h2>
            {loading && <p className="text-sm text-slate-600">Checking connection…</p>}
            {!loading && error && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                {error}
              </p>
            )}
            {!loading && !error && (
              <p className="text-sm text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {protectedMsg}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Default fallback for other roles
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome, {username}!</h1>
          <p className="text-slate-600 mb-6">Role: {getDisplayRole(role)}</p>
          
          {loading && <p className="text-sm text-slate-600">Loading…</p>}
          {!loading && error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && !error && <p className="text-sm text-slate-700">{protectedMsg}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
}