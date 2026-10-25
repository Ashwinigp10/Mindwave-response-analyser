import React from 'react';
import AdaptiveQuestionnaire from './AdaptiveQuestionnaire';

/**
 * BipolarScreeningTest Component
 * 
 * Runs the Adaptive Bipolar Screening Test featuring:
 * - Age groups from 6 to 50+
 * - Profession selection + Add custom profession
 * - Dynamic domain branching (Yes asks 2-3 follow-ups; No advances)
 */
export default function BipolarScreeningTest({ onBackToMenu }) {
  return (
    <AdaptiveQuestionnaire 
      assessmentType="bipolar" 
      onBackToMenu={onBackToMenu} 
    />
  );
}
