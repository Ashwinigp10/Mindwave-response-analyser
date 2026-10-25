import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import OverviewHub from './schizophrenia-pages/OverviewHub';
import { 
  RiskPage, 
  ScorePage,
  StabilityPage, 
  SymptomsPage, 
  InsightsPage, 
  RecommendationsPage, 
  SleepPage, 
  StressPage, 
  WellnessPage, 
  SeekHelpPage, 
  ResourcesPage, 
  DownloadPage, 
  HistoryPage, 
  RetakePage,
  SeverityPage
} from './schizophrenia-pages/DetailPageComponents';

export default function SchizophreniaDashboard({ 
  symptomsCount = 8, 
  severityScore = 18, 
  answers = [], 
  onRetake,
  onHome,
  patientName = "Dhruthi M" 
}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#0B1220';
    
    setCurrentTime(new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0B1220] text-slate-150 font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start overflow-x-hidden w-full">
        <div className="w-full max-w-[1200px] flex flex-col gap-6">
          
          <Routes>
            {/* Overview Navigation Hub */}
            <Route 
              path="/" 
              element={
                <OverviewHub 
                  symptomsCount={symptomsCount} 
                  patientName={patientName} 
                  dateString={currentTime || 'Loading...'} 
                />
              } 
            />

            {/* Individual Detailed Pages */}
            <Route path="/risk" element={<RiskPage symptomsCount={symptomsCount} />} />
            <Route path="/score" element={<ScorePage symptomsCount={symptomsCount} answers={answers} />} />
            <Route path="/stability" element={<StabilityPage symptomsCount={symptomsCount} severityScore={severityScore} answers={answers} />} />
            <Route path="/symptoms" element={<SymptomsPage answers={answers} />} />
            <Route path="/severity" element={<SeverityPage answers={answers} />} />
            <Route path="/insights" element={<InsightsPage answers={answers} symptomsCount={symptomsCount} severityScore={severityScore} />} />
            <Route path="/recommendations" element={<RecommendationsPage answers={answers} />} />
            <Route path="/sleep" element={<SleepPage answers={answers} />} />
            <Route path="/stress" element={<StressPage answers={answers} severityScore={severityScore} />} />
            <Route path="/wellness" element={<WellnessPage answers={answers} />} />
            <Route path="/seek-help" element={<SeekHelpPage answers={answers} symptomsCount={symptomsCount} />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/report" element={<DownloadPage answers={answers} symptomsCount={symptomsCount} severityScore={severityScore} patientName={patientName} dateString={currentTime} />} />
            <Route path="/history" element={<HistoryPage answers={answers} symptomsCount={symptomsCount} severityScore={severityScore} />} />
            <Route path="/retake" element={<RetakePage onRetake={onRetake} />} />
          </Routes>

        </div>
      </div>
    </HashRouter>
  );
}
