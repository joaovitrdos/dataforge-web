import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/api';
import '../css.css';

const API = API_URL;

const SendEmail: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao enviar email.');

      navigate('/verification-code', { state: { email } });
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">✦</div>
        </div>

        <div className="auth-steps">
          <div className="auth-step active" />
          <div className="auth-step" />
          <div className="auth-step" />
        </div>

        <h1 className="auth-title">Redefinir senha</h1>
        <p className="auth-subtitle">Informe seu email e enviaremos um código de verificação</p>

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

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <><span className="auth-spinner" /> Enviando...</> : 'Enviar código'}
          </button>
        </form>

        <div className="auth-footer">
          Lembrou a senha? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;