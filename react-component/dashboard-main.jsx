import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardApp from './DashboardApp';
import './tailwind.css';
import '../dashboard.css';

const rootElement = document.getElementById('dashboard-react-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DashboardApp />
    </React.StrictMode>
  );
}
