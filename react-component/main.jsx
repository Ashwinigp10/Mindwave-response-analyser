import React from 'react';
import ReactDOM from 'react-dom/client';
import SchizophreniaScreeningTest from './SchizophreniaScreeningTest';
import './tailwind.css';

const rootElement = document.getElementById('schizophrenia-react-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <SchizophreniaScreeningTest onBackToMenu={() => {
        window.location.href = '/screening.html';
      }} />
    </React.StrictMode>
  );
}
