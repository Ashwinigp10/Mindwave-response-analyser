import React from 'react';
import { ArrowLeft, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import { useScreening } from '../context/ScreeningContext';

export default function DetailedResponsesPage({ onNavigate }) {
  const { latestResult, questions } = useScreening();

  const answersList = latestResult?.answers || questions.map((q, idx) => ({
    id: q.id,
    text: q.text,
    answer: idx % 2 === 0 ? 'True' : 'False',
    followUp1: idx % 2 === 0 ? 3 : null,
    followUp2: idx % 2 === 0 ? 4 : null
  }));

  return (
    <div className="detailed-responses-wrap" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Your Answers</h1>
        <p className="page-description">Review all the questions and your responses.</p>
      </header>

      {/* ── TABLE CARD (Screen 10) ────────────────────────────────────────── */}
      <div className="table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="answers-table">
            <thead>
              <tr>
                <th style={{ width: '48px', textAlign: 'center' }}>#</th>
                <th>Question</th>
                <th style={{ width: '130px', textAlign: 'center' }}>Your Answer</th>
                <th style={{ width: '220px' }}>Follow-up Responses</th>
              </tr>
            </thead>
            <tbody>
              {answersList.map((item, index) => {
                const isTrue = item.answer === 'True';
                const hasFollowUp = isTrue && (item.followUp1 !== null || item.followUp2 !== null);

                return (
                  <tr key={`ans-${item.id || index}`}>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      {index + 1}
                    </td>
                    <td style={{ fontWeight: 500, lineHeight: 1.5 }}>
                      {item.text || item.questionText}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={isTrue ? 'badge-true' : 'badge-false'}>
                        {isTrue ? 'True' : 'False'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                      {hasFollowUp ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span>Q{index + 1}a (Frequency): <strong>{item.followUp1 ?? 0}/5</strong></span>
                          <span>Q{index + 1}b (Impact): <strong>{item.followUp2 ?? 0}/5</strong></span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--color-text-subtle)' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── RETURN BUTTONS ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="btn btn-outline"
          onClick={() => onNavigate('result')}
          id="btn-back-to-results"
        >
          <ArrowLeft size={16} />
          <span>Back to Result</span>
        </button>

        <button 
          className="btn btn-primary"
          onClick={() => onNavigate('dashboard')}
          id="btn-responses-to-dashboard"
        >
          <LayoutDashboard size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
