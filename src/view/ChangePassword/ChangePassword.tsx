import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import { API_URL } from '../../config/api';
import '../css.css';

const API = API_URL;

const safeJson = async (res: Response) => {
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
};

const ChangePassword: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user!.email }),
      });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.message || 'Erro ao enviar email.');

      navigate('/verification-code', { state: { email: user!.email } });
    } catch (err: any) {
      setError(err.message);
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

        <h1 className="auth-title">Alterar senha</h1>
        <p className="auth-subtitle">
          Enviaremos um código de verificação para<br />
          <strong style={{ color: '#e8e8e0' }}>{user?.email}</strong>
        </p>

        <form className="auth-form" onSubmit={handleSendCode}>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? <><span className="auth-spinner" /> Enviando...</> : 'Enviar código'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;