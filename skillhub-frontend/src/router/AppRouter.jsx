import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Profile from '../pages/Profile.jsx';
import VerifyEmail from '../pages/VerifyEmail.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Navbar from '../components/Navbar.jsx';
import LoadingShimmer from '../components/LoadingShimmer.jsx';
import useAuth from '../hooks/useAuth.js';

function RoutedLayout() {
  const location = useLocation();
  const { token } = useAuth();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    // Simulate auth state check (already happens in AuthContext via localStorage)
    // Show loading shimmer for a brief moment on initial load
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  
  if (isInitialLoad) {
    return <LoadingShimmer />;
  }
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
  <Route path="/register" element={<Register />} />
  <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}> 
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RoutedLayout />
    </BrowserRouter>
  );
}
