import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useRedirectAuth() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      // If user has no devices, redirect to device pairing page
      // unless they're already on the pairing page
      if ((!user.devices || user.devices.length === 0) && location.pathname !== '/pair') {
        navigate('/pair');
      } else if (user.devices && user.devices.length > 0 && location.pathname === '/login') {
        // If user has devices and they're on the login page, redirect to home
        navigate('/');
      }
    }
  }, [user, isAuthenticated, loading, navigate, location.pathname]);

  return { loading };
}