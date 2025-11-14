import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker, HiHeart } from 'react-icons/hi';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 200; // Show footer after scrolling 200px
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={footerVariants}
      className="relative mt-20 bg-white/60 backdrop-blur-xl border-t border-slate-200/50"
    >
      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-linear-to-r from-teal-50/30 via-cyan-50/30 to-blue-50/30 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-cyan-600">
              SkillHub
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Empowering learners worldwide with cutting-edge courses and personalized learning experiences.
              Join thousands of students on their journey to success.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <HiHeart className="text-red-500" />
              <span>Built with passion for education</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/login', label: 'Login' },
                { to: '/register', label: 'Sign Up' },
                { to: '/profile', label: 'Profile' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-600 hover:text-teal-600 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-600 text-sm group">
                <HiMail className="text-teal-500 text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="mailto:support@skillhub.com"
                  className="hover:text-teal-600 transition-colors duration-300"
                >
                  2300040118cseh@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm group">
                <HiPhone className="text-teal-500 text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-teal-600 transition-colors duration-300"
                >
                  +91 7414919083
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-600 text-sm group">
                <HiLocationMarker className="text-teal-500 text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span>Vijayawada, India</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SkillHub. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-slate-500 hover:text-teal-600 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-slate-500 hover:text-teal-600 text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient accent */}
      <div className="h-1 bg-linear-to-r from-teal-500 via-cyan-500 to-blue-500" />
    </motion.footer>
  );
}
