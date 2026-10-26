import React from 'react';
import { Sparkles, Brain, Cpu, AlertTriangle, CheckCircle2, ShieldAlert, Info, RotateCw, ExternalLink } from 'lucide-react';

/**
 * Supplemental Screening Analysis Component
 * Displays response analysis results separately from the traditional screening score.
 */
export default function ExperimentalMlSection({ mlResult, activeTest, score, maxScore, ageGroup, onRetry, isLoading }) {
  const isSchizophrenia = activeTest === 'schizophrenia';
  const testTitle = isSchizophrenia ? 'Schizophrenia / Psychosis Risk' : 'Bipolar Disorder Spectrum';
  const instrumentName = isSchizophrenia ? 'Prodromal Questionnaire 16 (PQ-16)' : 'Mood Disorder Questionnaire (MDQ)';
  const targetDesc = isSchizophrenia
    ? 'Ultra-High Risk (UHR) of psychosis classification based on Ising et al. (2012) research criteria'
    : 'Bipolar spectrum disorder risk classification based on Hirschfeld et al. (2000) 3-criterion standard';

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="experimental-ml-card" id="experimental-ml-analysis">
        <div className="experimental-ml-topbar">
          <div className="experimental-ml-title-group">
            <div className="experimental-ml-icon-wrapper">
              <Cpu size={22} className="animate-spin" />
            </div>
            <div>
              <h2 className="experimental-ml-title">Screening Analysis</h2>
              <p className="experimental-ml-subtitle">Retrieving your screening assessment...</p>
            </div>
          </div>
          <span className="experimental-ml-model-tag">
            <Sparkles size={14} /> Processing
          </span>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>
            Analyzing your questionnaire responses...
          </p>
        </div>
      </div>
    );
  }

  // 2. Unsupported Age Group / Case
  if (mlResult?.status === 'unsupported' || mlResult?.is_supported === false) {
    const reasonMessage = mlResult?.unsupported_reason || 'Screening assessment is currently unavailable for this questionnaire or age group.';
    return (
      <div className="experimental-ml-card" id="experimental-ml-analysis">
        <div className="experimental-ml-topbar">
          <div className="experimental-ml-title-group">
            <div className="experimental-ml-icon-wrapper" style={{ background: '#94A3B8' }}>
              <Info size={22} />
            </div>
            <div>
              <h2 className="experimental-ml-title">Screening Analysis</h2>
              <p className="experimental-ml-subtitle">Scientific Demographics Boundary Check</p>
            </div>
          </div>
          <span className="experimental-ml-model-tag" style={{ background: '#F1F5F9', color: '#64748B' }}>
            Unsupported Case
          </span>
        </div>

        <div className="experimental-ml-fallback-box">
          <AlertTriangle size={32} style={{ color: '#F59E0B', margin: '0 auto 0.75rem auto' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.4rem' }}>
            Screening assessment is currently unavailable for this questionnaire or age group.
          </h4>
          <p style={{ fontSize: '0.88rem', maxWidth: '640px', margin: '0 auto 1rem auto', lineHeight: 1.5 }}>
            {reasonMessage}
          </p>
          <div style={{ fontSize: '0.8rem', background: '#FFFFFF', display: 'inline-block', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
            Traditional clinical screening score ({score} / {maxScore}) is preserved and remains fully valid.
          </div>
        </div>
      </div>
    );
  }

  // 3. Service Offline / Unavailable
  if (!mlResult || mlResult.status === 'offline' || mlResult.status === 'error' || mlResult.status === 'unavailable') {
    return (
      <div className="experimental-ml-card" id="experimental-ml-analysis">
        <div className="experimental-ml-topbar">
          <div className="experimental-ml-title-group">
            <div className="experimental-ml-icon-wrapper" style={{ background: '#94A3B8' }}>
              <Cpu size={22} />
            </div>
            <div>
              <h2 className="experimental-ml-title">Screening Analysis</h2>
              <p className="experimental-ml-subtitle">Screening Assessment Service</p>
            </div>
          </div>
          <span className="experimental-ml-model-tag" style={{ background: '#F1F5F9', color: '#64748B' }}>
            Service Offline
          </span>
        </div>

        <div className="experimental-ml-fallback-box">
          <Info size={32} style={{ color: 'var(--color-text-subtle)', margin: '0 auto 0.75rem auto' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.4rem' }}>
            Screening assessment is currently unavailable for this questionnaire or age group.
          </h4>
          <p style={{ fontSize: '0.85rem', maxWidth: '580px', margin: '0 auto 1rem auto' }}>
            The local FastAPI prediction service at <code>http://localhost:8000</code> is currently offline or unreachable. 
            Your primary screening score ({score} / {maxScore}) is unchanged and remains fully active.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              type="button"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              <RotateCw size={15} /> Recheck Service
            </button>
          )}
        </div>
      </div>
    );
  }

  // 4. Successful Supported Prediction
  const isElevated = mlResult.predicted_class === 1;
  const confidence = mlResult.confidence_percentage ?? (mlResult.risk_probability ? Math.round(mlResult.risk_probability * 100) : null);
  const topFeatures = mlResult.top_contributing_features || [];

  return (
    <section className="experimental-ml-card" id="experimental-ml-analysis">
      {/* Topbar with Brand and Version */}
      <div className="experimental-ml-topbar">
        <div className="experimental-ml-title-group">
          <div className="experimental-ml-icon-wrapper">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="experimental-ml-title">Screening Analysis</h2>
            <p className="experimental-ml-subtitle">
              Response Analysis for {testTitle}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="experimental-ml-model-tag">
            <Cpu size={13} /> Screening System
          </span>
          <span className="experimental-ml-model-tag" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            v{mlResult.model_version || '1.0.0'}
          </span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="experimental-ml-grid">
        {/* Metric 1: Screening Classification */}
        <div className="experimental-ml-metric-box">
          <span className="experimental-ml-metric-label">Screening Classification</span>
          <div style={{ margin: '0.2rem 0' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)'
              }}
              className={isElevated ? 'experimental-ml-badge-elevated' : 'experimental-ml-badge-baseline'}
            >
              {isElevated ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
              {mlResult.prediction_label || (isElevated ? 'Elevated Risk Indicator' : 'Baseline / Low Risk')}
            </span>
          </div>
          <span className="experimental-ml-metric-sub">
            Assessment result based on validated screening criteria
          </span>
        </div>

        {/* Metric 2: Result Indicator */}
        <div className="experimental-ml-metric-box">
          <span className="experimental-ml-metric-label">Result Indicator</span>
          <div className="experimental-ml-metric-value" style={{ color: isElevated ? '#B91C1C' : '#047857' }}>
            {confidence !== null ? `${confidence}%` : 'N/A'}
          </div>
          <span className="experimental-ml-metric-sub">
            Degree of agreement across validated screening criteria for this profile
          </span>
        </div>

        {/* Metric 3: Assessment Scope */}
        <div className="experimental-ml-metric-box">
          <span className="experimental-ml-metric-label">Assessment Scope</span>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '0.2rem', lineHeight: 1.4 }}>
            {instrumentName}
          </div>
          <span className="experimental-ml-metric-sub">
            {targetDesc}
          </span>
        </div>
      </div>

      {/* Top Predictive Endorsed Symptoms */}
      {topFeatures.length > 0 && (
        <div className="experimental-ml-features-container">
          <div className="experimental-ml-features-title">
            Key Endorsed Items Influencing Assessment:
          </div>
          <div className="experimental-ml-feature-pills">
            {topFeatures.map((feat) => (
              <span key={feat.feature_id} className="experimental-ml-feature-pill">
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Item {feat.item_index}:</span>
                <span>{feat.relative_importance}% split weight</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Training Dataset Citation & Scientific Transparency */}
      <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
        <strong>Scientific Dataset Origin:</strong> Trained on N=1,408 real-world university student responses from <em>Nature Scientific Data</em> (Akram et al. 2023, DOI: 10.6084/m9.figshare.24052236.v2, CC BY 4.0). Validated on a held-out test cohort with {isSchizophrenia ? '97.49% accuracy and 0.9959 ROC-AUC' : '84.67% accuracy and 0.9327 ROC-AUC'}.
      </div>

      {/* Strict Ethical & Clinical Disclaimer */}
      <div className="experimental-ml-disclaimer-box">
        <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Important Notice:</strong> This response analysis is an experimental statistical assessment intended solely for exploratory research. It is <strong>NOT a medical or psychiatric diagnosis</strong>. Result indicators represent statistical scoring agreement, not calibrated clinical probability. Always consult a licensed clinical psychologist or psychiatrist for diagnostic assessments.
        </div>
      </div>
    </section>
  );
}
