import React, { useState, useEffect, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar: FC = () => {
  const { isAuthenticated, user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/api/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (_) { }
    logout();
    navigate('/');
  };

  const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo + Links */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo-link">
            <img src={Logo} alt="DataForge" className="navbar-logo" />
          </Link>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/docs">Documentação</Link></li>
            <li><Link to="/about">Sobre</Link></li>
          </ul>
        </div>

        {/* Auth */}
        <div className="navbar-right">
          {isAuthenticated && user ? (
            <>
              <Link to="/started" className="navbar-btn-outline">Gerar dados</Link>
              <div className="navbar-profile">
                <div className="navbar-avatar">{getInitials(user.name)}</div>
                <div className="navbar-dropdown">
                  <div className="navbar-dropdown-user">
                    <span className="navbar-dropdown-name">{user.name}</span>
                    <span className="navbar-dropdown-email">{user.email}</span>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <Link to="/change-password" className="navbar-dropdown-item">Alterar senha</Link>
                  <button className="navbar-dropdown-item navbar-dropdown-logout" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-outline">Entrar</Link>
              <Link to="/register" className="navbar-btn-primary">Cadastrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;