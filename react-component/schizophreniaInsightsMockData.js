// Standalone mock data file for the Schizophrenia Screening Dashboard
// Contains data for all 13 clinical-portal dashboard sections.
// Scoped ONLY to PQ-16 Schizophrenia screening.

export const schizophreniaDashboardMockData = {
  // 1. Assessment Result (Hero Card) & Progress Overview
  hero: {
    date: "July 28, 2026",
    time: "11:30 AM",
    explanation: "Your responses fall into the elevated screening range. A score of 6 or more suggests patterns of perceptual anomalies, unusual belief patterns, or cognitive changes that cross the established clinical threshold. We recommend sharing these findings with a mental health professional for a complete diagnostic interview."
  },

  // 2. Symptom Breakdown
  breakdown: {
    symptomsReported: 7,
    totalDistress: 18,
    yesCount: 7,
    noCount: 9,
    categories: [
      { name: 'Perceptual Disturbances', value: 3, color: '#8B5CF6' },
      { name: 'Unusual Thoughts', value: 2, color: '#3B82F6' },
      { name: 'Cognitive Changes', value: 1, color: '#10B981' },
      { name: 'Social Withdrawal', value: 1, color: '#F59E0B' },
      { name: 'Suspiciousness', value: 0, color: '#EF4444' }
    ]
  },

  // 3. Trend History
  trendHistory: [
    { date: 'Jun 12', score: 4, distressScore: 10 },
    { date: 'Jun 26', score: 5, distressScore: 12 },
    { date: 'Jul 10', score: 7, distressScore: 18 },
    { date: 'Jul 28', score: 7, distressScore: 18 }
  ],

  // 4. Personalized Summary
  personalizedSummary: "Your recent screening suggests a higher number of reported psychotic-like experiences compared to previous assessments. Monitoring changes over time and maintaining healthy routines may be beneficial.",

  // 5. Recommended Next Steps
  nextSteps: [
    "Schedule an appointment with a mental health professional.",
    "Continue regular journaling.",
    "Repeat the screening after the recommended interval.",
    "Share your results with a healthcare provider if needed.",
    "Monitor any changes in symptoms."
  ],

  // 6. Find a Professional
  professionalConsult: {
    title: "Consult a Mental Health Professional",
    description: "A screening test is a helpful indicator, but it cannot diagnose any condition. Consulting a psychiatrist, psychologist, or licensed therapist is the most reliable way to obtain a proper clinical assessment, receive personalized insights, and explore supportive counseling."
  },

  // 7. Wellness & Daily Practices ("Healthy Daily Habits")
  wellnessHabits: [
    { title: "Daily walking", description: "A 20-minute daily walk supports cognitive regulation.", icon: "Activity" },
    { title: "Light stretching", description: "Releases muscle tension and improves somatic feedback.", icon: "Compass" },
    { title: "Yoga", description: "Brings mind-body alignment and grounding sensations.", icon: "Smile" },
    { title: "Deep breathing exercises", description: "Slows down heart rate and calms nervous system.", icon: "Wind" },
    { title: "Meditation", description: "Increases present-moment awareness and distress tolerance.", icon: "Heart" },
    { title: "Regular sleep schedule", description: "Ensures essential cognitive restoration and rest.", icon: "Moon" },
    { title: "Healthy meals", description: "Maintains blood sugar stability and cognitive energy.", icon: "Egg" },
    { title: "Staying hydrated", description: "Improves overall cellular health and mental focus.", icon: "Droplets" },
    { title: "Spending time outdoors", description: "Exposure to nature lowers stress and cortisol levels.", icon: "Sun" },
    { title: "Connecting with trusted family or friends", description: "Social bonds counter feelings of withdrawal.", icon: "Users" }
  ],

  // 8. Guided Relaxation Exercises
  relaxationExercises: [
    { name: "5-minute breathing exercise", desc: "4-7-8 deep breathing protocol to relieve acute tension." },
    { name: "Mindfulness practice", desc: "5-4-3-2-1 sensory awareness grounding routine." },
    { name: "Gentle stretching", desc: "Progressive neck, shoulder, and lower back release stretches." },
    { name: "Progressive muscle relaxation", desc: "Alternating tensing and relaxing major muscle groups." },
    { name: "Calm music or nature sounds", desc: "Muted natural acoustics to quiet background auditory stress." }
  ],

  // 9. Journaling Insights
  journaling: {
    streak: 6,
    commonThemes: [
      { theme: "Sleep quality adjustments", frequency: 12 },
      { theme: "Unusual sensory sensitivity", frequency: 9 },
      { theme: "Stress management techniques", frequency: 7 },
      { theme: "Social interaction comfort", frequency: 5 }
    ],
    weeklySummary: "This week's entries showed fewer mentions of unusual perceptual experiences compared to last week. There was a slight reduction in reports of feeling disconnected from surroundings, but overall emotional distress remains stable. MindWave suggests continuing to log daily to track these variations.",
    // 28 days representing the last month (4 weeks of 7 days)
    heatmap: [
      { day: 1, active: true }, { day: 2, active: true }, { day: 3, active: false }, { day: 4, active: true },
      { day: 5, active: true }, { day: 6, active: true }, { day: 7, active: false }, { day: 8, active: true },
      { day: 9, active: true }, { day: 10, active: false }, { day: 11, active: true }, { day: 12, active: true },
      { day: 13, active: true }, { day: 14, active: true }, { day: 15, active: false }, { day: 16, active: true },
      { day: 17, active: true }, { day: 18, active: true }, { day: 19, active: false }, { day: 20, active: true },
      { day: 21, active: true }, { day: 22, active: true }, { day: 23, active: true }, { day: 24, active: true },
      { day: 25, active: true }, { day: 26, active: true }, { day: 27, active: true }, { day: 28, active: true }
    ]
  },

  // 10. Progress Overview
  progressOverview: {
    assessmentsCompleted: 4,
    averageScore: 5.75,
  },

  // 11. Educational Resources
  educationalResources: [
    { title: "Understanding psychotic-like experiences", link: "#edu-psychotic" },
    { title: "When to seek professional help", link: "#edu-professional" },
    { title: "Stress management protocols", link: "#edu-stress" },
    { title: "Sleep hygiene guidelines", link: "#edu-sleep" },
    { title: "Healthy coping strategies", link: "#edu-coping" }
  ],

  // 12. Support Resources (Conditional)
  supportResources: {
    hasConcerningContent: true,
    message: "We noticed that some recent entries mentioned difficult experiences. If you feel you need support, help is available.",
    viewSupportLink: "#view-support",
    crisisLink: "#crisis-support"
  }
};

