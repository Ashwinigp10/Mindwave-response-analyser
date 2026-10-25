import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AGE_GROUPS, PROFESSIONS_BY_AGE } from '../data/screeningData';
import { useScreening } from '../context/ScreeningContext';

export default function ScreeningSetupPage({ onNavigate }) {
  const { ageGroup, profession, updateSetup, activeTest } = useScreening();

  const [selectedAge, setSelectedAge] = useState(ageGroup || '19-25');
  const [selectedProf, setSelectedProf] = useState(profession || 'student');

  // When age group changes, update available professions and default to first option
  useEffect(() => {
    const available = PROFESSIONS_BY_AGE[selectedAge] || [];
    if (available.length > 0) {
      const exists = available.some(p => p.id === selectedProf);
      if (!exists) {
        setSelectedProf(available[0].id);
      }
    }
  }, [selectedAge]);

  const handleContinue = (e) => {
    e.preventDefault();
    updateSetup(selectedAge, selectedProf);
    onNavigate('quiz');
  };

  const currentProfessions = PROFESSIONS_BY_AGE[selectedAge] || [];

  return (
    <div className="setup-card-container">
      <header className="setup-header">
        <h1 className="page-title" style={{ fontSize: '1.9rem', marginBottom: '0.45rem' }}>
          Before we begin
        </h1>
        <p className="page-description" style={{ fontSize: '0.98rem' }}>
          Please provide your age group and profession so that we can show you the most relevant questions.
        </p>
      </header>

      <form onSubmit={handleContinue}>
        {/* Age Group Dropdown */}
        <div className="form-group" style={{ marginBottom: '1.75rem' }}>
          <label className="form-label" htmlFor="age-group-select">
            Select Age Group
          </label>
          <select 
            id="age-group-select"
            className="select-input"
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            required
          >
            {AGE_GROUPS.map(g => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        {/* Profession Dropdown */}
        <div className="form-group" style={{ marginBottom: '2.5rem' }}>
          <label className="form-label" htmlFor="profession-select">
            Select Profession
          </label>
          <select 
            id="profession-select"
            className="select-input"
            value={selectedProf}
            onChange={(e) => setSelectedProf(e.target.value)}
            required
          >
            {currentProfessions.map(p => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Continue Button */}
        <button 
          type="submit" 
          className="btn btn-primary btn-full"
          id="setup-continue-btn"
        >
          <span>Continue</span>
          <ArrowRight size={17} />
        </button>
      </form>
    </div>
  );
}
