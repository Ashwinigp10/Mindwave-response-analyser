import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
        <p>
          MindWave – Psychological Response Analyzer is an educational and self-reflection platform. Screening insights and reflection tools do not constitute a clinical medical diagnosis. If you are experiencing acute distress, please reach out to qualified healthcare professionals or call national mental health helplines (Tele-MANAS: 14416 / KIRAN: 1800-599-0019).
        </p>
        <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} MindWave. All rights reserved. Built with privacy and empathy.
        </p>
      </div>
    </footer>
  );
}
