import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import { API_URL } from '../../config/api';
import '../css.css';

const API = API_URL;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao fazer login.');
      login(data.token, data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API}/oauth2/authorization/google`;
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">✦</div>
        </div>

        <h1 className="auth-title">Bem-vindo de volta</h1>
        <p className="auth-subtitle">Entre na sua conta para continuar</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Senha</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '-8px' }}>
            <Link to="/send-email" style={{ fontSize: '13px', color: '#7c6af7', textDecoration: 'none' }}>
              Esqueceu a senha?
            </Link>
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <><span className="auth-spinner" /> Entrando...</> : 'Entrar'}
          </button>
        </form>
<br></br>

        {/* Login com Google */}
        <button className="auth-btn-google" onClick={handleGoogleLogin} type="button">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.3z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.8 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.7v6.2C6.6 42.6 14.8 48 24 48z"/>
            <path fill="#FBBC05" d="M10.8 28.8A14.7 14.7 0 0 1 10 24c0-1.7.3-3.3.8-4.8v-6.2H2.7A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.7 10.8l8.1-6z"/>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.9 2.1 30.4 0 24 0 14.8 0 6.6 5.4 2.7 13.2l8.1 6.2C12.7 13.6 17.9 9.5 24 9.5z"/>
          </svg>
          Continuar com Google
        </button>

        <div className="auth-footer">
          Não tem uma conta? <Link to="/register">Cadastrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;