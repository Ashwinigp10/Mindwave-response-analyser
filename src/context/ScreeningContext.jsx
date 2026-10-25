import React, { createContext, useContext, useState, useEffect } from 'react';
import { getQuestionsForTest } from '../data/screeningData';
import { useAuth } from './AuthContext';
import { fetchMlPrediction } from '../services/mlService';

const ScreeningContext = createContext(null);
const API_BASE = 'http://localhost:5000';

export const sanitizeResultRecord = (rec) => {
  if (!rec) return null;
  const isBipolar = rec.assessment_type === 'bipolar';
  const expectedMax = isBipolar ? 15 : 16;
  
  let symptomCount = typeof rec.symptom_count === 'number' ? rec.symptom_count : null;
  let distressScore = typeof rec.distress_score === 'number' ? rec.distress_score : null;

  if (Array.isArray(rec.answers) && rec.answers.length > 0) {
    const trueAns = rec.answers.filter(a => a && a.answer === 'True');
    symptomCount = trueAns.length;
    let dist = 0;
    trueAns.forEach(a => {
      if (typeof a.followUp1 === 'number') dist += Math.max(0, Math.min(5, a.followUp1));
      if (typeof a.followUp2 === 'number') dist += Math.max(0, Math.min(5, a.followUp2));
    });
    distressScore = dist;
  } else if (symptomCount === null) {
    symptomCount = (typeof rec.score === 'number' && rec.score <= expectedMax) ? rec.score : 0;
  }

  if (distressScore === null) {
    distressScore = 0;
  }

  // Ensure symptomCount never exceeds expectedMax
  symptomCount = Math.max(0, Math.min(expectedMax, symptomCount));

  // Category: strictly more than 12 for Elevated
  let category = rec.result_category;
  if (symptomCount > 12) {
    category = 'Elevated';
  } else if (category === 'Elevated' || !category) {
    category = symptomCount >= 8 ? 'Moderate' : (symptomCount >= 4 ? 'Mild' : 'Minimal');
  }

  return {
    ...rec,
    score: symptomCount,
    maxScore: expectedMax,
    symptom_count: symptomCount,
    distress_score: distressScore,
    result_category: category
  };
};


