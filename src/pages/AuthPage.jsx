import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ onNavigate, initialTab = 'login' }) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState(initialTab); // 'login' | 'signup'

  // Form states
  const [email, setEmail] = useState('ananya@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Signup states
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onNavigate('dashboard');
    } else {
      setErrorMessage(res.error || 'Invalid email or password.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !signupEmail || !signupPassword || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register(name, signupEmail, signupPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Account created successfully! You can now log in.');
      setEmail(signupEmail);
      setPassword(signupPassword);
      setTab('login');
    } else {
      setErrorMessage(res.error || 'Failed to create account. User may already exist.');
    }
  };

  return (
    <div className="auth-split-wrapper">
      {/* ── LEFT PANE: BRANDING & WELCOME MESSAGE ───────────────────────── */}
      <div className="auth-hero-pane">
        <div>
          <span className="auth-hero-greeting">Welcome to</span>
          <h2 className="auth-hero-brand">MindWave</h2>
          <p className="auth-hero-tagline">
            Your safe space for self-understanding.
          </p>
        </div>

        {/* Abstract decorative petal shape */}
        <div style={{ position: 'relative', height: '140px', marginTop: '2rem' }}>
          <svg width="100%" height="100%" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M130,10 C170,20 190,70 170,110 C150,140 100,140 70,110 C40,80 50,40 80,20 C100,10 115,10 130,10 Z" 
              fill="#7560D9" 
              fillOpacity="0.25" 
            />
            <path 
              d="M140,40 C170,60 170,100 150,120 C130,140 90,130 80,100 C70,70 90,40 120,30 C130,30 135,35 140,40 Z" 
              fill="#FFFFFF" 
              fillOpacity="0.6" 
            />
          </svg>
        </div>
      </div>

      {/* ── RIGHT PANE: FORM CONTAINER ─────────────────────────────────── */}
      <div className="auth-form-pane">
        {/* Tab Toggle */}
        <div className="auth-tab-group">
          <button 
            type="button"
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setErrorMessage(''); }}
          >
            Login
          </button>
          <button 
            type="button"
            className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => { setTab('signup'); setErrorMessage(''); }}
          >
            Create Account
          </button>
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            fontSize: '0.88rem',
            marginBottom: '1rem'
          }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            fontSize: '0.88rem',
            marginBottom: '1rem'
          }}>
            <CheckCircle size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ── 1. LOGIN FORM ────────────────────────────────────────────── */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.25rem' }}>
              Login to your account
            </h3>

            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <div className="form-input-wrap">
                <input 
                  id="login-email"
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="form-input-wrap">
                <input 
                  id="login-password"
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="pwd-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-helper-row">
              <a href="#forgot" className="form-link" onClick={(e) => { e.preventDefault(); alert('Password reset link will be sent to your email.'); }}>
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="form-footer-switch">
              Don't have an account? 
              <button 
                type="button" 
                className="form-switch-btn"
                onClick={() => setTab('signup')}
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          /* ── 2. SIGNUP FORM ───────────────────────────────────────────── */
          <form onSubmit={handleSignupSubmit}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.25rem' }}>
              Create an account
            </h3>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Name</label>
              <div className="form-input-wrap">
                <input 
                  id="signup-name"
                  type="text" 
                  className="form-input" 
                  placeholder="Enter your full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email</label>
              <div className="form-input-wrap">
                <input 
                  id="signup-email"
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">Password</label>
              <div className="form-input-wrap">
                <input 
                  id="signup-password"
                  type={showSignupPassword ? 'text' : 'password'} 
                  className="form-input" 
                  placeholder="Create a password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="pwd-toggle-btn"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-confirm-password">Confirm Password</label>
              <div className="form-input-wrap">
                <input 
                  id="signup-confirm-password"
                  type="password" 
                  className="form-input" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="form-footer-switch">
              Already have an account? 
              <button 
                type="button" 
                className="form-switch-btn"
                onClick={() => setTab('login')}
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
