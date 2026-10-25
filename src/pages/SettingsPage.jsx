import React, { useState } from 'react';
import { User, Shield, Trash2, LogOut, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useScreening } from '../context/ScreeningContext';

export default function SettingsPage({ onNavigate }) {
  const { user, logout } = useAuth();
  const { clearHistory } = useScreening();
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to permanently delete all your previous screening records? This action cannot be undone.')) {
      await clearHistory();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <div className="settings-page-wrap" style={{ maxWidth: '780px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Account & Privacy Settings</h1>
        <p className="page-description">
          Manage your personal profile, local data preferences, and confidentiality controls.
        </p>
      </header>

      {clearedNotice && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          fontWeight: 600,
          fontSize: '0.9rem',
          marginBottom: '1.5rem'
        }}>
          <CheckCircle2 size={18} />
          <span>Screening assessment history has been cleared securely.</span>
        </div>
      )}

      {/* ── PROFILE DETAILS CARD ─────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div className="contact-icon-pill">
            <User size={18} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Profile Information</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Name</span>
            <p style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem' }}>{user?.name || 'Ananya'}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Email Address</span>
            <p style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem' }}>{user?.email || 'ananya@example.com'}</p>
          </div>
        </div>
      </div>

      {/* ── PRIVACY & CONFIDENTIALITY CARD ───────────────────────────────── */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div className="contact-icon-pill">
            <Shield size={18} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Data Confidentiality</h3>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          MindWave protects your personal self-assessment responses and reflection journals with end-to-end user isolation. Your responses are strictly private to your account and never shared with other users or third parties.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)' }}>Clear Assessment History</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Permanently erase saved screenings from the database</p>
          </div>
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
            onClick={handleClearHistory}
          >
            <Trash2 size={15} />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* ── ACCOUNT ACTIONS ──────────────────────────────────────────────── */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>Sign Out</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Safely end your current session on this device</p>
          </div>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
