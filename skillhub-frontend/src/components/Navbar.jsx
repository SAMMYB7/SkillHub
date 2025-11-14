import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiCode } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      logout();
      setOpen(false);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const isActive = (path) => location.pathname === path;

  // Desktop navigation link component
  const NavLink = ({ to, children }) => (
    <Link to={to} className="relative group">
      <motion.span
        className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          isActive(to)
            ? 'text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-cyan-500'
            : 'text-slate-700 hover:text-teal-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
      {isActive(to) && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );

  // Mobile navigation link component
  const MobileNavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
        isActive(to)
          ? 'bg-linear-to-r from-teal-500/10 to-cyan-500/10 text-teal-600 border-l-4 border-teal-500'
          : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      {children}
    </Link>
  );

  const AuthLinks = () => (
    <>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <motion.button
        onClick={handleLogout}
        className="ml-2 px-6 py-2 text-sm font-medium text-white bg-linear-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </>
  );

  const GuestLinks = () => (
    <>
      <NavLink to="/login">Login</NavLink>
      <Link to="/register">
        <motion.button
          className="ml-2 px-6 py-2 text-sm font-medium text-white bg-linear-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </Link>
    </>
  );

  const MobileAuthLinks = () => (
    <div className="space-y-2">
      <MobileNavLink to="/" onClick={() => setOpen(false)}>Dashboard</MobileNavLink>
      <MobileNavLink to="/profile" onClick={() => setOpen(false)}>Profile</MobileNavLink>
      <motion.button
        onClick={handleLogout}
        className="w-full mt-4 px-6 py-3 text-base font-medium text-white bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg"
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </div>
  );

  const MobileGuestLinks = () => (
    <div className="space-y-2">
      <MobileNavLink to="/login" onClick={() => setOpen(false)}>Login</MobileNavLink>
      <Link to="/register" onClick={() => setOpen(false)}>
        <motion.button
          className="w-full mt-4 px-6 py-3 text-base font-medium text-white bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50'
            : 'bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              scrolled ? 'h-14' : 'h-16'
            }`}
          >
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-teal-500 to-cyan-500 shadow-md">
                  <HiCode className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-linear-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  SkillHub
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {token ? <AuthLinks /> : <GuestLinks />}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors duration-200"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className={scrolled ? 'h-14' : 'h-16'} />

      {/* Mobile menu with backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-6">
                  <motion.button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiX className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Mobile navigation links */}
                {token ? <MobileAuthLinks /> : <MobileGuestLinks />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
