import React from 'react';
import { ArrowRight, ShieldCheck, BookOpen, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingPage({ onNavigate }) {
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      onNavigate('dashboard');
    } else {
      onNavigate('auth');
    }
  };

  return (
    <div className="landing-page-wrap">
      {/* ── HERO SECTION: CENTERED, BIGGER FONT, NO LOGO ─────────────────── */}
      <section className="hero-center-wrapper">
        <h1 className="hero-title-centered">MindWave</h1>
        <h2 className="hero-subtitle-centered">Psychological Response Analyzer</h2>
        <p className="hero-description-centered">
          A personalized platform to understand mental well-being through structured screening, reflection, and insights.
        </p>
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleGetStarted}
          id="hero-get-started-btn"
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>
      </section>

      {/* ── 3 FEATURE CARDS (Screen 1 Bottom) ────────────────────────────── */}
      <section className="hero-features-grid">
        <div 
          className="feature-mini-card" 
          onClick={() => onNavigate('screening-select')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <div className="feature-mini-icon-circle">
            <ShieldCheck size={26} strokeWidth={2.2} />
          </div>
          <h3 className="feature-mini-title">Screening</h3>
          <p className="feature-mini-desc">Understand yourself better.</p>
        </div>

        <div 
          className="feature-mini-card"
          onClick={() => onNavigate('journal')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <div className="feature-mini-icon-circle">
            <BookOpen size={26} strokeWidth={2.2} />
          </div>
          <h3 className="feature-mini-title">Journaling</h3>
          <p className="feature-mini-desc">Express your thoughts.</p>
        </div>

        <div 
          className="feature-mini-card"
          onClick={() => onNavigate(isAuthenticated ? 'progress' : 'auth')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <div className="feature-mini-icon-circle">
            <CheckCircle2 size={26} strokeWidth={2.2} />
          </div>
          <h3 className="feature-mini-title">Insights</h3>
          <p className="feature-mini-desc">Personalized results.</p>
        </div>
      </section>
    </div>
  );
}
