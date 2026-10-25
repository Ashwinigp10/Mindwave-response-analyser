import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldAlert,
    Activity,
    Compass,
    Brain,
    Sparkles,
    BookOpen,
    Moon,
    Wind,
    Heart,
    Stethoscope,
    Download,
    Calendar,
    RefreshCw,
    ArrowRight
} from 'lucide-react';

export default function OverviewHub({ symptomsCount, patientName, dateString }) {
    // Compute risk level for summary
    const riskLevel = useMemo(() => {
        if (symptomsCount >= 11) return 'High Risk';
        if (symptomsCount >= 7) return 'Moderate Risk';
        if (symptomsCount >= 4) return 'Mild Risk';
        return 'Low Risk';
    }, [symptomsCount]);

    // Compute stability level for summary
    const stabilityLevel = useMemo(() => {
        if (symptomsCount >= 13) return 'Significant Mood Instability';
        if (symptomsCount >= 10) return 'Moderate Mood Changes';
        if (symptomsCount >= 7) return 'Mild Mood Changes';
        if (symptomsCount >= 4) return 'Mostly Stable';
        return 'Very Stable';
    }, [symptomsCount]);

    return (
        <div className="flex flex-col gap-10 sm:gap-12 text-left pb-16">

            {/* 1. Header Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#384F6E]/15 pb-6">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
                        Bipolar Disorder Screening Results
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm">
                        Overview Hub of your assessment results. Select any card to explore full clinical details.
                    </p>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 bg-[#182235]/40 border border-[#384F6E]/20 px-4 py-2.5 rounded-xl flex flex-col items-start min-w-[200px]">
                    <div>Patient: <strong className="text-white">{patientName}</strong></div>
                    <div className="mt-1 text-[11px] text-slate-500">Date: {dateString}</div>
                </div>
            </div>

            {/* 2. Grid Sections */}
            <div className="flex flex-col gap-12 sm:gap-16">

                {/* Core Results Block */}
                <div>
                    <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">Core Screening Assessment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Card 1: Overall Risk */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-red-500/10 text-red-400 flex items-center justify-center">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Overall Risk Level</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Currently flagged at <strong className="text-white">{riskLevel}</strong> based on reported patterns.
                                </p>
                            </div>
                            <Link
                                to="/risk"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 2: Screening Score */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Screening Score</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Scored <strong className="text-white">{symptomsCount} / 16</strong> positive responses.
                                </p>
                            </div>
                            <Link
                                to="/risk"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 3: Mood Stability Meter */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-orange-500/10 text-orange-400 flex items-center justify-center">
                                    <Compass className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Mood Stability Meter</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Stability status logged as <strong className="text-white">{stabilityLevel}</strong>.
                                </p>
                            </div>
                            <Link
                                to="/stability"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 4: Symptoms Identified */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                    <Brain className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Symptoms Identified</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    View mapping of behavioral and mood symptoms reported.
                                </p>
                            </div>
                            <Link
                                to="/symptoms"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 5: Mood Insights */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Mood Insights</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Explore clinical patterns and observations from the quiz responses.
                                </p>
                            </div>
                            <Link
                                to="/insights"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 6: Severity Index */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Severity Index</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Analyze the overall severity of reported mood fluctuations.
                                </p>
                            </div>
                            <Link
                                to="/severity"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Recommendations & Support Block */}
                <div>
                    <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">Wellness Recommendations &amp; Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Card 7: Personalized Recommendations */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Recommendations</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Checklists of lifestyle changes and mood tracking advice.
                                </p>
                            </div>
                            <Link
                                to="/recommendations"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 8: Sleep Guidelines */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                    <Moon className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Sleep Guidelines</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Bedtime routines, sleep hygiene advice, and guidelines.
                                </p>
                            </div>
                            <Link
                                to="/sleep"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 9: Stress Management */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-green-500/10 text-green-400 flex items-center justify-center">
                                    <Wind className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Stress Management</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Guided pacing breathing cycles and calming techniques.
                                </p>
                            </div>
                            <Link
                                to="/stress"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 10: Daily Wellness Habits */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Daily Wellness Habits</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Structured daily wellness routines to reinforce mood stability.
                                </p>
                            </div>
                            <Link
                                to="/wellness"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 11: Clinical Notes */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-violet-500/10 text-violet-400 flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Clinical Notes</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Professional clinical interpretation and guidance for your results.
                                </p>
                            </div>
                            <Link
                                to="/clinical"
                                className="h-[38px] w-full text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                            >
                                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Card 12: Report & Actions */}
                        <div className="bg-[#182235]/65 border border-[#384F6E]/15 rounded-[20px] p-6 flex flex-col justify-between h-[225px] hover:border-[#384F6E]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-9 h-9 rounded-[10px] bg-sky-500/10 text-sky-400 flex items-center justify-center">
                                    <Download className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight">Report &amp; Actions</h3>
                                <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                                    Download, schedule a follow-up, or retake your assessment.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => alert('Report downloaded successfully (Mock).')}
                                    className="h-[38px] flex-1 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => alert('Follow-up scheduling coming soon.')}
                                    className="h-[38px] flex-1 text-xs font-bold bg-[#1d2b42] hover:bg-[#253754] text-slate-200 rounded-full transition-all border border-[#384F6E]/20 flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                                >
                                    <Calendar className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => alert('Retake assessment.')}
                                    className="h-[38px] flex-1 text-xs font-bold bg-[#1d2b42] hover:bg-[#253754] text-slate-200 rounded-full transition-all border border-[#384F6E]/20 flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] duration-200"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}