/* ==========================================================================
   MindWave Schizophrenia Screening Quiz (PQ-16) Client Logic
   ========================================================================== */

import React from 'react';
import ReactDOM from 'react-dom/client';
import SchizophreniaDashboard from './react-component/SchizophreniaDashboard.jsx';
import './react-component/tailwind.css';


const PQ16_QUESTIONS = [
  { id: 1, text: "I feel uninterested in the things I used to enjoy." },
  { id: 2, text: "I often seem to live through events exactly as they happened before (déjà vu)." },
  { id: 3, text: "I sometimes smell or taste things that other people can't smell or taste." },
  { id: 4, text: "I often hear unusual sounds like banging, clicking, hissing, clapping or ringing in my ears." },
  { id: 5, text: "I have been confused at times whether something I experienced was real or imaginary." },
  { id: 6, text: "When I look at a person, or look at myself in a mirror, I have seen the face change right before my eyes." },
  { id: 7, text: "I get extremely anxious when meeting people for the first time." },
  { id: 8, text: "I have seen things that other people apparently can't see." },
  { id: 9, text: "My thoughts are sometimes so strong that I can almost hear them." },
  { id: 10, text: "I sometimes see special meanings in advertisements, shop windows, or in the way things are arranged around me." },
  { id: 11, text: "Sometimes I have felt that I'm not in control of my own ideas or thoughts." },
  { id: 12, text: "Sometimes I feel suddenly distracted by distant sounds that I am not normally aware of." },
  { id: 13, text: "I have heard things other people can't hear like voices of people whispering or talking." },
  { id: 14, text: "I often feel that others have it in for me." },
  { id: 15, text: "I have had the sense that some person or force is around me, even though I could not see anyone." },
  { id: 16, text: "I feel that parts of my body have changed in some way, or that parts of my body are not working right." }
];

// Application State
let currentQuestionIndex = 0;
let userAnswers = PQ16_QUESTIONS.map(q => ({
  id: q.id,
  symptom: null,   // null, true, or false
  distress: null   // null, 0, 1, 2, 3, 4, or 5
}));

document.addEventListener('DOMContentLoaded', () => {
  const testContainer = document.getElementById('screening-test-container');
  const startBtn = document.getElementById('start-schizophrenia-btn');
  const selectionSection = document.querySelector('.tests-selection-section');

  // Check if we are on the dedicated test page or the selection menu
  if (testContainer && (!startBtn || !selectionSection)) {
    // Dedicated test page: initialize and render immediately
    currentQuestionIndex = 0;
    userAnswers = PQ16_QUESTIONS.map(q => ({
      id: q.id,
      symptom: null,
      distress: null
    }));
    renderQuizStep();
  } else {
    // Menu page: wait for button triggers
    initQuizTriggers();
  }
});

/**
 * Initializes listeners to transition from the cards menu to the quiz (fallback inline)
 */
