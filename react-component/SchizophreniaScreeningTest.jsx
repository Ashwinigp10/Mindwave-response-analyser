import React from 'react';
import AdaptiveQuestionnaire from './AdaptiveQuestionnaire';

/**
 * SchizophreniaScreeningTest Component
 * 
 * Runs the Adaptive Schizophrenia Screening Test featuring:
 * - Age groups from 6 to 50+
 * - Profession selection + Add custom profession
 * - Dynamic domain branching (Yes asks 2-3 follow-ups; No advances)
 */
export default function SchizophreniaScreeningTest({ onBackToMenu }) {
  return (
    <AdaptiveQuestionnaire 
      assessmentType="schizophrenia" 
      onBackToMenu={onBackToMenu} 
    />
  );
}
