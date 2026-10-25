import React, { useState } from 'react';
import { Download, Printer, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { useScreening } from '../context/ScreeningContext';

export default function ProgressReportsPage({ onNavigate }) {
  const { history, loadingHistory } = useScreening();
  const [selectedReport, setSelectedReport] = useState(null);

  const handlePrint = (report) => {
    setSelectedReport(report);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="progress-page-wrap" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">Screening Progress & Reports</h1>
          <p className="page-description">
            Review your historical self-assessment summaries and download reports.
          </p>
        </div>

        <button 
          className="btn btn-outline"
          onClick={() => onNavigate('dashboard')}
        >
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </button>
      </header>

      {/* ── SCREENING SESSIONS TABLE ──────────────────────────────────────── */}
      {loadingHistory ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading assessment records...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--color-text-muted)' }}>
          <FileText size={48} color="var(--color-primary)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
            No Screening History Yet
          </h3>
          <p style={{ maxWidth: '440px', margin: '0 auto 1.5rem' }}>
            Complete your first self-assessment to view trends and generate downloadable summaries.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('screening-select')}
          >
            Start a Screening Test
          </button>
        </div>
      ) : (
        <div className="table-card">
          <table className="answers-table">
            <thead>
              <tr>
                <th>Test Type</th>
                <th>Completion Date</th>
                <th>Symptom Count</th>
                <th>Result Category</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => {
                const isSchiz = record.assessment_type === 'schizophrenia';
                const typeName = isSchiz ? 'Schizophrenia Screening' : 'Bipolar Screening';

                return (
                  <tr key={`record-${record.id || index}`}>
                    <td style={{ fontWeight: 600 }}>
                      {typeName}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>
                      {record.date || 'Recent'}
                    </td>
                    <td>
                      <strong>{record.symptom_count ?? 0}</strong> symptoms
                    </td>
                    <td>
                      <span className="result-score-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                        {record.result_category || 'Assessed'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handlePrint(record)}
                        style={{ marginRight: '0.5rem' }}
                        title="Print or save as PDF"
                      >
                        <Printer size={14} />
                        <span>Print</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
