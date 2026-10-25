import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScreening } from '../context/ScreeningContext';

export default function ScreeningSelectPage({ onNavigate }) {
  const { startTest } = useScreening();

  const handleSelect = (testType) => {
    startTest(testType);
    onNavigate('screening-setup');
  };

  return (
    <div className="screening-select-wrap">
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="screening-select-header">
        <h1 className="page-title">Select a Screening Test</h1>
        <p className="page-description">
          Choose a test to begin. Based on your age group and profession, you will receive the most relevant questions.
        </p>
      </header>

      {/* ── TWO CARDS ONLY (Screen 5) ────────────────────────────────────── */}
      <section className="screening-select-grid">
        {/* Card 1: Schizophrenia Screening Test */}
        <article className="screening-primary-card">
          <div className="screening-icon-circle">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
            </svg>
          </div>
          <h2 className="screening-card-title">Schizophrenia Screening Test</h2>
          <p className="screening-card-desc">
            Based on Prodromal Questionnaire for Schizophrenia
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => handleSelect('schizophrenia')}
            id="start-schizophrenia-test-btn"
          >
            <span>Start Test</span>
            <ArrowRight size={17} />
          </button>
        </article>

        {/* Card 2: Bipolar Screening Test */}
        <article className="screening-primary-card">
          <div className="screening-icon-circle">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="screening-card-title">Bipolar Screening Test</h2>
          <p className="screening-card-desc">
            Based on MDQ (Mood Disorder Questionnaire)
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => handleSelect('bipolar')}
            id="start-bipolar-test-btn"
          >
            <span>Start Test</span>
            <ArrowRight size={17} />
          </button>
        </article>
      </section>
    </div>
  );
}
