import React from 'react';
import ReactDOM from 'react-dom/client';
import BipolarScreeningTest from './BipolarScreeningTest';
import './tailwind.css';

const rootElement = document.getElementById('bipolar-react-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BipolarScreeningTest onBackToMenu={() => {
        window.location.href = '/screening.html';
      }} />
    </React.StrictMode>
  );
}