export function ScreeningProvider({ children }) {
  const { token } = useAuth();
  const [activeTest, setActiveTest] = useState('schizophrenia'); // 'schizophrenia' | 'bipolar'
  const [ageGroup, setAgeGroup] = useState('19-25');
  const [profession, setProfession] = useState('student');
  const [questions, setQuestions] = useState(() => getQuestionsForTest('schizophrenia', '19-25', 'student'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [latestResult, setLatestResult] = useState(() => {
    try {
      const saved = localStorage.getItem('mindwave_latest_result');
      return saved ? sanitizeResultRecord(JSON.parse(saved)) : null;
    } catch {
      return null;
    }
  });
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Initialize or fetch history
  useEffect(() => {
    loadHistory();
  }, [token]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    let records = [];

    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/screenings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            records = data.map(item => ({
              id: item.id,
              assessment_type: item.assessment_type,
              symptom_count: item.symptom_count,
              distress_score: item.distress_score,
              result_category: item.result_category,
              date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent',
              answers: typeof item.answers === 'string' ? JSON.parse(item.answers) : (item.answers || [])
            }));
          }
        }
      } catch (err) {
        console.warn('Could not fetch screenings from backend:', err);
      }
    }

    if (records.length === 0) {
      try {
        const cached = localStorage.getItem('mindwave_screenings_history');
        if (cached) {
          records = JSON.parse(cached);
        }
      } catch {}
    }

    setHistory(records.map(sanitizeResultRecord));
    setLoadingHistory(false);
  };

  const startTest = (testType, newAge, newProf) => {
    const targetTest = testType || activeTest;
    const targetAge = newAge || ageGroup;
    const targetProf = newProf || profession;
    setActiveTest(targetTest);
    if (newAge) setAgeGroup(newAge);
    if (newProf) setProfession(newProf);
    setQuestions(getQuestionsForTest(targetTest, targetAge, targetProf));
    setCurrentIndex(0);
    setAnswers({});
  };

  const updateSetup = (age, prof) => {
    const targetAge = age || ageGroup;
    const targetProf = prof || profession;
    setAgeGroup(targetAge);
    setProfession(targetProf);
    setQuestions(getQuestionsForTest(activeTest, targetAge, targetProf));
    setCurrentIndex(0);
    setAnswers({});
  };


  const recordAnswer = (index, isTrue, followUps = { q1: 0, q2: 0 }) => {
    const question = questions[index];
    if (!question) return;

    setAnswers(prev => ({
      ...prev,
      [index]: {
        questionNumber: index + 1,
        questionText: question.text,
        isTrue,
        followUp1: isTrue ? followUps.q1 : null,
        followUp2: isTrue ? followUps.q2 : null
      }
    }));
  };

  const finishAssessment = async () => {
    let symptomCount = 0;
    let totalDistress = 0;
    const formattedAnswers = [];

    questions.forEach((q, idx) => {
      const ans = answers[idx];
      const isTrue = ans?.isTrue === true;
      if (isTrue) {
        symptomCount += 1;
        const d1 = typeof ans.followUp1 === 'number' ? Math.max(0, Math.min(5, ans.followUp1)) : 0;
        const d2 = typeof ans.followUp2 === 'number' ? Math.max(0, Math.min(5, ans.followUp2)) : 0;
        totalDistress += (d1 + d2);
      }
      formattedAnswers.push({
        id: q.id,
        text: q.text,
        domain: q.domain || 'Clinical Symptom Dimension',
        answer: isTrue ? 'True' : (ans?.isTrue === false ? 'False' : 'Unanswered'),
        followUp1: isTrue ? (ans?.followUp1 ?? 0) : null,
        followUp2: isTrue ? (ans?.followUp2 ?? 0) : null
      });
    });

    const isBipolar = activeTest === 'bipolar';
    const maxScore = questions.length; // Dynamically 16 for PQ-16, 15 for MDQ
    const primaryScore = symptomCount; // Validated screening score: number of endorsed symptoms

    let category = 'Minimal';
    let interpretation = '';

    if (symptomCount > 12) {
      category = 'Elevated';
      interpretation = isBipolar
        ? 'Your responses meet high clinical threshold criteria on the Mood Disorder Questionnaire (MDQ), indicating multiple co-occurring hypomanic or manic features with notable functional impact. We strongly recommend consulting a psychiatrist or licensed clinical psychologist for a formal evaluation.'
        : 'Your responses indicate an elevated likelihood of prodromal risk indicators on the Prodromal Questionnaire (PQ-16), with associated distress. A comprehensive clinical evaluation by a psychiatrist or mental health specialist is strongly advised.';
    } else if (symptomCount >= 8) {
      category = 'Moderate';
      interpretation = isBipolar
        ? 'Your responses indicate moderate endorsement of mood elevation and psychomotor activation features on the Mood Disorder Questionnaire (MDQ). Sub-threshold mood cycling or episodic energy shifts may impact daily routines, suggesting value in professional clinical consultation.'
        : 'Your responses indicate moderate likelihood of prodromal sensory or perceptual variations on the Prodromal Questionnaire (PQ-16). While not a diagnosis, exploring these patterns with a mental health professional can provide valuable clarity.';
    } else if (symptomCount >= 4) {
      category = 'Mild';
      interpretation = isBipolar
        ? 'Your responses indicate mild occasional indicators of heightened energy or mood shifts on the Mood Disorder Questionnaire (MDQ). Regular mindfulness, circadian sleep habits, and routine tracking may be beneficial.'
        : 'Your responses indicate mild occasional perceptual or cognitive indicators on the Prodromal Questionnaire (PQ-16). Routine mindfulness and healthy sleep habits may help maintain balance.';
    } else {

      category = 'Minimal';
      interpretation = isBipolar
        ? 'Your responses reflect minimal endorsement of hypomanic or manic features on the Mood Disorder Questionnaire (MDQ). Reported mood variations remain within typical baseline fluctuations.'
        : 'Your responses reflect minimal likelihood of perceptual or cognitive variations on the Prodromal Questionnaire (PQ-16). Sensory and thought processing appear stable.';
    }

    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Experimental Random Forest ML prediction
    let mlPrediction = null;
    try {
      mlPrediction = await fetchMlPrediction({
        assessmentType: activeTest,
        ageGroup,
        profession,
        answers: formattedAnswers
      });
    } catch {
      mlPrediction = {
        status: 'offline',
        is_supported: false,
        unsupported_reason: 'ML analysis is currently unavailable for this questionnaire or age group.'
      };
    }

    const resultObj = {
      assessment_type: activeTest,
      date: todayStr,
      score: primaryScore,
      maxScore: maxScore,
      symptom_count: symptomCount,
      distress_score: totalDistress,
      result_category: category,
      interpretation,
      age_group: ageGroup,
      profession,
      answers: formattedAnswers,
      ml_prediction: mlPrediction
    };

    setLatestResult(resultObj);
    localStorage.setItem('mindwave_latest_result', JSON.stringify(resultObj));

    // Save to history locally
    const newHistory = [resultObj, ...history];
    setHistory(newHistory);
    localStorage.setItem('mindwave_screenings_history', JSON.stringify(newHistory));

    // Clear session answers after completion to prevent leakage into future assessments
    setAnswers({});

    // Persist to backend if token available
    if (token) {
      try {
        await fetch(`${API_BASE}/api/screenings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            assessment_type: activeTest,
            symptom_count: symptomCount,
            distress_score: totalDistress,
            result_category: category,
            age_group: ageGroup,
            profession,
            answers: formattedAnswers
          })
        });
      } catch (err) {
        console.warn('Failed to sync assessment result to backend:', err);
      }
    }

    return resultObj;
  };

  const clearHistory = async () => {
    if (token) {
      try {
        await fetch(`${API_BASE}/api/screenings/clear`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {}
    }
    setHistory([]);
    setLatestResult(null);
    localStorage.removeItem('mindwave_screenings_history');
    localStorage.removeItem('mindwave_latest_result');
  };

  return (
    <ScreeningContext.Provider value={{
      activeTest,
      ageGroup,
      profession,
      questions,
      currentIndex,
      setCurrentIndex,
      answers,
      latestResult,
      history,
      loadingHistory,
      startTest,
      updateSetup,
      recordAnswer,
      finishAssessment,
      clearHistory
    }}>
      {children}
    </ScreeningContext.Provider>
  );
}

export function useScreening() {
  return useContext(ScreeningContext);
}
