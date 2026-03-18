import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../../config/api';
import '../css.css';

const API = API_URL;

const VerificationCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email ?? '';

  const [digits, setDigits] = useState<string[]>(['', '', '', '',]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 3) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = ['', '', '', '',];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setDigits(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  const code = digits.join('');
  if (code.length < 4) {
    setError('Preencha todos os 4 dígitos.');
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(`${API}/api/auth/password/validate-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Código inválido.');
    }

    navigate('/reset-password', { state: { email, code } });
  } catch (err: any) {
    setError(err.message || 'Erro desconhecido.');
  } finally {
    setLoading(false);
  }
};

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setResending(true);
    try {
      const res = await fetch(`${API}/api/auth/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao reenviar.');

      setSuccess('Código reenviado com sucesso!');
      setDigits(['', '', '', '',]);
      refs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido.');
    } finally {
      setResending(false);
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
          <div className="auth-step active" />
          <div className="auth-step" />
        </div>

        <h1 className="auth-title">Verificar email</h1>
        <p className="auth-subtitle">
          Enviamos um código de 4 dígitos para<br />
          <strong style={{ color: '#e8e8e0' }}>{email}</strong>
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="auth-code-row" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                className="auth-code-input"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                ref={el => { refs.current[i] = el; }}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
              />
            ))}
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading
              ? <><span className="auth-spinner" /> Verificando...</>
              : 'Verificar código'}
          </button>
        </form>

        <div className="auth-footer">
          Não recebeu?{' '}
          <button
            onClick={handleResend}
            disabled={resending}
            style={{
              background: 'none',
              border: 'none',
              color: resending ? '#3e3e48' : '#7c6af7',
              fontWeight: 600,
              fontSize: 13,
              cursor: resending ? 'not-allowed' : 'pointer',
              fontFamily: 'Syne, sans-serif',
              padding: 0,
            }}
          >
            {resending ? 'Reenviando...' : 'Reenviar código'}
          </button>
        </div>

        <div className="auth-footer" style={{ marginTop: 8 }}>
          <Link to="/login">Voltar para o login</Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;