function initQuizTriggers() {
  const startBtn = document.getElementById('start-schizophrenia-btn');
  const selectionSection = document.querySelector('.tests-selection-section');
  const testContainer = document.getElementById('screening-test-container');

  if (!startBtn || !selectionSection || !testContainer) return;

  startBtn.addEventListener('click', () => {
    // Hide the selection grid
    selectionSection.classList.add('hidden');
    testContainer.classList.remove('hidden');

    // Reset state
    currentQuestionIndex = 0;
    userAnswers = PQ16_QUESTIONS.map(q => ({
      id: q.id,
      symptom: null,
      distress: null
    }));

    renderQuizStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Renders the current question and form elements
 */
function renderQuizStep() {
  const testContainer = document.getElementById('screening-test-container');
  if (!testContainer) return;

  const currentQuestion = PQ16_QUESTIONS[currentQuestionIndex];
  const currentState = userAnswers[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / PQ16_QUESTIONS.length) * 100);

  // Check if "Next" button should be enabled
  const isSymptomAnswered = currentState.symptom !== null;
  const isDistressRequired = currentState.symptom === true;
  const isDistressAnswered = currentState.distress !== null;
  const isNextDisabled = !isSymptomAnswered || (isDistressRequired && !isDistressAnswered);

  testContainer.innerHTML = `
    <div class="screening-quiz-card glass">
      <!-- Header Progress section -->
      <div class="quiz-header">
        <div class="quiz-progress-text">
          <span class="quiz-test-tag">Schizophrenia Screening (PQ-16)</span>
          <span class="quiz-progress-counter">Question ${currentQuestionIndex + 1} of ${PQ16_QUESTIONS.length}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <!-- Question Content -->
      <div class="quiz-question-container fade-in-up">
        <h2 class="quiz-question-text" id="question-${currentQuestion.id}">
          ${currentQuestion.text}
        </h2>

        <!-- True/False Toggle Buttons -->
        <div class="quiz-toggle-group" role="radiogroup" aria-labelledby="question-${currentQuestion.id}">
          <button 
            type="button" 
            class="quiz-toggle-btn btn-tf-true ${currentState.symptom === true ? 'active' : ''}" 
            role="radio" 
            aria-checked="${currentState.symptom === true}"
            id="opt-true"
          >
            True
          </button>
          <button 
            type="button" 
            class="quiz-toggle-btn btn-tf-false ${currentState.symptom === false ? 'active' : ''}" 
            role="radio" 
            aria-checked="${currentState.symptom === false}"
            id="opt-false"
          >
            False
          </button>
        </div>

        <!-- Distress Rating Follow-Up (Revealed dynamically) -->
        <div class="quiz-distress-section ${currentState.symptom === true ? 'visible' : ''}" id="distress-container">
          <h3 class="quiz-distress-title">To what extent do you feel that?</h3>
          <div class="quiz-distress-options" role="radiogroup" aria-label="Distress rating">
            ${[
      { label: 'None', score: 0 },
      { label: 'Very Mild', score: 1 },
      { label: 'Mild', score: 2 },
      { label: 'Moderate', score: 3 },
      { label: 'Severe', score: 4 },
      { label: 'Extreme', score: 5 }
    ].map(opt => `
              <button 
                type="button" 
                class="distress-btn ${currentState.distress === opt.score ? 'active' : ''}"
                data-score="${opt.score}"
                role="radio"
                aria-checked="${currentState.distress === opt.score}"
              >
                <span class="distress-score">${opt.score}</span>
                <span class="distress-label">${opt.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Footer Navigation Buttons -->
      <div class="quiz-footer">
        <button type="button" class="btn btn-secondary nav-btn-prev" id="quiz-btn-prev" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
          <svg class="nav-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        
        <button 
          type="button" 
          class="btn btn-primary nav-btn-next" 
          id="quiz-btn-next" 
          ${isNextDisabled ? 'disabled' : ''}
        >
          <span>${currentQuestionIndex === PQ16_QUESTIONS.length - 1 ? 'Submit Test' : 'Next'}</span>
          <svg class="nav-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Attach event handlers
  setupStepInteractions();
}

/**
 * Attaches event listeners for options selection and navigation
 */
function setupStepInteractions() {
  const optTrue = document.getElementById('opt-true');
  const optFalse = document.getElementById('opt-false');
  const prevBtn = document.getElementById('quiz-btn-prev');
  const nextBtn = document.getElementById('quiz-btn-next');
  const distressContainer = document.getElementById('distress-container');
  const distressBtns = document.querySelectorAll('.distress-btn');

  if (!optTrue || !optFalse || !nextBtn || !prevBtn) return;

  // Toggle "True"
  optTrue.addEventListener('click', () => {
    userAnswers[currentQuestionIndex].symptom = true;
    optTrue.classList.add('active');
    optTrue.setAttribute('aria-checked', 'true');
    optFalse.classList.remove('active');
    optFalse.setAttribute('aria-checked', 'false');

    // Show distress container with animation
    distressContainer.classList.add('visible');

    // Re-render navigation button state
    updateNavigationButtonState();
  });

  // Toggle "False"
  optFalse.addEventListener('click', () => {
    userAnswers[currentQuestionIndex].symptom = false;
    userAnswers[currentQuestionIndex].distress = 0; // Automatically 0 distress if False
    optFalse.classList.add('active');
    optFalse.setAttribute('aria-checked', 'true');
    optTrue.classList.remove('active');
    optTrue.setAttribute('aria-checked', 'false');

    // Reset distress active selections
    distressBtns.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-checked', 'false');
    });

    // Hide distress container
    distressContainer.classList.remove('visible');

    // Re-render navigation button state
    updateNavigationButtonState();
  });

  // Distress score buttons
  distressBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const score = parseInt(btn.getAttribute('data-score'), 10);
      userAnswers[currentQuestionIndex].distress = score;

      distressBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      updateNavigationButtonState();
    });
  });

  // Navigation handlers
  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuizStep();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < PQ16_QUESTIONS.length - 1) {
      currentQuestionIndex++;
      renderQuizStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      submitQuiz();
    }
  });
}

