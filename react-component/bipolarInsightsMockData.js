export const bipolarDashboardMockData = {
  // 1. Assessment Result (Hero Card) & Progress Overview
  hero: {
    date: "July 31, 2026",
    time: "10:20 AM",
    explanation: "Your responses fall into the elevated screening range. A score of 6 or more suggests patterns of mood elevation, energetic periods with reduced sleep, racing thoughts, or impulsivity that cross the established clinical threshold. We recommend sharing these findings with a mental health professional for a complete diagnostic interview."
  },

  // 2. Symptom Breakdown
  breakdown: {
    symptomsReported: 7,
    totalDistress: 18,
    yesCount: 7,
    noCount: 9,
    categories: [
      { name: 'Mood Elevation', value: 2, color: '#8B5CF6' },
      { name: 'Sleep Restoration', value: 1, color: '#3B82F6' },
      { name: 'Racing Thoughts', value: 2, color: '#10B981' },
      { name: 'Impulsivity & Spending', value: 1, color: '#F59E0B' },
      { name: 'Irritability & Shifts', value: 1, color: '#EF4444' }
    ]
  },

  // 3. Trend History
  trendHistory: [
    { date: 'Jun 12', score: 3, distressScore: 8 },
    { date: 'Jun 26', score: 4, distressScore: 10 },
    { date: 'Jul 10', score: 7, distressScore: 18 },
    { date: 'Jul 31', score: 7, distressScore: 18 }
  ],

  // 4. Personalized Summary
  personalizedSummary: "Your recent screening suggests a higher number of reported mood elevation and manic-like experiences compared to previous assessments. Monitoring sleep changes, energy shifts, and maintaining healthy routines may be beneficial.",

  // 5. Recommended Next Steps
  nextSteps: [
    "Schedule an appointment with a psychiatrist or clinical psychologist.",
    "Log daily mood and sleep cycles in a journal.",
    "Practice grounding and deep breathing during high-energy periods.",
    "Maintain a strict and consistent bedtime routine.",
    "Discuss results with a trusted healthcare provider."
  ],

  // 6. Find a Professional
  professionalConsult: {
    title: "Consult a Mental Health Professional",
    description: "A screening test is a helpful indicator, but it cannot diagnose any condition. Consulting a psychiatrist, psychologist, or licensed therapist is the most reliable way to obtain a proper clinical assessment, receive personalized insights, and explore supportive counseling."
  },

  // 7. Wellness & Daily Practices ("Healthy Daily Habits")
  wellnessHabits: [
    { title: "Sleep hygiene routine", description: "Establish a calming, screen-free routine 1 hour before bed.", icon: "Moon" },
    { title: "Grounding exercises", description: "Slow somatic feedback loops to anchor energy spikes.", icon: "Compass" },
    { title: "Mindfulness pacing", description: "Learn to pause and assess impulsive actions deliberately.", icon: "Smile" },
    { title: "Deep breathing", description: "Slows down heart rate and calms hyper-energetic states.", icon: "Wind" },
    { title: "Daily journal log", description: "Track mood swings, energy, and sleep duration consistently.", icon: "Activity" },
    { title: "Nutritional timing", description: "Eat regular, balanced meals to stabilize metabolic energy.", icon: "Egg" },
    { title: "Reduce stimulants", description: "Limit caffeine and other triggers that disrupt sleep.", icon: "Flame" },
    { title: "Light exercise", description: "A 20-minute daily walk to channel excess physical energy.", icon: "Heart" },
    { title: "Spending time in nature", description: "Quiet, natural settings reduce sensory overload.", icon: "Sun" },
    { title: "Support network check-in", description: "Share status updates with family or trusted friends.", icon: "Users" }
  ],

  // 8. Guided Relaxation Exercises
  relaxationExercises: [
    { name: "5-minute breathing exercise", desc: "4-7-8 deep breathing protocol to soothe racing thoughts." },
    { name: "Sensory grounding technique", desc: "5-4-3-2-1 check-in to lower hyper-arousal states." },
    { name: "Gentle somatic stretches", desc: "Releases muscle tension and calms dynamic hyperactivity." },
    { name: "Progressive muscle relaxation", desc: "Systematic tension release to induce physical calmness." },
    { name: "Ambient white noise", desc: "Calm soundscapes to aid sleep during low-tiredness periods." }
  ],

  // 9. Journaling Insights
  journaling: {
    streak: 8,
    commonThemes: [
      { theme: "Sleep duration adjustments", frequency: 15 },
      { theme: "Sudden energy spikes", frequency: 11 },
      { theme: "Impulsive spending urges", frequency: 8 },
      { theme: "Irritability triggers", frequency: 6 }
    ],
    weeklySummary: "This week's entries showed slightly shorter sleep durations but stable mood patterns. Impulsive spending or energy shifts were noted during mid-week, but overall distress has stabilized. MindWave recommends logging sleep hours diligently.",
    heatmap: [
      { day: 1, active: true }, { day: 2, active: true }, { day: 3, active: true }, { day: 4, active: true },
      { day: 5, active: true }, { day: 6, active: true }, { day: 7, active: false }, { day: 8, active: true },
      { day: 9, active: true }, { day: 10, active: true }, { day: 11, active: true }, { day: 12, active: true },
      { day: 13, active: true }, { day: 14, active: true }, { day: 15, active: false }, { day: 16, active: true },
      { day: 17, active: true }, { day: 18, active: true }, { day: 19, active: true }, { day: 20, active: true },
      { day: 21, active: true }, { day: 22, active: true }, { day: 23, active: true }, { day: 24, active: true },
      { day: 25, active: true }, { day: 26, active: true }, { day: 27, active: true }, { day: 28, active: true }
    ]
  },

  // 10. Progress Overview
  progressOverview: {
    assessmentsCompleted: 4,
    averageScore: 4.5,
  },

  // 11. Educational Resources
  educationalResources: [
    { title: "Understanding bipolar disorder phases", link: "#edu-bipolar-phases" },
    { title: "Tracking sleep & mood cycles", link: "#edu-sleep-mood" },
    { title: "Healthy pacing coping strategies", link: "#edu-coping-pacing" },
    { title: "Managing racing thoughts & speech", link: "#edu-racing-thoughts" },
    { title: "Professional therapeutic paths", link: "#edu-therapeutic" }
  ],

  // 12. Support Resources (Conditional)
  supportResources: {
    hasConcerningContent: true,
    message: "We noticed that some recent entries mentioned intense mood shifts. If you need support, help is available.",
    viewSupportLink: "#view-support",
    crisisLink: "#crisis-support"
  }
};

