import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ReferenceLine, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ArrowLeft, 
  Flame, 
  Sparkles, 
  AlertTriangle, 
  Calendar, 
  HeartHandshake, 
  TrendingUp, 
  Tag, 
  Home, 
  RotateCcw,
  BookOpen,
  BriefcaseMedical
} from 'lucide-react';
import { bipolarInsightsMockData } from './bipolarInsightsMockData';

export default function BipolarInsights({ 
  onBack, 
  onRetake, 
  onHome, 
  patientName = "Dhruthi M" 
}) {
  const {
    pastScreenings,
    moodCorrelation,
    keyPatterns,
    journalStreak,
    weeklySummary,
    safetyCheck
  } = bipolarInsightsMockData;

  // Custom tooltips for Recharts
  const formatChartTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1E293B] border border-slate-700/80 p-3.5 rounded-2xl shadow-2xl flex flex-col gap-1 text-xs text-left">
          <p className="text-slate-400 font-semibold">{data.date}</p>
          <div className="flex justify-between gap-6 mt-1">
            <span className="text-violet-400 font-semibold">Symptom Count:</span>
            <span className="font-mono text-white font-bold">{data.symptomCount} / 16</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-cyan-400 font-semibold">Distress Score:</span>
            <span className="font-mono text-white font-bold">{data.distressScore}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans p-4 sm:p-8 md:p-10 w-full max-w-7xl mx-auto flex flex-col gap-8 transition-colors duration-300">
      
      {/* 1. Header Navigation & Info */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800/80 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-[16px] text-slate-300 hover:text-white transition-all flex items-center justify-center group cursor-pointer"
            aria-label="Back to results dashboard"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1">
                <BriefcaseMedical className="w-3 h-3" />
                Longitudinal Analytics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading mt-1">
              Screening Trend Insights
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="text-xs sm:text-sm text-slate-400 bg-slate-900/40 px-4 py-2.5 rounded-[16px] border border-slate-800/60 flex flex-col gap-1 w-full lg:w-auto min-w-[220px] text-left">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Analysis Mode:</span>
              <span className="font-bold text-blue-400">Bipolar Disorder</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Patient:</span>
              <span className="font-bold text-slate-200">{patientName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Safety Check Card (Conditional & Non-Urgent) */}
      {safetyCheck && safetyCheck.hasFlaggedKeywords && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-amber-500/20 bg-amber-500/5 rounded-[24px] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg text-left"
        >
          <div className="flex gap-4 items-start">
            <div className="w-11 h-11 rounded-[16px] bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-heading">
                Support Checklist
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {safetyCheck.message}
              </p>
            </div>
          </div>
          <button 
            onClick={() => alert("Displaying supportive clinical resources and helpline directories...")}
            className="w-full sm:w-auto px-5 py-3 text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-400 hover:text-amber-300 rounded-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            View Support Resources
          </button>
        </motion.div>
      )}

      {/* 3. Mood Correlation Banner */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/10 border border-purple-500/20 p-5 rounded-[20px] flex items-center gap-4 text-left shadow-lg">
        <div className="w-10 h-10 rounded-[12px] bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0 shadow-inner">
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-250 leading-relaxed">
          {moodCorrelation.sentence}
        </p>
      </div>

      {/* 4. Main Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* Trend Chart Card (Col Span 7) */}
        <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700/30 rounded-[24px] p-6 shadow-lg shadow-black/5 hover:border-slate-750 transition-all duration-300 flex flex-col justify-between text-left min-h-[380px]">
          <div className="flex justify-between items-center border-b border-slate-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Longitudinal Symptom Trend</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Bipolar screening symptom count mapped historically</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-[12px] border border-slate-800 font-mono font-medium">
              Limit: 16 Symptoms
            </div>
          </div>

          {/* Recharts Line Chart Container */}
          <div className="h-60 sm:h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pastScreenings} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGlowInsights" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b" 
                  fontSize={10}
                  tickLine={false} 
                  axisLine={{ stroke: '#334155', opacity: 0.3 }}
                />
                <YAxis 
                  domain={[0, 16]} 
                  tickCount={9}
                  stroke="#64748b" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#334155', opacity: 0.3 }}
                />
                <ChartTooltip content={formatChartTooltip} />
                {/* Horizontal reference line for score-6 elevated likelihood threshold */}
                <ReferenceLine 
                  y={6} 
                  stroke="#F59E0B" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  label={{ 
                    value: "Elevated Threshold (6)", 
                    position: "top", 
                    fill: "#F59E0B", 
                    fontSize: 9,
                    fontWeight: 700,
                    offset: 8
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="symptomCount" 
                  stroke="#8B5CF6" 
                  strokeWidth={3} 
                  dot={{ fill: '#1E293B', stroke: '#8B5CF6', strokeWidth: 2.5, r: 5 }}
                  activeDot={{ fill: '#22D3EE', stroke: '#1E293B', strokeWidth: 2, r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Summary Card (Col Span 5) */}
        <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/30 rounded-[24px] p-6 shadow-lg shadow-black/5 hover:border-slate-750 transition-all duration-300 text-left flex flex-col justify-between min-h-[380px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Pattern Analysis</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Personalized clinical summary</p>
              </div>
            </div>
            <div className="border-t border-slate-800/80 my-2"></div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-slate-900/10 p-4 rounded-[16px] border border-slate-800/30">
              {weeklySummary}
            </p>
          </div>
          <div className="mt-4 p-3 bg-slate-900/60 rounded-[14px] border border-slate-800/50 text-[10px] text-slate-500 text-center uppercase tracking-wider font-semibold">
            Updated weekly based on daily entries
          </div>
        </div>

      </div>

      {/* 5. Heatmap & Keywords Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* Key Patterns / Keywords Chip Card (Col Span 5) */}
        <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/30 rounded-[24px] p-6 shadow-lg shadow-black/5 hover:border-slate-750 transition-all duration-300 text-left flex flex-col gap-5 justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Key Phrases Mapped</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Top recurring journal keywords</p>
              </div>
            </div>

            <div className="border-t border-slate-800/85 my-3"></div>

            <div className="flex flex-wrap gap-2.5 mt-2">
              {keyPatterns.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 px-3.5 py-2.5 rounded-[14px] transition-all duration-200 group cursor-default"
                >
                  <span className="text-xs font-semibold text-slate-350 group-hover:text-blue-400 transition-colors">
                    "{item.phrase}"
                  </span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {item.frequency}x
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-[10px] text-slate-500 leading-normal pt-3 border-t border-slate-850/60">
            Frequencies show mentions of specific subthreshold symptoms in journal texts.
          </div>
        </div>

        {/* Journal Heatmap & Streak (Col Span 7) */}
        <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700/30 rounded-[24px] p-6 shadow-lg shadow-black/5 hover:border-slate-750 transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Consistency Tracker</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Daily journaling active calendar heatmap</p>
              </div>
            </div>

            {/* Streak Counter Chip */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-400 rounded-[12px] font-semibold">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="text-xs font-bold font-mono">
                {journalStreak.currentStreak}-Day Streak
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 justify-around py-4">
            
            {/* Heatmap Grid Rendering (7 columns x 4 rows) */}
            <div className="grid grid-cols-7 gap-2.5 bg-slate-900/30 p-4.5 rounded-[20px] border border-slate-800/60 max-w-xs sm:max-w-md w-full justify-center">
              {journalStreak.heatmap.map((cell) => (
                <div 
                  key={cell.day}
                  className={`w-7.5 h-7.5 rounded-[8px] flex items-center justify-center text-[10px] font-mono font-bold border transition-all ${
                    cell.active 
                      ? 'bg-blue-500/20 border-blue-400/40 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.25)]' 
                      : 'bg-slate-900/50 border-slate-800/60 text-slate-600'
                  }`}
                  title={`Day ${cell.day}: ${cell.active ? 'Journaled' : 'No Entry'}`}
                >
                  {cell.day}
                </div>
              ))}
            </div>

            {/* Heatmap Legend & Explanation */}
            <div className="flex flex-col text-left gap-3.5 max-w-[200px] w-full">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Heatmap Legend</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded bg-blue-500/20 border border-blue-400/40 shadow-[0_0_8px_rgba(59,130,246,0.15)] flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-semibold">Entry Logged</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded bg-slate-900/40 border border-slate-800/60 flex-shrink-0" />
                  <span className="text-xs text-slate-500 font-semibold">No Entry Logged</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal border-t border-slate-800/50 pt-2.5">
                Tracking writing habits helps identify consistency and link patterns with clinical symptoms.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* 6. Professional Disclaimer Card */}
      <div className="border border-slate-800/80 bg-slate-900/10 rounded-[20px] p-5 text-left flex gap-4 items-start shadow-inner">
        <AlertTriangle className="w-6 h-6 text-slate-500 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">
            Clinical Disclaimer
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            This analytics panel is designed for pattern logging and tracking user-reported indicators. It does not replace diagnostic instruments, clinical analysis, or therapist evaluation. Seek professional counseling for psychiatric concerns.
          </p>
        </div>
      </div>

      {/* 7. Bottom Navigation Controls */}
      <div className="flex justify-center gap-3 flex-wrap border-t border-slate-800/80 pt-6 mt-2">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-5 py-3.5 rounded-[16px] text-xs font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </button>
        <button 
          onClick={onRetake} 
          className="flex items-center gap-2 px-5 py-3.5 rounded-[16px] text-xs font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Assessment Quiz
        </button>
        <button 
          onClick={onHome} 
          className="flex items-center gap-2 px-5 py-3.5 rounded-[16px] text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Go to Home
        </button>
      </div>

    </div>
  );
}