export const schizophreniaInsightsMockData = {
  pastScreenings: [
    { date: 'Jun 12', symptomCount: 4, distressScore: 10 },
    { date: 'Jun 26', symptomCount: 5, distressScore: 12 },
    { date: 'Jul 10', symptomCount: 7, distressScore: 18 },
    { date: 'Jul 28', symptomCount: 7, distressScore: 18 }
  ],
  moodCorrelation: {
    sentence: "Analysis suggests a strong correlation between sleep quality drops and subthreshold sensory sensitivities."
  },
  keyPatterns: [
    { phrase: "unusual sounds", frequency: 4 },
    { phrase: "feeling distracted", frequency: 3 },
    { phrase: "mind-body changes", frequency: 2 },
    { phrase: "unusual beliefs", frequency: 2 }
  ],
  journalStreak: {
    currentStreak: 6,
    heatmap: [
      { day: 1, active: true }, { day: 2, active: true }, { day: 3, active: false }, { day: 4, active: true },
      { day: 5, active: true }, { day: 6, active: true }, { day: 7, active: false }, { day: 8, active: true },
      { day: 9, active: true }, { day: 10, active: false }, { day: 11, active: true }, { day: 12, active: true },
      { day: 13, active: true }, { day: 14, active: true }, { day: 15, active: false }, { day: 16, active: true },
      { day: 17, active: true }, { day: 18, active: true }, { day: 19, active: false }, { day: 20, active: true },
      { day: 21, active: true }, { day: 22, active: true }, { day: 23, active: true }, { day: 24, active: true },
      { day: 25, active: true }, { day: 26, active: true }, { day: 27, active: true }, { day: 28, active: true }
    ]
  },
  weeklySummary: {
    text: "This week's entries showed fewer mentions of unusual perceptual experiences compared to last week. There was a slight reduction in reports of feeling disconnected from surroundings, but overall emotional distress remains stable. MindWave suggests continuing to log daily to track these variations."
  },
  safetyCheck: {
    hasFlaggedKeywords: true,
    message: "We noticed that some recent entries mentioned difficult experiences. If you feel you need support, help is available."
  }
};
