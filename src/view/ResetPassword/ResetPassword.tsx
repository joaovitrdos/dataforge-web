import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../../config/api';
import '../css.css';

const API = API_URL;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email ?? '';
  const code = (location.state as any)?.code ?? '';

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (newPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/password/reset-password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao redefinir senha.');

      setSuccess('Senha redefinida com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
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
          <div className="auth-step done" />
          <div className="auth-step done" />
          <div className="auth-step active" />
        </div>

        <h1 className="auth-title">Nova senha</h1>
        <p className="auth-subtitle">Escolha uma senha forte para sua conta</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="auth-field">
            <label className="auth-label">Nova senha</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirmar nova senha</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" type="submit" disabled={loading || !!success}>
            {loading ? <><span className="auth-spinner" /> Salvando...</> : 'Redefinir senha'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login">Voltar para o login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;