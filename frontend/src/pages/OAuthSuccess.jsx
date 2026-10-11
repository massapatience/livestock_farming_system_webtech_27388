import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      api.get('/auth/me').then((res) => {
        login(token, res.data);
        navigate('/dashboard');
      });
    }
  }, []);

  return <div className="flex items-center justify-center h-screen">Signing you in...</div>;
}