/**
 * Dynamically updates the "Next" button disabled status based on selections
 */
function updateNavigationButtonState() {
  const nextBtn = document.getElementById('quiz-btn-next');
  if (!nextBtn) return;

  const currentState = userAnswers[currentQuestionIndex];
  const isSymptomAnswered = currentState.symptom !== null;
  const isDistressRequired = currentState.symptom === true;
  const isDistressAnswered = currentState.distress !== null;
  const isNextDisabled = !isSymptomAnswered || (isDistressRequired && !isDistressAnswered);

  nextBtn.disabled = isNextDisabled;
}

/**
 * Calculates scores and shows results screen
 */
function submitQuiz() {
  // Symptom count: number of "True" answers
  const symptomCount = userAnswers.filter(ans => ans.symptom === true).length;
  // Distress score: sum of all distress scores (only counted if symptom is true)
  const totalDistress = userAnswers.reduce((sum, ans) => {
    if (ans.symptom === true && ans.distress !== null) {
      return sum + ans.distress;
    }
    return sum;
  }, 0);

  const isElevated = symptomCount >= 6;

  // Save to localStorage for Dashboard integration
  localStorage.setItem('mindwave_schiz_taken', 'true');
  localStorage.setItem('mindwave_schiz_symptomCount', symptomCount);
  localStorage.setItem('mindwave_schiz_totalExtent', totalDistress);
  const options = { month: 'short', day: 'numeric' };
  const dateStr = new Date().toLocaleDateString('en-US', options);
  localStorage.setItem('mindwave_schiz_date', dateStr);

  // Maintain historical screenings in localStorage
  try {
    const rawHist = localStorage.getItem('mindwave_schiz_history');
    let historyArr = rawHist ? JSON.parse(rawHist) : [];
    // Avoid duplicate entry if submitted in same minute with same score
    const lastEntry = historyArr[historyArr.length - 1];
    if (!lastEntry || lastEntry.score !== symptomCount || lastEntry.distressScore !== totalDistress || lastEntry.date !== dateStr) {
      historyArr.push({
        date: dateStr,
        score: symptomCount,
        distressScore: totalDistress,
        timestamp: Date.now()
      });
      localStorage.setItem('mindwave_schiz_history', JSON.stringify(historyArr));
    }
  } catch (e) {
    console.error('Error saving history record:', e);
  }

  renderResults(symptomCount, totalDistress, isElevated);
}

/**
 * Renders the results screen content
 */
function renderResults(symptomCount, totalDistress, isElevated) {
  const testContainer = document.getElementById('screening-test-container');
  if (!testContainer) return;

  // Change body class to support the medical dashboard dark theme styles
  document.body.className = "dashboard-body-layout medical-dashboard-active bg-[#0B1220]";

  // Mount the React Dashboard component!
  const root = ReactDOM.createRoot(testContainer);
  root.render(
    React.createElement(SchizophreniaDashboard, {
      symptomsCount: symptomCount,
      severityScore: totalDistress,
      answers: userAnswers,
      onRetake: () => {
        root.unmount();
        // Reset vanilla test state
        currentQuestionIndex = 0;
        userAnswers = PQ16_QUESTIONS.map(q => ({
          id: q.id,
          symptom: null,
          distress: null
        }));
        document.body.className = "screening-page-body"; // Revert body class
        renderQuizStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onHome: () => {
        window.location.href = '/';
      },
      patientName: localStorage.getItem('mindwave_user') || 'Dhruthi M'
    })
  );
}