export const bipolarInsightsMockData = {
  pastScreenings: [
    { date: 'Jun 12', symptomCount: 3, distressScore: 8 },
    { date: 'Jun 26', symptomCount: 4, distressScore: 10 },
    { date: 'Jul 10', symptomCount: 7, distressScore: 18 },
    { date: 'Jul 31', symptomCount: 7, distressScore: 18 }
  ],
  moodCorrelation: {
    sentence: "Analysis suggests a strong correlation between sleep cycles under 5 hours and energetic/racing thought episodes."
  },
  keyPatterns: [
    { phrase: "racing thoughts", frequency: 5 },
    { phrase: "intense energy", frequency: 4 },
    { phrase: "low sleep", frequency: 4 },
    { phrase: "impulsive decisions", frequency: 2 }
  ],
  journalStreak: {
    currentStreak: 8,
    heatmap: [
      { day: 1, active: true }, { day: 2, active: true }, { day: 3, active: true }, { day: 4, active: true },
      { day: 5, active: true }, { day: 6, active: true }, { day: 7, active: false }, { day: 8, active: true },
      { day: 9, active: true }, { day: 10, active: true }, { day: 11, active: true }, { day: 12, active: true },
      { day: 13, active: true }, { day: 14, active: true }, { day: 15, active: false }, { day: 16, active: true },
      { day: 17, active: true }, { day: 18, active: true }, { day: 19, active: true }, { day: 20, active: true },
      { day: 21, active: true }, { day: 22, active: true }, { day: 23, active: true }, { day: 24, active: true },
      { day: 25, active: true }, { day: 26, active: true }, { day: 27, active: true }, { day: 28, active: true }
    ]
  },
  weeklySummary: "Mood tracking metrics reveal a period of elevated energy mid-week followed by a stabilization phase. The distress level corresponding to energetic bursts has decreased slightly relative to last month.",
  safetyCheck: {
    hasFlaggedKeywords: true,
    message: "It is important to remember that rapid cycles or intense mood swings are manageable. Discussing these trends with a certified psychologist or physician can offer clarity."
  }
};
