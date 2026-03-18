import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

const OAuthCallback: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      navigate('/login?error=oauth');
      return;
    }

    // busca o perfil completo usando o JWT recebido
    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar perfil');
        return res.json();
      })
      .then(user => {
        login(token, user);
        navigate('/');
      })
      .catch(() => {
        navigate('/login?error=oauth');
      });
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '16px',
      fontFamily: 'Syne, sans-serif',
      color: '#6b6b72',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '2px solid #2a2a30',
        borderTop: '2px solid #7c6af7',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ fontSize: '14px' }}>Autenticando...</span>
    </div>
  );
};

export default OAuthCallback;