import React, { useMemo } from 'react';
import { Calendar, ArrowRight, BookOpen, TrendingUp, FileText, Settings, MapPin, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useScreening } from '../context/ScreeningContext';

export default function DashboardPage({ onNavigate }) {
  const { user } = useAuth();
  const { startTest, latestResult } = useScreening();

  // Dynamic formatted date e.g. "Thu, 22 Oct 2026"
  const formattedToday = useMemo(() => {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }, []);

  const handleStartTest = (testType) => {
    startTest(testType);
    onNavigate('screening-setup');
  };

  // Only show high-risk clinical advisory banner if score is strictly above 30 for 34
  const isRecentHighRisk = (latestResult?.score ?? 0) > 30;

  return (
    <div className="dashboard-wrap">
      {/* ── TOP HEADER SECTION ─────────────────────────────────────────── */}
      <section className="dashboard-top-row">
        <div>
          <h1 className="dashboard-heading">
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'Ananya'}!
          </h1>
          <p className="dashboard-subtext">
            Your journey toward understanding yourself starts here. Review your progress, reflect on your thoughts, and continue where you left off.
          </p>
        </div>

        {/* Top-Right Date Indicator Badge */}
        <div className="date-indicator-badge">
          <Calendar size={16} color="var(--color-primary)" />
          <span>{formattedToday}</span>
        </div>
      </section>

      {/* ── HIGH RISK CLINICAL ADVISORY BANNER (If recent score is Elevated or Moderate) ── */}
      {isRecentHighRisk && (
        <section 
          className="risk-clinical-advisory-banner" 
          style={{ cursor: 'pointer', marginBottom: '2rem' }}
          onClick={() => onNavigate('find-care')}
        >
          <div className="advisory-icon-wrapper">
            <ShieldAlert size={24} className="advisory-icon-pulse" />
          </div>
          <div className="advisory-content" style={{ flex: 1 }}>
            <div className="advisory-badge-row">
              <span className="advisory-risk-tag">⚠️ {latestResult.result_category} Risk Advisory</span>
              <span className="advisory-sub-tag">GPS Healthcare Radar Available</span>
            </div>
            <h3 className="advisory-title" style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>
              Nearby Emergency Hospitals & Psychiatrists Recommended
            </h3>
            <p className="advisory-description" style={{ fontSize: '0.86rem' }}>
              Your recent screening showed {latestResult.result_category.toLowerCase()} indicators ({latestResult.assessment_type === 'bipolar' ? 'Bipolar MDQ' : 'PQ-16 Prodromal'}). Enable GPS to locate verified psychiatrists and 24/7 psychiatric emergency wings near you.
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            style={{ alignSelf: 'center', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <MapPin size={15} />
            <span>Open GPS Map</span>
          </button>
        </section>
      )}

      {/* ── MAIN SECTION: TWO LARGE SCREENING CARDS SIDE BY SIDE ────────── */}
      <section className="dashboard-screenings-grid">
        {/* Card 1: Schizophrenia Screening */}
        <article className="screening-primary-card">
          <div className="screening-icon-circle">
            {/* Simple brain-related line icon */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
            </svg>
          </div>
          <h2 className="screening-card-title">Schizophrenia Screening</h2>
          <p className="screening-card-desc">
            Based on a structured prodromal symptom questionnaire.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => handleStartTest('schizophrenia')}
            id="dash-start-schiz-btn"
          >
            <span>Start Screening</span>
            <ArrowRight size={17} />
          </button>
        </article>

        {/* Card 2: Bipolar Screening */}
        <article className="screening-primary-card">
          <div className="screening-icon-circle">
            {/* Simple head/profile line icon */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="screening-card-title">Bipolar Screening</h2>
          <p className="screening-card-desc">
            Based on an MDQ-derived screening questionnaire.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => handleStartTest('bipolar')}
            id="dash-start-bipolar-btn"
          >
            <span>Start Screening</span>
            <ArrowRight size={17} />
          </button>
        </article>
      </section>

      {/* ── BELOW SCREENING CARDS: QUICK ACCESS CARDS ────────────────────── */}
      <section className="dashboard-quick-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {/* 1. My Journal */}
        <div 
          className="quick-card"
          onClick={() => onNavigate('journal')}
          role="button"
          tabIndex={0}
        >
          <div className="quick-card-icon-wrap">
            <BookOpen size={22} strokeWidth={2.2} />
          </div>
          <h3 className="quick-card-title">My Journal</h3>
          <p className="quick-card-desc">Reflect your thoughts.</p>
        </div>

        {/* 2. My Progress */}
        <div 
          className="quick-card"
          onClick={() => onNavigate('progress')}
          role="button"
          tabIndex={0}
        >
          <div className="quick-card-icon-wrap">
            <TrendingUp size={22} strokeWidth={2.2} />
          </div>
          <h3 className="quick-card-title">My Progress</h3>
          <p className="quick-card-desc">View your trends.</p>
        </div>

        {/* 3. Reports */}
        <div 
          className="quick-card"
          onClick={() => onNavigate('reports')}
          role="button"
          tabIndex={0}
        >
          <div className="quick-card-icon-wrap">
            <FileText size={22} strokeWidth={2.2} />
          </div>
          <h3 className="quick-card-title">Reports</h3>
          <p className="quick-card-desc">Download summary.</p>
        </div>

        {/* 4. Find Nearby Care (GPS) */}
        <div 
          className="quick-card"
          onClick={() => onNavigate('find-care')}
          role="button"
          tabIndex={0}
        >
          <div className="quick-card-icon-wrap" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <MapPin size={22} strokeWidth={2.2} />
          </div>
          <h3 className="quick-card-title">Nearby Care</h3>
          <p className="quick-card-desc">Hospitals & Psychiatrists.</p>
        </div>

        {/* 5. Settings */}
        <div 
          className="quick-card"
          onClick={() => onNavigate('settings')}
          role="button"
          tabIndex={0}
        >
          <div className="quick-card-icon-wrap">
            <Settings size={22} strokeWidth={2.2} />
          </div>
          <h3 className="quick-card-title">Settings</h3>
          <p className="quick-card-desc">Manage account.</p>
        </div>
      </section>
    </div>
  );
}
