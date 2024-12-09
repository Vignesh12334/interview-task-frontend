import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { User, LoginCredentials } from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const user = authService.getCurrentUser();
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { user, accessToken } = await authService.login(credentials);
      localStorage.setItem('token', accessToken);
      
      setAuthState({
        user,
        token: accessToken,
        isAuthenticated: true,
        loading: false,
      });

      navigate('/dashboard');
    } catch (error) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  }, [navigate]);

  // const register = useCallback(async (credentials: RegisterCredentials) => {
  //   try {
  //     const { user, accessToken } = await authService.register(credentials);
  //     localStorage.setItem('token', accessToken);

  //     setAuthState({
  //       user,
  //       token: accessToken,
  //       isAuthenticated: true,
  //       loading: false,
  //     });

  //     navigate('/dashboard');
  //   } catch (error) {
  //     setAuthState((prev) => ({ ...prev, loading: false }));
  //     throw error;
  //   }
  // }, [navigate]);

  const logout = useCallback(async () => {
    try {
      authService.logout();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [navigate]);

  const updateUser = useCallback((user: User) => {
    setAuthState((prev) => ({ ...prev, user }));
  }, []);

  return {
    ...authState,
    login,
  
    logout,
    updateUser,
  };
};

export default useAuth;
