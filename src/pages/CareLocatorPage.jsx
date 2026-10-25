import React from 'react';
import { 
  Navigation, 
  ShieldCheck, 
  PhoneCall, 
  ArrowLeft, 
  HeartHandshake, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import GpsHealthcareMap from '../components/GpsHealthcareMap';
import { useScreening } from '../context/ScreeningContext';

export default function CareLocatorPage({ onNavigate }) {
  const { latestResult } = useScreening();

  const isBipolar = latestResult?.assessment_type === 'bipolar';
  const maxScore = latestResult?.maxScore || (isBipolar ? 15 : 16);
  const score = typeof latestResult?.symptom_count === 'number' ? Math.min(maxScore, latestResult.symptom_count) : (latestResult?.score ?? 0);
  const riskLevel = (score > 12) 
    ? 'Elevated' 
    : (score >= 8 ? 'Moderate' : (score >= 4 ? 'Mild' : 'Minimal'));
  const testName = isBipolar ? 'Bipolar Screening' : 'Schizophrenia Screening';


  return (
    <div className="care-page-container">
      {/* ── TOP HERO SECTION ─────────────────────────────────────────────── */}
      <div className="care-page-hero">
        <div className="care-page-hero-top">
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="care-verified-badge">
            <ShieldCheck size={16} color="var(--color-primary)" />
            <span>Verified Clinical Network</span>
          </div>
        </div>

        <h1 className="care-page-title">
          GPS Healthcare & Psychiatrist Locator
        </h1>
        <p className="care-page-lead">
          Real-time location-based mapping for nearby emergency psychiatric departments, 24/7 crisis triage centers, and verified senior psychiatrists.
        </p>

        {latestResult && (
          <div className="care-recent-screening-alert">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <AlertCircle size={20} color="var(--color-primary)" />
              <div>
                <strong>Active Screening Context:</strong>{' '}
                <span>
                  {testName} ({riskLevel} Risk, Score: {score}/{maxScore}). Nearby recommendations below are prioritized for your clinical profile.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── INTERACTIVE GPS MAP COMPONENT ─────────────────────────────────── */}
      <GpsHealthcareMap
        riskLevel={riskLevel}
        score={score}
        maxScore={maxScore}
        testName={testName}
        autoLocate={false}
      />

      {/* ── CLINICAL EMERGENCY GUIDANCE ────────────────────────────────────── */}
      <section className="care-guidance-card">
        <h3 className="care-guidance-title">
          <HeartHandshake size={22} color="var(--color-primary)" />
          <span>When Should You Seek Immediate Emergency Medical Care?</span>
        </h3>
        <p className="care-guidance-text">
          If you, a family member, or someone you know is experiencing any of the following, please proceed to the nearest emergency hospital casualty department or dial the national emergency response line (<strong>112</strong> / <strong>108</strong>):
        </p>
        <div className="care-guidance-grid">
          <div className="guidance-item">
            <strong className="guidance-item-title">Acute Manic Escalation:</strong>
            <p>Sleeplessness for multiple consecutive days, extreme agitation, severe disorientation, or high-risk behavior.</p>
          </div>
          <div className="guidance-item">
            <strong className="guidance-item-title">Overwhelming Perceptual Changes:</strong>
            <p>Distressing sensory voices, extreme fear, severe suspiciousness, or confusion about physical surroundings.</p>
          </div>
          <div className="guidance-item">
            <strong className="guidance-item-title">Thoughts of Self-Harm or Crisis:</strong>
            <p>Immediate danger or feeling unable to keep oneself safe. Call Tele-MANAS at <strong>14416</strong> or <strong>9999 666 555</strong> right away.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
