import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  RotateCcw,
  Download,
  Trash2,
  ChevronRight,
  CheckCircle2,
  FileText,
  User,
  Info
} from 'lucide-react';

const API_BASE = 'http://localhost:5000';

export default function DashboardApp() {
  // Authentication & Profile State
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Screenings State
  const [latestScreening, setLatestScreening] = useState(null);
  const [screeningsList, setScreeningsList] = useState([]);
  const [screeningsLoading, setScreeningsLoading] = useState(true);

  // Modals & Inspection State
  const [selectedReportForView, setSelectedReportForView] = useState(null);
  const [printableReport, setPrintableReport] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Card: Learn Accordion State (defaulting to schizophrenia)
  const [activeLearnSection, setActiveLearnSection] = useState('schiz');

  // Privacy & Feedback Messages
  const [privacyNotice, setPrivacyNotice] = useState(null);

  // ──────────────────────────────────────────────────────────────────────────
  // 1. INITIALIZE & FETCH REAL DATA
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('mindwave_token');
    setAuthToken(token);

    // Profile retrieval
    if (token) {
      fetch(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('mindwave_user', JSON.stringify(data.user));
          } else {
            const cachedUser = localStorage.getItem('mindwave_user');
            if (cachedUser) {
              try { setUser(JSON.parse(cachedUser)); } catch (e) {}
            }
          }
        })
        .catch(() => {
          const cachedUser = localStorage.getItem('mindwave_user');
          if (cachedUser) {
            try { setUser(JSON.parse(cachedUser)); } catch (e) {}
          }
        })
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }

    loadScreeningData(token);
  }, []);

  // Load latest and historical screening records from Backend + LocalStorage
  const loadScreeningData = async (token) => {
    setScreeningsLoading(true);
    let allRecords = [];

    // 1. Fetch from backend if authenticated
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/screenings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            allRecords = data.map(item => {
              let parsedAnswers = [];
              if (item.answers) {
                try {
                  parsedAnswers = typeof item.answers === 'string' ? JSON.parse(item.answers) : item.answers;
                } catch (e) {}
              }
              return {
                id: item.id,
                assessment_type: item.assessment_type,
                symptom_count: item.symptom_count,
                distress_score: item.distress_score,
                result_category: item.result_category,
                age_group: item.age_group,
                profession: item.profession,
                answers: parsedAnswers,
                date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
                timestamp: item.created_at ? new Date(item.created_at).getTime() : Date.now()
              };
            });
          }
        }
      } catch (err) {
        console.warn('Could not fetch backend screenings:', err);
      }
    }

    // 2. Merge with local records
    try {
      const schizRec = localStorage.getItem('mindwave_schizophrenia_record');
      if (schizRec) {
        const parsed = JSON.parse(schizRec);
        if (!allRecords.some(r => r.timestamp === parsed.timestamp)) {
          allRecords.push(parsed);
        }
      }

      const bipolarRec = localStorage.getItem('mindwave_bipolar_record');
      if (bipolarRec) {
        const parsed = JSON.parse(bipolarRec);
        if (!allRecords.some(r => r.timestamp === parsed.timestamp)) {
          allRecords.push(parsed);
        }
      }

      const localAll = localStorage.getItem('mindwave_all_screenings');
      if (localAll) {
        const parsedList = JSON.parse(localAll);
        if (Array.isArray(parsedList)) {
          parsedList.forEach(item => {
            if (!allRecords.some(r => r.timestamp === item.timestamp)) {
              allRecords.push(item);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Error reading local screening cache:', e);
    }

    // Sort descending by timestamp/date
    allRecords.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    setScreeningsList(allRecords);
    if (allRecords.length > 0) {
      setLatestScreening(allRecords[0]);
    } else {
      setLatestScreening(null);
    }
    setScreeningsLoading(false);
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 2. FILTERING & SCHIZOPHRENIA EXCLUSIVITY LOGIC
  // ──────────────────────────────────────────────────────────────────────────
  const schizScreenings = useMemo(() => {
    return screeningsList.filter(s => s.assessment_type === 'schizophrenia');
  }, [screeningsList]);

  const bipolarScreenings = useMemo(() => {
    return screeningsList.filter(s => s.assessment_type === 'bipolar');
  }, [screeningsList]);

  // If a Schizophrenia test has been taken (or by default):
  // "if schizophrenia test is taken let only that be there..remove bipolar card from schizophrenia dashboard"
  const hasSchiz = schizScreenings.length > 0;
  const showOnlySchiz = hasSchiz || bipolarScreenings.length === 0;

  // Screenings to display across cards
  const displayScreenings = useMemo(() => {
    if (showOnlySchiz) return schizScreenings;
    return screeningsList;
  }, [showOnlySchiz, schizScreenings, screeningsList]);

  // Active latest screening to show in Card 1
  const activeLatestScreening = useMemo(() => {
    if (showOnlySchiz) {
      return schizScreenings.length > 0 ? schizScreenings[0] : null;
    }
    return latestScreening;
  }, [showOnlySchiz, schizScreenings, latestScreening]);

  // ──────────────────────────────────────────────────────────────────────────
  // 3. PRIVACY & PDF REPORT EXPORT
  // ──────────────────────────────────────────────────────────────────────────
  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your screening history? This cannot be undone.')) {
      return;
    }

    if (authToken) {
      try {
        await fetch(`${API_BASE}/api/screenings/clear`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authToken}` }
        });
      } catch (e) {}
    }

    // Clear local screening records
    localStorage.removeItem('mindwave_schizophrenia_record');
    localStorage.removeItem('mindwave_schizophrenia_taken');
    localStorage.removeItem('mindwave_schizophrenia_answers');
    localStorage.removeItem('mindwave_schizophrenia_symptomCount');
    localStorage.removeItem('mindwave_schizophrenia_history');

    localStorage.removeItem('mindwave_bipolar_record');
    localStorage.removeItem('mindwave_bipolar_taken');
    localStorage.removeItem('mindwave_bipolar_answers');
    localStorage.removeItem('mindwave_bipolar_symptomCount');
    localStorage.removeItem('mindwave_bipolar_history');

    localStorage.removeItem('mindwave_all_screenings');

    setLatestScreening(null);
    setScreeningsList([]);
    setPrivacyNotice('Your screening assessment history has been cleared.');
    setTimeout(() => setPrivacyNotice(null), 4000);
  };

  const handleExportJSON = () => {
    const dataPackage = {
      exportDate: new Date().toISOString(),
      screenings: displayScreenings
    };
    const blob = new Blob([JSON.stringify(dataPackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindwave-records-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPDF = (record) => {
    setPrintableReport(record);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Helper to interpret score
  const getResultInterpretation = (screening) => {
    if (!screening) return null;
    const isElevated = screening.symptom_count >= 6;
    if (screening.assessment_type === 'schizophrenia') {
      return {
        category: isElevated ? 'Elevated Clinical Monitoring' : 'Baseline / Low Endorsement',
        badgeClass: isElevated ? 'badge-warning' : 'badge-info',
        explanation: isElevated
          ? 'Your responses reflect endorsement of sensory or perceptual experiences that warrant professional clinical discussion. This is a structured screening and not a clinical diagnosis.'
          : 'Your responses indicate minimal endorsement of perceptual variations at this time. Routine check-ins can help track stability over time.'
      };
    } else {
      return {
        category: isElevated ? 'Elevated Monitoring Recommended' : 'Low Likelihood / Baseline',
        badgeClass: isElevated ? 'badge-warning' : 'badge-info',
        explanation: isElevated
          ? 'Your responses indicate noticeable mood elevation or energy shifts. We encourage reviewing these patterns with a licensed healthcare provider.'
          : 'Your responses suggest standard mood stability with no current indication of elevated episode criteria.'
      };
    }
  };

  const latestInterpretation = getResultInterpretation(activeLatestScreening);

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-inner-wrap">

        {/* ── TOP SECTION: GREETING & PAGE TITLE ─────────────────────────── */}
        <section className="dashboard-header-block">
          <div>
            <h1 className="dashboard-greeting-title">
              Welcome back{user && user.name ? `, ${user.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="dashboard-greeting-subtitle">
              Your space for screening insights, personal reflection, and wellbeing.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <a href="/schizophrenia-test.html" className="btn-primary-screening" id="header-screening-cta">
              <Activity size={18} />
              Take Screening
            </a>
          </div>
        </section>

        {privacyNotice && (
          <div className="privacy-badge-notice">
            <CheckCircle2 size={16} />
            <span>{privacyNotice}</span>
          </div>
        )}

        {/* ── ROW 1: CARD 1 (LATEST SCREENING) & CARD 2 (MY PROGRESS) ────── */}
        <div className="dashboard-grid-row dashboard-grid-row-1">
          
          {/* ─────────────────────────────────────────────────────────────
              CARD 1: LATEST SCREENING
             ───────────────────────────────────────────────────────────── */}
          <article className="dash-card" id="card-latest-screening">
            <div className="dash-card-header">
              <div className="dash-card-title-group">
                <div className="dash-card-icon-pill pill-blue">
                  <Activity size={22} />
                </div>
                <div>
                  <h2 className="dash-card-title">Latest Screening</h2>
                  <p className="dash-card-subtitle">Most recent self-assessment record</p>
                </div>
              </div>

              {activeLatestScreening && (
                <span className={`dash-badge ${latestInterpretation?.badgeClass || 'badge-info'}`}>
                  {latestInterpretation?.category}
                </span>
              )}
            </div>

            {screeningsLoading ? (
              <div className="dash-empty-state">
                <div className="dash-empty-desc">Loading your screening insights...</div>
              </div>
            ) : activeLatestScreening ? (
              <div className="screening-result-box">
                <div className="screening-meta-row">
                  <span className="screening-type-name">
                    {activeLatestScreening.assessment_type === 'schizophrenia'
                      ? 'Schizophrenia Screening (PQ-16 Dimension)'
                      : 'Bipolar Disorder Screening'}
                  </span>
                  <span className="screening-date-badge">
                    Completed on {activeLatestScreening.date || 'Recent'}
                  </span>
                </div>

                <div className="screening-score-grid">
                  <div className="score-cell">
                    <div className="score-cell-label">Symptom Count</div>
                    <div className="score-cell-value">
                      {activeLatestScreening.symptom_count}
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 400 }}>
                        {' '}/ {activeLatestScreening.assessment_type === 'schizophrenia' ? '16' : '15'}
                      </span>
                    </div>
                  </div>

                  <div className="score-cell">
                    <div className="score-cell-label">Distress Score</div>
                    <div className="score-cell-value">
                      {activeLatestScreening.distress_score ?? 0}
                    </div>
                  </div>

                  <div className="score-cell">
                    <div className="score-cell-label">Protocol Type</div>
                    <div className="score-cell-value" style={{ fontSize: '1.05rem', textTransform: 'capitalize' }}>
                      {activeLatestScreening.assessment_type}
                    </div>
                  </div>
                </div>

                <div className="screening-explanation-text">
                  {latestInterpretation?.explanation}
                </div>

                <div className="dash-card-footer">
                  <button
                    onClick={() => {
                      const testUrl = activeLatestScreening.assessment_type === 'schizophrenia'
                        ? '/schizophrenia-test.html?view=results'
                        : '/bipolar-test.html?view=results';
                      window.location.href = testUrl;
                    }}
                    className="btn-primary-screening"
                    id="btn-view-full-results"
                  >
                    View Full Results
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => handlePrintPDF(activeLatestScreening)}
                    className="btn-secondary-link"
                    title="Export printable clinical-style summary"
                    id="btn-export-pdf-summary"
                  >
                    <Download size={15} />
                    Export PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="dash-empty-state">
                <div className="dash-empty-icon">
                  <Activity size={26} />
                </div>
                <h3 className="dash-empty-title">No screening completed yet</h3>
                <p className="dash-empty-desc">
                  Take a confidential self-assessment for Schizophrenia to view structured insights here.
                </p>
                <a href="/schizophrenia-test.html" className="btn-primary-screening" style={{ marginTop: '8px' }}>
                  Start Screening
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </article>

          {/* ─────────────────────────────────────────────────────────────
              CARD 2 (PROGRESS): MY PROGRESS
              (If Schizophrenia test is taken, show ONLY Schizophrenia!)
             ───────────────────────────────────────────────────────────── */}
          <article className="dash-card" id="card-my-progress">
            <div className="dash-card-header">
              <div className="dash-card-title-group">
                <div className="dash-card-icon-pill pill-lavender">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h2 className="dash-card-title">My Progress</h2>
                  <p className="dash-card-subtitle">Screening history & score trends</p>
                </div>
              </div>

              {displayScreenings.length > 0 && (
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="btn-secondary-link"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  History ({displayScreenings.length})
                </button>
              )}
            </div>

            {/* Screening count stats: ONLY Schizophrenia when Schizophrenia test is taken! */}
            <div className="progress-stats-row" style={{ gridTemplateColumns: '1fr' }}>
              <div className="progress-stat-card">
                <div className="stat-card-label">Schizophrenia Screenings Completed</div>
                <div className="stat-card-number">{schizScreenings.length}</div>
              </div>
            </div>

            {/* History Visualization or Clean Empty State */}
            {schizScreenings.length >= 2 ? (
              <div style={{ margin: '14px 0', background: 'rgba(15, 23, 42, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Symptom Count Over Time</span>
                  <span>PQ-16 Dimension Scale (0-16)</span>
                </div>
                {/* Responsive SVG Sparkline Chart */}
                <div style={{ width: '100%', height: '90px', display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '10px 0' }}>
                  {schizScreenings.slice(0, 6).reverse().map((item, idx) => {
                    const heightPercent = Math.max(12, Math.min(100, (item.symptom_count / 16) * 100));
                    return (
                      <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>
                          {item.symptom_count}
                        </span>
                        <div
                          style={{
                            width: '100%',
                            height: `${heightPercent}%`,
                            background: 'linear-gradient(to top, rgba(167, 139, 250, 0.3), rgba(167, 139, 250, 0.85))',
                            borderRadius: '6px',
                            transition: 'height 0.4s ease'
                          }}
                          title={`Date: ${item.date} | Score: ${item.symptom_count}`}
                        />
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {item.date ? item.date.slice(0, 6) : `Test ${idx + 1}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="dash-empty-state" style={{ padding: '20px 10px' }}>
                <p className="dash-empty-desc">
                  {schizScreenings.length === 1
                    ? '1 Schizophrenia screening recorded. Complete a second screening to visualize trends over time.'
                    : 'No schizophrenia screenings completed yet. Take an assessment to start tracking.'}
                </p>
                <a
                  href="/schizophrenia-test.html"
                  className="btn-secondary-link"
                  style={{ marginTop: '6px' }}
                >
                  Take Schizophrenia Screening
                </a>
              </div>
            )}

            <p className="progress-disclaimer-note">
              Notice: Screening scores reflect self-reported symptom frequency at a single point in time and do not prove clinical improvement or deterioration.
            </p>
          </article>
        </div>

        {/* ── ROW 2: LEARN & SUPPORT & REPORTS & PRIVACY ──────────────────── */}
        <div className="dashboard-grid-row dashboard-grid-row-2">
          
          {/* ─────────────────────────────────────────────────────────────
              CARD 3: LEARN & SUPPORT
              (Focused exclusively on Schizophrenia and Clinical Care)
             ───────────────────────────────────────────────────────────── */}
          <article className="dash-card" id="card-learn-support">
            <div className="dash-card-header">
              <div className="dash-card-title-group">
                <div className="dash-card-icon-pill pill-blue">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h2 className="dash-card-title">Learn & Support</h2>
                  <p className="dash-card-subtitle">Medically reviewed education & resources</p>
                </div>
              </div>
            </div>

            <div className="learn-accordion">
              {/* Schizophrenia Section */}
              <div className="learn-item">
                <button
                  type="button"
                  className="learn-header-btn"
                  onClick={() => setActiveLearnSection(activeLearnSection === 'schiz' ? '' : 'schiz')}
                >
                  <span>Understanding Schizophrenia Screening (PQ-16)</span>
                  <ChevronRight
                    size={16}
                    style={{
                      transform: activeLearnSection === 'schiz' ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {activeLearnSection === 'schiz' && (
                  <div className="learn-body">
                    Schizophrenia screening measures sensory, perceptual, and thought processing changes. Early identification focuses on subtle perceptual anomalies, unusual beliefs, or concentration hurdles rather than acute episodes. Screening tools identify when an in-depth clinical consultation is helpful.
                  </div>
                )}
              </div>

              {/* Seeking Professional Support */}
              <div className="learn-item">
                <button
                  type="button"
                  className="learn-header-btn"
                  onClick={() => setActiveLearnSection(activeLearnSection === 'support' ? '' : 'support')}
                >
                  <span>Guidance on Seeking Professional Care</span>
                  <ChevronRight
                    size={16}
                    style={{
                      transform: activeLearnSection === 'support' ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>
                {activeLearnSection === 'support' && (
                  <div className="learn-body">
                    If screening indications persist or cause daily impairment, discussing findings with a licensed psychiatrist or clinical psychologist is the appropriate next step. Free confidential helplines:
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '6px' }}>
                      <li>National Mental Health Helpline (Tele-MANAS): 14416 / 1800-891-4416</li>
                      <li>KIRAN Mental Health Helpline: 1800-599-0019</li>
                      <li>Suicide & Crisis Lifeline: 988</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="dash-card-footer">
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                All resources are structured for education and guidance.
              </span>
              <a href="/screening.html" className="btn-secondary-link" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                Explore Screening Directory
              </a>
            </div>
          </article>

          {/* ─────────────────────────────────────────────────────────────
              CARD 4: REPORTS & PRIVACY
             ───────────────────────────────────────────────────────────── */}
          <article className="dash-card" id="card-reports-privacy">
            <div className="dash-card-header">
              <div className="dash-card-title-group">
                <div className="dash-card-icon-pill pill-lavender">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2 className="dash-card-title">Reports & Privacy</h2>
                  <p className="dash-card-subtitle">Manage assessment records & export data</p>
                </div>
              </div>
            </div>

            <div className="privacy-badge-notice">
              <ShieldCheck size={16} />
              <span>Confidential & User-Scoped Data Protection Active</span>
            </div>

            {/* List of Previous Reports */}
            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>
              Completed Assessment Records ({displayScreenings.length})
            </div>

            <div className="reports-list">
              {displayScreenings.length > 0 ? (
                displayScreenings.map((rec, idx) => (
                  <div key={rec.id || idx} className="report-item-row">
                    <div>
                      <div className="report-item-title">
                        {rec.assessment_type === 'schizophrenia' ? 'Schizophrenia Screening' : 'Screening Record'}
                      </div>
                      <div className="report-item-sub">
                        {rec.date || 'Recent'} • Score: {rec.symptom_count} / 16
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedReportForView(rec)}
                        className="btn-secondary-link"
                        style={{ padding: '5px 10px', fontSize: '0.78rem' }}
                        title="View itemized responses"
                      >
                        Responses
                      </button>
                      <button
                        onClick={() => handlePrintPDF(rec)}
                        className="btn-secondary-link"
                        style={{ padding: '5px 10px', fontSize: '0.78rem' }}
                        title="Print or export as PDF"
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', fontSize: '0.84rem', color: '#94a3b8' }}>
                  No assessment reports saved yet. Completed assessments will appear here.
                </div>
              )}
            </div>

            {/* Privacy Controls */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExportJSON}
                disabled={displayScreenings.length === 0}
                className="btn-secondary-link"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem' }}
              >
                <Download size={14} />
                Export Raw Data (JSON)
              </button>

              <button
                onClick={handleClearHistory}
                disabled={displayScreenings.length === 0}
                className="btn-secondary-link"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', color: '#f87171' }}
              >
                <Trash2 size={14} />
                Clear Screening Data
              </button>
            </div>

            <div className="dash-card-footer" style={{ marginTop: '14px' }}>
              <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Credentials, tokens, and private reflection texts are strictly protected.
              </span>
            </div>
          </article>

        </div>

      </div>

      {/* ── MODAL: DETAILED RESPONSES VIEWER ────────────────────────────── */}
      {selectedReportForView && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedReportForView(null)}>
          <div className="dash-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff' }}>
                  Assessment Responses: {selectedReportForView.assessment_type === 'schizophrenia' ? 'Schizophrenia' : 'Screening'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Completed on {selectedReportForView.date || 'Recent'} • Symptom Endorsements: {selectedReportForView.symptom_count}
                </p>
              </div>
              <button
                onClick={() => setSelectedReportForView(null)}
                className="btn-secondary-link"
                style={{ padding: '6px 12px' }}
              >
                Close
              </button>
            </div>

            <div className="dash-modal-body">
              {Array.isArray(selectedReportForView.answers) && selectedReportForView.answers.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedReportForView.answers.map((ans, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(30, 41, 59, 0.4)',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(148, 163, 184, 0.1)'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
                        {idx + 1}. {ans.question || ans.name || `Question ${idx + 1}`}
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#94a3b8' }}>
                        <span>
                          Response: <strong style={{ color: ans.answer === 'Yes' ? '#fbbf24' : '#34d399' }}>{ans.answer || 'Not answered'}</strong>
                        </span>
                        {ans.distress_level !== null && ans.distress_level !== undefined && (
                          <span>Distress Rating: <strong style={{ color: '#ffffff' }}>{ans.distress_level} / 5</strong></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No itemized question responses recorded for this summary entry.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ASSESSMENT HISTORY MODAL ────────────────────────────── */}
      {showHistoryModal && (
        <div className="dash-modal-backdrop" onClick={() => setShowHistoryModal(false)}>
          <div className="dash-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff' }}>
                  Assessment History Log
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Listing all completed screening records
                </p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="btn-secondary-link"
                style={{ padding: '6px 12px' }}
              >
                Close
              </button>
            </div>

            <div className="dash-modal-body">
              {displayScreenings.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {displayScreenings.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(30, 41, 59, 0.4)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(148, 163, 184, 0.1)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#ffffff' }}>
                          {item.assessment_type === 'schizophrenia' ? 'Schizophrenia Screening' : 'Screening'}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          Date: {item.date || 'Recent'} • Endorsements: {item.symptom_count}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowHistoryModal(false);
                          handlePrintPDF(item);
                        }}
                        className="btn-secondary-link"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Print Report
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No screening records found in history.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── HIDDEN PRINTABLE AREA FOR PDF EXPORT ───────────────────────── */}
      {printableReport && (
        <div id="printable-report-area" style={{ display: 'none' }}>
          <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '20pt', margin: 0, color: '#0f172a' }}>MindWave Screening Assessment Report</h1>
            <p style={{ fontSize: '10pt', color: '#475569', margin: '4px 0 0 0' }}>
              Confidential Psychological Response Analysis Record
            </p>
          </div>

          <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Participant:</td>
                <td>{user && user.name ? user.name : 'Confidential Participant'}</td>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Date:</td>
                <td>{printableReport.date || new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Screening Type:</td>
                <td style={{ textTransform: 'capitalize' }}>Schizophrenia Screening (PQ-16 Dimension)</td>
                <td style={{ padding: '6px 0', fontWeight: 'bold' }}>Symptom Count:</td>
                <td>{printableReport.symptom_count} / 16</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11pt', margin: '0 0 6px 0' }}>Clinical Context & Interpretation:</h3>
            <p style={{ fontSize: '9.5pt', margin: 0, lineHeight: 1.5 }}>
              {getResultInterpretation(printableReport)?.explanation}
            </p>
          </div>

          {Array.isArray(printableReport.answers) && printableReport.answers.length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', marginBottom: '10px' }}>Itemized Screening Responses:</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
                <thead>
                  <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>#</th>
                    <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Domain / Dimension</th>
                    <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Response</th>
                    <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Distress</th>
                  </tr>
                </thead>
                <tbody>
                  {printableReport.answers.map((a, i) => (
                    <tr key={i}>
                      <td style={{ padding: '6px', border: '1px solid #cbd5e1' }}>{i + 1}</td>
                      <td style={{ padding: '6px', border: '1px solid #cbd5e1' }}>{a.question || a.name || 'Dimension'}</td>
                      <td style={{ padding: '6px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{a.answer || '-'}</td>
                      <td style={{ padding: '6px', border: '1px solid #cbd5e1' }}>{a.distress_level !== null ? a.distress_level : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: '30px', borderTop: '1px solid #cbd5e1', paddingTop: '10px', fontSize: '8pt', color: '#64748b' }}>
            Disclaimer: This screening report is generated for personal reflection and preliminary assessment purposes only. It does not constitute a formal psychiatric diagnosis. If experiencing distress, consult a certified healthcare professional.
          </div>
        </div>
      )}

    </div>
  );
}
