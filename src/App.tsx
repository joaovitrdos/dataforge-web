import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';

import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Home from './view/Home/Home';
import Docs from './view/Docs/Docs';
import About from './view/About/About';
import Started from './view/Started/Started';

import Login from './view/Login/Login';
import Register from './view/Register/Register';
import SendEmail from './view/SendEmail/SendEmail';
import VerificationCode from './view/VerificationCode/VerificationCode';
import ResetPassword from './view/ResetPassword/ResetPassword';
import ChangePassword from './view/ChangePassword/ChangePassword';
import OAuthCallback from './components/AuthGoogle/OAuthCallBack';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="navbar-spacer" />
      <Routes>
        {/* ── Públicas ── */}
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/send-email"          element={<SendEmail />} />
        <Route path="/verification-code"   element={<VerificationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        {/* ── Privadas ── */}
        <Route path="/started" element={
          <PrivateRoute><Started /></PrivateRoute>
        } />
        <Route path="/change-password" element={
          <PrivateRoute><ChangePassword /></PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
};

export default App;