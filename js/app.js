// FIFA Men's World Cup Quiz - Presenter Mode Logic

// Prevent crashes if Lucide CDN is offline
if (typeof window.lucide === 'undefined') {
  window.lucide = {
    createIcons: () => { console.warn("Lucide CDN is offline. Icons fallback activated."); }
  };
}

// ================= 1. APPLICATION STATE ================= //
let gameState = {
  currentRound: null,         // 'round1' or 'round2'
  currentRoundName: '',       // 'First Round' or 'Final Round'
  questions: [],              // Reference to current active questions array
  currentIndex: 0,            // Current question index
  teams: [],                  // Array of team objects: { name: "Team Name", score: 0 }
  timeRemaining: 30,          // Countdown value
  timerId: null,              // Timer interval ID
  stage: 'LOADED',            // 'LOADED', 'RUNNING', 'REVEALED'
  teamCount: 3,               // Default team count
  isTiebreakerMode: false,    // Sudden death tiebreaker flag
  tiebreakerIndex: 0          // Active tiebreaker question index
};


// Audio files
const countdownAudio = new Audio('countdown music.mpeg');
countdownAudio.loop = true;

const tenSecondsAudio = new Audio('marcshake-countdown-122700.mp3');

function stopCountdownAudio() {
  if (countdownAudio) {
    countdownAudio.pause();
    countdownAudio.currentTime = 0;
  }
  if (tenSecondsAudio) {
    tenSecondsAudio.pause();
    tenSecondsAudio.currentTime = 0;
  }
}

// SVG Circle Constants
const TIMER_CIRCUMFERENCE = 213.6; // 2 * PI * 34

// ================= 2. DOM ELEMENTS ================= //
const DOM = {
  // Screens
  landingPage: document.getElementById('landing-page'),
  quizPage: document.getElementById('quiz-page'),
  resultsPage: document.getElementById('results-page'),
  tiebreakerPage: document.getElementById('tiebreaker-page'),
  tiebreakerIntroPage: document.getElementById('tiebreaker-intro-page'),
  
  // Setup inputs
  teamsQtyDisplay: document.getElementById('teams-qty-display'),
  btnQtyDec: document.getElementById('btn-qty-dec'),
  btnQtyInc: document.getElementById('btn-qty-inc'),
  teamInputsContainer: document.getElementById('team-inputs-container'),
  
  // Selection Buttons
  btnSelectRound2: document.getElementById('btn-select-round2'),
  
  // Lobby Scoreboard Elements (Legacy compatibility or setup hooks)
  landingScoreboardBox: document.getElementById('landing-scoreboard-box'),
  setupConfigPanel: document.getElementById('setup-config-panel'),
  btnLaunchTiebreaker: document.getElementById('btn-launch-tiebreaker'),
  btnResetScoreboard: document.getElementById('btn-reset-scoreboard'),
  tiebreakerLobbyBanner: document.getElementById('tiebreaker-lobby-banner'),
  regularChampionshipBanner: document.getElementById('regular-championship-banner'),

  // Quiz Presenter Elements
  currentQuestionNum: document.getElementById('current-question-num'),
  totalQuestionsNum: document.getElementById('total-questions-num'),
  quizRoundIndicator: document.getElementById('quiz-round-indicator'),
  timerCountdown: document.getElementById('timer-countdown'),
  timerProgressRing: document.getElementById('timer-progress-ring'),
  timerContainer: document.querySelector('#quiz-page .timer-container'),
  quizProgressFill: document.getElementById('quiz-progress-fill'),
  questionText: document.getElementById('question-text'),
  optionsPlaceholder: document.getElementById('options-placeholder'),
  optionsContainer: document.getElementById('options-container'),
  explanationBox: document.getElementById('explanation-box'),
  explanationText: document.getElementById('explanation-text'),
  sidebarScoreboardContainer: document.getElementById('sidebar-scoreboard-container'),
  
  // Question Image Elements
  questionImageWrapper: document.getElementById('question-image-wrapper'),
  questionImg: document.getElementById('question-img'),
  questionImageMask: document.getElementById('question-image-mask'),
  
  // Host Buttons
  btnRevealOptions: document.getElementById('btn-reveal-options'),
  btnRevealAnswer: document.getElementById('btn-reveal-answer'),
  btnNextQuestion: document.getElementById('btn-next-question'),
  btnQuitQuiz: document.getElementById('btn-quit-quiz'),
  
  // Tiebreaker Page Elements
  tiebreakerCurrentQuestionNum: document.getElementById('tiebreaker-current-question-num'),
  tiebreakerTimerCountdown: document.getElementById('tiebreaker-timer-countdown'),
  tiebreakerTimerProgressRing: document.getElementById('tiebreaker-timer-progress-ring'),
  tiebreakerTimerContainer: document.querySelector('#tiebreaker-page .timer-container'),
  tiebreakerQuestionText: document.getElementById('tiebreaker-question-text'),
  tiebreakerOptionsPlaceholder: document.getElementById('tiebreaker-options-placeholder'),
  tiebreakerOptionsContainer: document.getElementById('tiebreaker-options-container'),
  tiebreakerExplanationBox: document.getElementById('tiebreaker-explanation-box'),
  tiebreakerExplanationText: document.getElementById('tiebreaker-explanation-text'),
  tiebreakerSidebarScoreboardContainer: document.getElementById('tiebreaker-sidebar-scoreboard-container'),
  tiebreakerBtnRevealOptions: document.getElementById('tiebreaker-btn-reveal-options'),
  tiebreakerBtnRevealAnswer: document.getElementById('tiebreaker-btn-reveal-answer'),
  tiebreakerBtnNextQuestion: document.getElementById('tiebreaker-btn-next-question'),
  tiebreakerBtnQuitQuiz: document.getElementById('tiebreaker-btn-quit-quiz'),

  // Results / Victory Ceremony elements
  btnReturnLobby: document.getElementById('btn-return-lobby'),
  btnTriggerCelebration: document.getElementById('btn-trigger-celebration'),
  resultsExtraRankingsBox: document.getElementById('results-extra-rankings-box'),
  resultsFinalLeaderboardList: document.getElementById('results-final-leaderboard-list'),
  resultsReviewAccordionContainer: document.getElementById('results-review-accordion-container'),

  // Tiebreaker Intro matchmaking elements
  btnEnterBattleground: document.getElementById('btn-enter-battleground'),
  btnReviewRules: document.getElementById('btn-review-rules'),
  btnTiebreakerBackLobby: document.getElementById('btn-tiebreaker-back-lobby'),
  tiebreakerTeamNameA: document.getElementById('tiebreaker-team-name-a'),
  tiebreakerTeamNameB: document.getElementById('tiebreaker-team-name-b'),
  tiebreakerScoresDisplay: document.getElementById('tiebreaker-scores-display'),

  // Canvas / Theme
  confettiCanvas: document.getElementById('confetti-canvas'),
  footerThemeToggle: document.getElementById('footer-theme-toggle'),

  // Standings Chart
  standingsChartPage: document.getElementById('standings-chart-page'),
  btnProceedToTiebreaker: document.getElementById('btn-proceed-to-tiebreaker')
};

// Default Group Names
const DEFAULT_GROUP_NAMES = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"];

// ================= 3. INITS & EVENT LISTENERS ================= //
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();

  // Initialize Lucide icons
  lucide.createIcons();
  
  // Qty selectors
  if (DOM.btnQtyDec) DOM.btnQtyDec.addEventListener('click', () => adjustTeamQuantity(-1));
  if (DOM.btnQtyInc) DOM.btnQtyInc.addEventListener('click', () => adjustTeamQuantity(1));
  
  // Generate default team inputs
  generateTeamInputs();
  
  // Round selection handlers
  if (DOM.btnSelectRound2) {
    DOM.btnSelectRound2.addEventListener('click', () => startPresenterQuiz('round2'));
    DOM.btnSelectRound2.addEventListener('keydown', (e) => { if (e.key === 'Enter') startPresenterQuiz('round2'); });
  }

  // Host Action Buttons
  if (DOM.btnRevealOptions) DOM.btnRevealOptions.addEventListener('click', revealOptionsAndStartTimer);
  if (DOM.btnRevealAnswer) DOM.btnRevealAnswer.addEventListener('click', revealCorrectAnswer);
  if (DOM.btnNextQuestion) DOM.btnNextQuestion.addEventListener('click', nextPresenterQuestion);
  
  // Quiz Control Handlers
  if (DOM.btnQuitQuiz) DOM.btnQuitQuiz.addEventListener('click', quitPresenterQuiz);
  if (DOM.btnRetryRound) DOM.btnRetryRound.addEventListener('click', retryPresenterRound);
  if (DOM.btnHome) DOM.btnHome.addEventListener('click', showLandingPage);

  // Lobby Scoreboard Control Listeners
  if (DOM.btnLaunchTiebreaker) {
    DOM.btnLaunchTiebreaker.addEventListener('click', startTiebreakerMode);
  }
  if (DOM.btnResetScoreboard) {
    DOM.btnResetScoreboard.addEventListener('click', resetChampionshipScoreboard);
  }

  // Tiebreaker Page Action Button Registers
  if (DOM.tiebreakerBtnRevealOptions) {
    DOM.tiebreakerBtnRevealOptions.addEventListener('click', revealTiebreakerOptionsAndStartTimer);
  }
  if (DOM.tiebreakerBtnRevealAnswer) {
    DOM.tiebreakerBtnRevealAnswer.addEventListener('click', revealTiebreakerCorrectAnswer);
  }
  if (DOM.tiebreakerBtnNextQuestion) {
    DOM.tiebreakerBtnNextQuestion.addEventListener('click', nextTiebreakerQuestion);
  }
  if (DOM.tiebreakerBtnQuitQuiz) {
    DOM.tiebreakerBtnQuitQuiz.addEventListener('click', quitTiebreaker);
  }

  // Results / Victory Ceremony Screen Listeners
  if (DOM.btnReturnLobby) {
    DOM.btnReturnLobby.addEventListener('click', showLandingPage);
  }
  if (DOM.btnTriggerCelebration) {
    DOM.btnTriggerCelebration.addEventListener('click', startConfetti);
  }

  // Tiebreaker Intro Screen Matchmaking Listeners
  if (DOM.btnEnterBattleground) {
    DOM.btnEnterBattleground.addEventListener('click', startTiebreakerMode);
  }
  if (DOM.btnReviewRules) {
    DOM.btnReviewRules.addEventListener('click', () => {
      alert("Sudden Death Rules:\n1. Host reveals questions one at a time.\n2. The first team to answer correctly when the other misses wins the Championship.\n3. Continue sudden death questions until the tie is resolved.");
    });
  }
  if (DOM.btnTiebreakerBackLobby) {
    DOM.btnTiebreakerBackLobby.addEventListener('click', showLandingPage);
  }
  if (DOM.btnProceedToTiebreaker) {
    DOM.btnProceedToTiebreaker.addEventListener('click', () => {
      switchSection(DOM.tiebreakerIntroPage);
    });
  }
  
  // Set video speed to 1.4x
  const video = document.getElementById('landing-logo-video');
  if (video) {
    video.playbackRate = 1.4;
    video.defaultPlaybackRate = 1.4;
  }

  // Resize handler for canvas
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Theme Switcher Event Listener
  if (DOM.footerThemeToggle) {
    DOM.footerThemeToggle.addEventListener('click', toggleTheme);
  }
});

// ================= 4. TEAM CONFIGURATION ================= //
function adjustTeamQuantity(delta) {
  const newCount = gameState.teamCount + delta;
  if (newCount >= 2 && newCount <= 6) {
    // Save current values in the inputs to preserve typed names
    const currentTypedNames = [];
    const inputs = DOM.teamInputsContainer.querySelectorAll('.team-input');
    inputs.forEach(inp => currentTypedNames.push(inp.value.trim()));
    
    gameState.teamCount = newCount;
    DOM.teamsQtyDisplay.textContent = newCount;
    
    generateTeamInputs(currentTypedNames);
  }
}

function generateTeamInputs(presetNames = []) {
  DOM.teamInputsContainer.innerHTML = '';
  
  for (let i = 0; i < gameState.teamCount; i++) {
    const defaultName = presetNames[i] || DEFAULT_GROUP_NAMES[i] || `Group ${i + 1}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center gap-3 bg-surface-container-low border border-white/5 px-4 py-3 rounded-lg';
    
    wrapper.innerHTML = `
      <span class="material-symbols-outlined text-primary">sports_soccer</span>
      <input type="text" class="team-input bg-transparent border-0 p-0 focus:ring-0 text-on-surface placeholder-on-surface-variant/40 w-full" placeholder="Group ${i + 1} Name" required>
    `;
    
    // Set value safely
    wrapper.querySelector('.team-input').value = defaultName;
    
    DOM.teamInputsContainer.appendChild(wrapper);
  }
}

// ================= 5. SECTIONS NAVIGATION ================= //
function switchSection(targetSection) {
  const sections = [DOM.landingPage, DOM.quizPage, DOM.resultsPage, DOM.tiebreakerPage, DOM.tiebreakerIntroPage, DOM.standingsChartPage];
  
  sections.forEach(sec => {
    if (sec) {
      sec.classList.add('hidden');
      sec.classList.remove('active');
    }
  });

  if (targetSection) {
    targetSection.classList.remove('hidden');
    targetSection.offsetHeight; // force repaint
    targetSection.classList.add('active');
  }
  
  lucide.createIcons();
}

function showLandingPage() {
  stopConfetti();
  switchSection(DOM.landingPage);
}

function resetChampionshipScoreboard() {
  if (DOM.landingScoreboardBox) DOM.landingScoreboardBox.classList.add('hidden');
  if (DOM.setupConfigPanel) DOM.setupConfigPanel.classList.remove('hidden');
  const lobbyReviewWrapper = document.getElementById('lobby-accordion-review-wrapper');
  if (lobbyReviewWrapper) lobbyReviewWrapper.style.display = 'none';
  // Reset scores
  gameState.teams.forEach(t => t.score = 0);
  renderSidebarScoreboard();
}

// ================= 6. PRESENTER QUIZ GAMEPLAY ================= //
function startPresenterQuiz(roundKey) {
  // Hide landing scoreboard, show setup inputs
  if (DOM.landingScoreboardBox) DOM.landingScoreboardBox.classList.add('hidden');
  if (DOM.setupConfigPanel) DOM.setupConfigPanel.classList.remove('hidden');
  const lobbyReviewWrapper = document.getElementById('lobby-accordion-review-wrapper');
  if (lobbyReviewWrapper) lobbyReviewWrapper.style.display = 'none';

  gameState.currentRound = roundKey;
  gameState.isTiebreakerMode = false;
  gameState.tiebreakerIndex = 0;
  
  // Reset labels
  const trackerLabel = document.querySelector('.question-tracker .label');
  if (trackerLabel) {
    trackerLabel.textContent = "Question";
  }
  DOM.quizRoundIndicator.style.background = '';
  DOM.quizRoundIndicator.style.color = '';
  DOM.quizRoundIndicator.style.borderColor = '';
  
  const span = DOM.btnNextQuestion.querySelector('span');
  if (span) span.textContent = "Next Question";
  const icon = DOM.btnNextQuestion.querySelector('i');
  if (icon) {
    icon.setAttribute('data-lucide', 'arrow-right');
    lucide.createIcons();
  }
  
  // Set questions and names
  if (roundKey === 'round1') {
    gameState.currentRoundName = 'First Round';
    gameState.questions = [...ROUND_1_QUESTIONS];
  } else {
    gameState.currentRoundName = 'Final Round';
    gameState.questions = [...ROUND_2_QUESTIONS];
  }
  
  // Parse team names from inputs and reset scores
  gameState.teams = [];
  lastScoreAdjustTimes = {};
  const inputs = DOM.teamInputsContainer.querySelectorAll('.team-input');
  inputs.forEach((inp, index) => {
    const name = inp.value.trim() || `Group ${index + 1}`;
    gameState.teams.push({ name: name, score: 0 });
  });
  
  gameState.currentIndex = 0;
  gameState.stage = 'LOADED';
  
  // Setup DOM question sizes
  DOM.totalQuestionsNum.textContent = gameState.questions.length;
  DOM.quizRoundIndicator.textContent = gameState.currentRoundName;
  
  // Populate Sidebar Scoreboard
  renderSidebarScoreboard();
  
  // Switch Screen
  switchSection(DOM.quizPage);
  
  // Load question
  loadPresenterQuestion();
}

function retryPresenterRound() {
  stopConfetti();
  stopCountdownAudio();
  if (gameState.currentRound) {
    gameState.isTiebreakerMode = false;
    gameState.tiebreakerIndex = 0;
    
    // Reset labels
    const trackerLabel = document.querySelector('.question-tracker .label');
    if (trackerLabel) {
      trackerLabel.textContent = "Question";
    }
    DOM.quizRoundIndicator.style.background = '';
    DOM.quizRoundIndicator.style.color = '';
    DOM.quizRoundIndicator.style.borderColor = '';
    
    const span = DOM.btnNextQuestion.querySelector('span');
    if (span) span.textContent = "Next Question";
    const icon = DOM.btnNextQuestion.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', 'arrow-right');
      lucide.createIcons();
    }
    
    // Retain previous team names, reset scores to 0
    gameState.teams.forEach(t => t.score = 0);
    lastScoreAdjustTimes = {};
    gameState.currentIndex = 0;
    gameState.stage = 'LOADED';
    
    renderSidebarScoreboard();
    switchSection(DOM.quizPage);
    loadPresenterQuestion();
  } else {
    showLandingPage();
  }
}

function quitPresenterQuiz() {
  clearInterval(gameState.timerId);
  stopCountdownAudio();
  showLandingPage();
}

// ================= 7. PRESENTER STAGE TRANSITIONS ================= //
function loadPresenterQuestion() {
  const currentQuestion = gameState.questions[gameState.currentIndex];
  gameState.stage = 'LOADED';
  
  // Timer Reset
  clearInterval(gameState.timerId);
  gameState.timeRemaining = 30;
  DOM.timerContainer.classList.remove('warning');
  updateTimerRingUI();
  DOM.timerCountdown.textContent = '30';
  
  // Progress Bar
  const total = gameState.questions.length;
  const progressPercent = (gameState.currentIndex / total) * 100;
  DOM.quizProgressFill.style.width = `${progressPercent}%`;
  DOM.currentQuestionNum.textContent = gameState.currentIndex + 1;
  
  // Text content
  DOM.questionText.textContent = currentQuestion.question;
  
  // Image handling
  if (currentQuestion.image) {
    DOM.questionImg.src = currentQuestion.image;
    DOM.questionImageWrapper.classList.remove('hidden');
    if (DOM.questionImageMask) {
      DOM.questionImageMask.style.display = currentQuestion.hideFace ? 'block' : 'none';
      DOM.questionImageMask.style.opacity = '1';
    }
  } else {
    DOM.questionImageWrapper.classList.add('hidden');
    DOM.questionImg.src = '';
  }
  
  // Manage visibility states
  DOM.optionsPlaceholder.style.display = 'flex';
  const placeholderText = DOM.optionsPlaceholder.querySelector('p');
  if (placeholderText) {
    placeholderText.textContent = 'Options are hidden. Click "Reveal Options" when you are ready to start the timer.';
  }
  const placeholderIcon = DOM.optionsPlaceholder.querySelector('i');
  if (placeholderIcon) {
    placeholderIcon.setAttribute('data-lucide', 'eye-off');
    lucide.createIcons();
  }
  DOM.optionsContainer.classList.add('hidden');
  DOM.optionsContainer.innerHTML = '';
  
  DOM.explanationBox.classList.add('hidden');
  
  // Configure host buttons
  DOM.btnRevealOptions.disabled = false;
  DOM.btnRevealAnswer.disabled = true;
  DOM.btnNextQuestion.disabled = true;
}

function revealOptionsAndStartTimer() {
  if (gameState.stage !== 'LOADED') return;
  gameState.stage = 'RUNNING';
  
  const currentQuestion = gameState.isTiebreakerMode
    ? TIEBREAKER_QUESTIONS[gameState.tiebreakerIndex]
    : gameState.questions[gameState.currentIndex];
  
  // Reveal the options grid
  DOM.optionsPlaceholder.style.display = 'none';
  DOM.optionsContainer.classList.remove('hidden');
  DOM.optionsContainer.innerHTML = '';
  
  currentQuestion.options.forEach((optText, index) => {
    const letter = String.fromCharCode(65 + index); // A, B, C, D
    const button = document.createElement('button');
    button.className = 'option-btn font-body-lg text-body-lg text-surface-dim dark:text-on-surface border border-white/10 hover:border-primary/40 hover:bg-white/5 transition-all w-full text-left flex items-center gap-4 p-4 rounded-lg cursor-pointer';
    button.innerHTML = `
      <span class="option-letter bg-primary/10 text-primary border border-primary/20 flex items-center justify-center w-10 h-10 rounded font-bold font-headline-md">${letter}</span>
      <span class="option-text flex-grow"></span>
      <span class="option-icon flex items-center justify-center w-6 h-6"></span>
    `;
    
    // Safely assign text
    button.querySelector('.option-text').textContent = optText;
    
    DOM.optionsContainer.appendChild(button);
  });
  
  lucide.createIcons();
  
  // Configure host buttons
  DOM.btnRevealOptions.disabled = true;
  DOM.btnRevealAnswer.disabled = false;
  DOM.btnNextQuestion.disabled = true;
  
  // Trigger Timer countdown
  startPresenterTimer();
}

function startPresenterTimer() {
  gameState.timeRemaining = 30;
  updateTimerRingUI();
  
  // Play countdown music
  if (countdownAudio) {
    countdownAudio.currentTime = 0;
    countdownAudio.play().catch(err => console.log("Audio playback failed: user interaction required first.", err));
  }
  
  gameState.timerId = setInterval(() => {
    gameState.timeRemaining--;
    updateTimerRingUI();
    
    if (gameState.timeRemaining === 10) {
      if (countdownAudio) {
        countdownAudio.pause();
      }
      if (tenSecondsAudio) {
        tenSecondsAudio.currentTime = 0;
        tenSecondsAudio.play().catch(err => console.log("Warning audio playback blocked:", err));
      }
    }
    
    if (gameState.timeRemaining <= 10) {
      DOM.timerContainer.classList.add('warning');
    }
    
    if (gameState.timeRemaining <= 0) {
      clearInterval(gameState.timerId);
      stopCountdownAudio();
      // Auto transition to stop timer, and hide options
      DOM.timerCountdown.textContent = "⏱️";
      DOM.timerContainer.classList.remove('warning');
      
      // Hide options and show timeout placeholder text
      DOM.optionsContainer.classList.add('hidden');
      DOM.optionsPlaceholder.style.display = 'flex';
      const placeholderText = DOM.optionsPlaceholder.querySelector('p');
      if (placeholderText) {
        placeholderText.textContent = "Time's up! Options are hidden. Click 'Reveal Correct Answer' to display the results.";
      }
      const placeholderIcon = DOM.optionsPlaceholder.querySelector('i');
      if (placeholderIcon) {
        placeholderIcon.setAttribute('data-lucide', 'timer-off');
        lucide.createIcons();
      }
      
      // Let the host manually reveal the correct answer next
      DOM.btnRevealAnswer.disabled = false;
    }
  }, 1000);
}

function updateTimerRingUI() {
  DOM.timerCountdown.textContent = gameState.timeRemaining;
  const progressRatio = gameState.timeRemaining / 30;
  const offset = TIMER_CIRCUMFERENCE - (progressRatio * TIMER_CIRCUMFERENCE);
  DOM.timerProgressRing.style.strokeDashoffset = offset;
}

function revealCorrectAnswer() {
  // Can be revealed from RUNNING, or if the timer timed out
  if (gameState.stage !== 'RUNNING') return;
  gameState.stage = 'REVEALED';
  
  clearInterval(gameState.timerId);
  stopCountdownAudio();
  DOM.timerContainer.classList.remove('warning');
  DOM.timerCountdown.textContent = "✓";
  
  // Make sure options are visible and placeholder is hidden
  DOM.optionsPlaceholder.style.display = 'none';
  DOM.optionsContainer.classList.remove('hidden');
  
  const currentQuestion = gameState.isTiebreakerMode
    ? TIEBREAKER_QUESTIONS[gameState.tiebreakerIndex]
    : gameState.questions[gameState.currentIndex];
  const correctIdx = currentQuestion.correctIndex;
  
  // Highlight correct option and dim incorrect options
  const optionButtons = DOM.optionsContainer.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, idx) => {
    if (idx === correctIdx) {
      btn.classList.add('correct-answer-reveal');
      btn.querySelector('.option-icon').innerHTML = '<i data-lucide="check-circle-2"></i>';
    } else {
      btn.classList.add('incorrect-reveal');
      btn.querySelector('.option-icon').innerHTML = '';
    }
  });
  
  // Fade out face mask to reveal player
  if (DOM.questionImageMask) {
    DOM.questionImageMask.style.opacity = '0';
  }
  
  lucide.createIcons();
  
  // Display explanation/fact
  DOM.explanationText.textContent = currentQuestion.explanation;
  DOM.explanationBox.classList.remove('hidden');
  
  // Configure host buttons
  DOM.btnRevealOptions.disabled = true;
  DOM.btnRevealAnswer.disabled = true;
  DOM.btnNextQuestion.disabled = false;
}

function nextPresenterQuestion() {
  if (gameState.stage !== 'REVEALED') return;
  
  if (gameState.isTiebreakerMode) {
    if (gameState.tiebreakerIndex >= 4 || gameState.tiebreakerIndex >= TIEBREAKER_QUESTIONS.length - 1) {
      showFinalResults();
    } else {
      gameState.tiebreakerIndex++;
      loadTiebreakerQuestion();
    }
    return;
  }
  
  gameState.currentIndex++;
  
  if (gameState.currentIndex < gameState.questions.length) {
    loadPresenterQuestion();
  } else {
    // End of normal round questions
    showFinalResults();
  }
}

// ================= 8. SCOREBOARD SYSTEM ================= //
// Helper to calculate current ranks of teams (accounting for ties)
function getTeamRanks() {
  const sorted = gameState.teams
    .map((t, idx) => ({ score: t.score, idx: idx }))
    .sort((a, b) => b.score - a.score);
  
  const ranks = new Array(gameState.teams.length);
  let currentRank = 1;
  let prevScore = -1;
  
  sorted.forEach((item, index) => {
    if (item.score !== prevScore) {
      currentRank = index + 1;
    }
    ranks[item.idx] = currentRank;
    prevScore = item.score;
  });
  return ranks;
}

function renderSidebarScoreboard() {
  DOM.sidebarScoreboardContainer.innerHTML = '';
  
  const ranks = getTeamRanks();
  
  gameState.teams.forEach((team, index) => {
    const r = ranks[index];
    const suffix = (r === 1) ? '1st' : (r === 2) ? '2nd' : (r === 3) ? '3rd' : `${r}th`;
    const badgeClass = (r === 1) ? 'rank-1' : (r === 2) ? 'rank-2' : (r === 3) ? 'rank-3' : 'rank-others';
    
    const row = document.createElement('div');
    row.className = 'scoreboard-team-row';
    row.innerHTML = `
      <div class="team-info">
        <div class="team-header-row">
          <span class="team-rank-badge ${badgeClass}">${suffix}</span>
          <span class="team-name"></span>
        </div>
        <span class="team-score" id="sidebar-score-${index}">0</span>
      </div>
      <div class="score-adj-buttons">
        <button class="btn-adj plus" title="Add 10 Points">+10</button>
      </div>
    `;
    
    // Set text safely
    row.querySelector('.team-name').textContent = team.name;
    row.querySelector('.team-score').textContent = team.score;
    
    // Event Listeners for point adjustments
    row.querySelector('.plus').addEventListener('click', () => adjustTeamScore(index, 10));
    
    DOM.sidebarScoreboardContainer.appendChild(row);
  });
  
  // Call dynamic button text updater for tiebreaker mode
  if (gameState.isTiebreakerMode) {
    updateTiebreakerNextQuestionButton();
  }
}

// Keep track of the last score adjustment time per team to prevent double-clicks/ghost-clicks
let lastScoreAdjustTimes = {};

function adjustTeamScore(teamIdx, amount) {
  const now = Date.now();
  if (lastScoreAdjustTimes[teamIdx] && (now - lastScoreAdjustTimes[teamIdx] < 250)) {
    return;
  }
  lastScoreAdjustTimes[teamIdx] = now;

  gameState.teams[teamIdx].score += amount;
  
  if (gameState.teams[teamIdx].score < 0) {
    gameState.teams[teamIdx].score = 0;
  }
  
  // Re-render scoreboard so ranks and badges update for all teams
  renderSidebarScoreboard();
  
  // Highlight the score that changed
  const scoreDisplay = document.getElementById(`sidebar-score-${teamIdx}`);
  if (scoreDisplay) {
    scoreDisplay.style.transform = 'scale(1.25)';
    scoreDisplay.style.color = amount > 0 ? 'var(--color-green)' : 'var(--color-crimson)';
    setTimeout(() => {
      scoreDisplay.style.transform = 'scale(1)';
      scoreDisplay.style.color = 'var(--color-gold)';
    }, 300);
  }
}

// ================= 9. FINAL RESULTS DISPLAY ================= //
// ================= 9. FINAL RESULTS DISPLAY ================= //
function showFinalResults() {
  // Check if there is a tie for 1st place
  const maxScore = Math.max(...gameState.teams.map(t => t.score));
  const tiedForFirst = gameState.teams.filter(t => t.score === maxScore);
  
  if (tiedForFirst.length > 1 && maxScore > 0 && !gameState.isTiebreakerMode) {
    const container = document.getElementById('tiebreaker-contenders-container');
    if (container) {
      container.innerHTML = `
        <div class="flex flex-col items-center gap-2 mb-6">
          <div class="font-display-lg text-4xl md:text-5xl text-on-surface font-black italic tracking-tighter tabular-nums text-primary">
            ${maxScore} PTS
          </div>
          <div class="px-4 py-1.5 bg-error/15 text-error border border-error/30 rounded-full font-label-sm text-xs uppercase font-bold tracking-widest animate-pulse">
            Full Time Tie
          </div>
          <p class="text-sm text-on-surface-variant/80 max-w-sm mt-1 leading-relaxed">
            The following groups have finished with equal points and are moving into the Tiebreaker Round!
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center items-stretch gap-6 w-full">
          ${tiedForFirst.map(team => `
            <div class="flex flex-col items-center gap-4 bg-surface-container/30 border border-white/5 p-6 rounded-xl min-w-[200px] shadow-lg">
              <div class="w-20 h-20 rounded-2xl bg-surface-container-high border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
                <img src="images/logo.png" class="w-12 h-12 object-contain" alt="${team.name}">
              </div>
              <div class="text-center">
                <span class="font-label-sm text-[10px] text-on-surface-variant/60 uppercase tracking-widest block">Tied Contender</span>
                <span class="font-display-lg text-base text-on-surface font-bold uppercase tracking-tight block mt-1">${team.name}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    renderStandingsChart(maxScore, tiedForFirst);
    switchSection(DOM.standingsChartPage);
    return;
  }
  
  // Sort teams by scores descending
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  
  // Set podium content
  const goldName = document.getElementById('podium-name-1');
  const goldScore = document.getElementById('podium-score-1');
  const silverSpot = document.getElementById('podium-spot-2');
  const silverName = document.getElementById('podium-name-2');
  const silverScore = document.getElementById('podium-score-2');
  const bronzeSpot = document.getElementById('podium-spot-3');
  const bronzeName = document.getElementById('podium-name-3');
  const bronzeScore = document.getElementById('podium-score-3');

  // Gold Spot (1st Place)
  if (goldName) goldName.textContent = sortedTeams.length > 0 ? sortedTeams[0].name : '';
  if (goldScore) goldScore.textContent = sortedTeams.length > 0 ? `${sortedTeams[0].score} PTS` : '0 PTS';
  
  // Silver Spot (2nd Place)
  if (sortedTeams.length > 1) {
    if (silverSpot) silverSpot.classList.remove('hidden');
    if (silverName) silverName.textContent = sortedTeams[1].name;
    if (silverScore) silverScore.textContent = `${sortedTeams[1].score} PTS`;
  } else {
    if (silverSpot) silverSpot.classList.add('hidden');
  }
  
  // Bronze Spot (3rd Place)
  if (sortedTeams.length > 2) {
    if (bronzeSpot) bronzeSpot.classList.remove('hidden');
    if (bronzeName) bronzeName.textContent = sortedTeams[2].name;
    if (bronzeScore) bronzeScore.textContent = `${sortedTeams[2].score} PTS`;
  } else {
    if (bronzeSpot) bronzeSpot.classList.add('hidden');
  }

  // Clear and populate extra rankings (for 4th, 5th, 6th places if teamCount > 3)
  if (DOM.resultsFinalLeaderboardList) DOM.resultsFinalLeaderboardList.innerHTML = '';
  
  let currentRank = 1;
  let prevScore = -1;
  
  if (sortedTeams.length > 3) {
    if (DOM.resultsExtraRankingsBox) DOM.resultsExtraRankingsBox.classList.remove('hidden');
    
    sortedTeams.forEach((team, index) => {
      if (team.score !== prevScore) {
        currentRank = index + 1;
      }
      prevScore = team.score;
      
      // Only show teams below rank 3 (4th, 5th, 6th...) in the extra list
      if (currentRank > 3) {
        const placeSuffix = `${currentRank}th Place`;
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between p-4 bg-surface-container-low border border-white/5 rounded-lg';
        row.innerHTML = `
          <div class="flex items-center gap-4">
            <span class="font-label-lg text-label-lg text-secondary w-20">${placeSuffix}</span>
            <span class="font-body-lg text-body-lg text-on-surface font-medium team-row-name"></span>
          </div>
          <span class="font-label-lg text-label-lg text-primary team-row-score"></span>
        `;
        row.querySelector('.team-row-name').textContent = team.name;
        row.querySelector('.team-row-score').textContent = `${team.score} PTS`;
        if (DOM.resultsFinalLeaderboardList) DOM.resultsFinalLeaderboardList.appendChild(row);
      }
    });
  } else {
    if (DOM.resultsExtraRankingsBox) DOM.resultsExtraRankingsBox.classList.add('hidden');
  }
  
  // Switch Section
  switchSection(DOM.resultsPage);

  // Trigger celebrations if the winner scored > 0 points
  if (sortedTeams.length > 0 && sortedTeams[0].score > 0) {
    startConfetti();
  }
  
  // Populate the answer review sheet for the Quiz Master
  renderAnswerReviewSheet();
}

function renderStandingsChart(maxScore, tiedForFirst) {
  const chartContainer = document.getElementById('standings-chart-bars-container');
  if (!chartContainer) return;
  
  // Sort all teams by score descending
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  
  chartContainer.innerHTML = sortedTeams.map(team => {
    const isTiedWinner = tiedForFirst.some(t => t.name === team.name);
    const percentage = maxScore > 0 ? (team.score / maxScore) * 100 : 0;
    
    const barClass = isTiedWinner 
      ? 'bg-gradient-to-r from-primary to-surface-tint gold-glow animate-pulse-subtle' 
      : 'bg-surface-container-high';
      
    const textHighlightClass = isTiedWinner ? 'text-primary font-bold animate-pulse-subtle' : 'text-on-surface-variant';
    
    return `
      <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center text-sm md:text-base">
          <span class="font-headline-md uppercase tracking-wide ${textHighlightClass}">${team.name}</span>
          <span class="font-display-lg text-lg font-black ${textHighlightClass}">${team.score} PTS</span>
        </div>
        <div class="w-full bg-white/5 h-6 rounded-full overflow-hidden border border-white/5 relative">
          <div class="chart-bar h-full rounded-full transition-all duration-[1500ms] ease-out ${barClass}" style="width: 0%" data-width="${percentage}%"></div>
        </div>
      </div>
    `;
  }).join('');
  
  // Trigger transition animation by setting widths after rendering
  setTimeout(() => {
    const bars = chartContainer.querySelectorAll('.chart-bar');
    bars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    });
  }, 100);
}

function renderAnswerReviewSheet() {
  const container = DOM.resultsReviewAccordionContainer || DOM.reviewCardsContainer;
  if (!container) return;
  container.innerHTML = '';
  
  const questionsToReview = [...gameState.questions];
  if (gameState.isTiebreakerMode) {
    for (let i = 0; i <= gameState.tiebreakerIndex; i++) {
      if (TIEBREAKER_QUESTIONS[i]) {
        questionsToReview.push({
          ...TIEBREAKER_QUESTIONS[i],
          question: `[Tiebreaker Q${i + 1}] ${TIEBREAKER_QUESTIONS[i].question}`
        });
      }
    }
  }
  
  questionsToReview.forEach((q, idx) => {
    const accId = `content-acc-${idx}`;
    const card = document.createElement('div');
    card.className = 'group border-b border-secondary-container/10';
    
    const formattedNum = String(idx + 1).padStart(2, '0');
    
    card.innerHTML = `
      <button class="w-full px-8 py-6 flex items-center justify-between hover:bg-surface-container-high/50 transition-colors text-left" onclick="toggleAccordion('${accId}')">
        <div class="flex items-center gap-6">
          <span class="font-label-lg text-label-lg text-primary">${formattedNum}</span>
          <span class="font-body-lg text-body-lg text-on-surface font-medium card-question-title-text"></span>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant transition-transform" id="icon-content-acc-${idx}">expand_more</span>
      </button>
      <div class="hidden px-24 pb-8 text-on-surface-variant" id="content-acc-${idx}">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <div>
            <p class="font-label-sm text-label-sm uppercase mb-2 text-primary">Question</p>
            <p class="text-on-surface card-question-text text-left"></p>
          </div>
          <div>
            <p class="font-label-sm text-label-sm uppercase mb-2 text-primary">Correct Answer</p>
            <p class="text-on-surface font-bold card-correct-answer-text text-left"></p>
          </div>
        </div>
        <div class="mt-4 p-4 bg-surface-container rounded-lg border border-primary/10">
          <p class="text-label-sm italic text-on-surface-variant card-explanation-text text-left"></p>
        </div>
      </div>
    `;
    
    // Truncate title for header row to look neat
    let shortQuestion = q.question;
    if (shortQuestion.length > 70) {
      shortQuestion = shortQuestion.substring(0, 67) + '...';
    }
    
    card.querySelector('.card-question-title-text').textContent = shortQuestion;
    card.querySelector('.card-question-text').textContent = q.question;
    card.querySelector('.card-correct-answer-text').textContent = q.options[q.correctIndex];
    card.querySelector('.card-explanation-text').textContent = `Fact: ${q.explanation}`;
    
    container.appendChild(card);
  });
}

// Expose toggleAccordion globally for onclick attribute in dynamic review sheet
window.toggleAccordion = function(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById(id.replace('content-', 'icon-'));
  
  const container = DOM.resultsReviewAccordionContainer || DOM.reviewCardsContainer;
  if (!container) return;
  const contents = container.querySelectorAll('[id^="content-acc-"]');
  const icons = container.querySelectorAll('[id^="icon-content-acc-"]');
  
  contents.forEach(item => {
    if (item.id !== id) item.classList.add('hidden');
  });
  icons.forEach(item => {
    if (item.id !== id.replace('content-', 'icon-')) item.classList.remove('rotate-180');
  });

  // Toggle current
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
  } else {
    content.classList.add('hidden');
    if (icon) icon.classList.remove('rotate-180');
  }
};

// ================= 10. CONFETTI EFFECT GENERATOR ================= //
let confettiActive = false;
let confettiParticles = [];
const confettiColors = ['#d4af37', '#10b981', '#3b82f6', '#f3cf59', '#34d399', '#ffffff'];
let animationFrameId = null;

function resizeCanvas() {
  DOM.confettiCanvas.width = window.innerWidth;
  DOM.confettiCanvas.height = window.innerHeight;
}

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * DOM.confettiCanvas.width;
    this.y = Math.random() * -DOM.confettiCanvas.height - 20;
    this.size = Math.random() * 8 + 6;
    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 4 - 2;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    
    // Reset particles that fall off bottom
    if (this.y > DOM.confettiCanvas.height) {
      this.y = -20;
      this.x = Math.random() * DOM.confettiCanvas.width;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function startConfetti() {
  if (confettiActive) return;
  confettiActive = true;
  confettiParticles = [];
  
  const particleCount = 120;
  for (let i = 0; i < particleCount; i++) {
    confettiParticles.push(new ConfettiParticle());
  }
  
  animateConfetti();
}

function animateConfetti() {
  if (!confettiActive) return;
  
  const ctx = DOM.confettiCanvas.getContext('2d');
  ctx.clearRect(0, 0, DOM.confettiCanvas.width, DOM.confettiCanvas.height);
  
  confettiParticles.forEach(particle => {
    particle.update();
    particle.draw(ctx);
  });
  
  animationFrameId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
  confettiActive = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  const ctx = DOM.confettiCanvas.getContext('2d');
  ctx.clearRect(0, 0, DOM.confettiCanvas.width, DOM.confettiCanvas.height);
}

// ================= 11. SUDDEN DEATH TIEBREAKER SYSTEM ================= //
function startTiebreakerMode() {
  gameState.isTiebreakerMode = true;
  gameState.tiebreakerIndex = 0;
  
  // Re-enable and reset tiebreaker state variables
  const vignette = document.getElementById('stadium-vignette-overlay');
  if (vignette) {
    vignette.classList.remove('stadium-vignette');
    vignette.classList.add('tiebreaker-vignette');
  }

  const overlay = document.getElementById('tiebreaker-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.add('hidden');
      switchSection(DOM.tiebreakerPage);
      loadTiebreakerQuestion();
    }, 3000);
  } else {
    switchSection(DOM.tiebreakerPage);
    loadTiebreakerQuestion();
  }
}

function loadTiebreakerQuestion() {
  gameState.stage = 'LOADED';
  
  // Timer Reset
  clearInterval(gameState.timerId);
  gameState.timeRemaining = 30;
  if (DOM.tiebreakerTimerContainer) DOM.tiebreakerTimerContainer.classList.remove('warning');
  updateTiebreakerTimerRingUI();
  if (DOM.tiebreakerTimerCountdown) DOM.tiebreakerTimerCountdown.textContent = '30';
  
  // Question Tracker Text
  if (DOM.tiebreakerCurrentQuestionNum) {
    DOM.tiebreakerCurrentQuestionNum.textContent = gameState.tiebreakerIndex + 1;
  }
  
  // Load tiebreaker question content
  const currentQuestion = TIEBREAKER_QUESTIONS[gameState.tiebreakerIndex];
  if (DOM.tiebreakerQuestionText) {
    DOM.tiebreakerQuestionText.textContent = currentQuestion.question;
  }
  
  // Visibility States
  if (DOM.tiebreakerOptionsPlaceholder) {
    DOM.tiebreakerOptionsPlaceholder.style.display = 'flex';
  }
  if (DOM.tiebreakerOptionsContainer) {
    DOM.tiebreakerOptionsContainer.classList.add('hidden');
    DOM.tiebreakerOptionsContainer.innerHTML = '';
  }
  if (DOM.tiebreakerExplanationBox) {
    DOM.tiebreakerExplanationBox.classList.add('hidden');
  }
  
  // Host Buttons
  if (DOM.tiebreakerBtnRevealOptions) DOM.tiebreakerBtnRevealOptions.disabled = false;
  if (DOM.tiebreakerBtnRevealAnswer) DOM.tiebreakerBtnRevealAnswer.disabled = true;
  if (DOM.tiebreakerBtnNextQuestion) DOM.tiebreakerBtnNextQuestion.disabled = true;
  
  // Render Sidebar Scoreboard specifically for the tiebreaker page
  renderTiebreakerSidebarScoreboard();
}

function updateTiebreakerTimerRingUI() {
  if (DOM.tiebreakerTimerCountdown) DOM.tiebreakerTimerCountdown.textContent = gameState.timeRemaining;
  const progressRatio = gameState.timeRemaining / 30;
  const offset = TIMER_CIRCUMFERENCE - (progressRatio * TIMER_CIRCUMFERENCE);
  if (DOM.tiebreakerTimerProgressRing) {
    DOM.tiebreakerTimerProgressRing.style.strokeDashoffset = offset;
  }
}

function revealTiebreakerOptionsAndStartTimer() {
  if (gameState.stage !== 'LOADED') return;
  gameState.stage = 'RUNNING';
  
  const currentQuestion = TIEBREAKER_QUESTIONS[gameState.tiebreakerIndex];
  
  // Reveal the options grid
  if (DOM.tiebreakerOptionsPlaceholder) DOM.tiebreakerOptionsPlaceholder.style.display = 'none';
  if (DOM.tiebreakerOptionsContainer) {
    DOM.tiebreakerOptionsContainer.classList.remove('hidden');
    DOM.tiebreakerOptionsContainer.innerHTML = '';
  }
  
  currentQuestion.options.forEach((optText, index) => {
    const letter = String.fromCharCode(65 + index); // A, B, C, D
    const button = document.createElement('button');
    button.className = 'option-btn font-body-lg text-body-lg text-surface-dim dark:text-on-surface border border-white/10 hover:border-primary/40 hover:bg-white/5 transition-all w-full text-left flex items-center gap-4 p-4 rounded-lg cursor-pointer';
    button.innerHTML = `
      <span class="option-letter bg-primary/10 text-primary border border-primary/20 flex items-center justify-center w-10 h-10 rounded font-bold font-headline-md">${letter}</span>
      <span class="option-text flex-grow"></span>
      <span class="option-icon flex items-center justify-center w-6 h-6"></span>
    `;
    button.querySelector('.option-text').textContent = optText;
    DOM.tiebreakerOptionsContainer.appendChild(button);
  });
  
  if (DOM.tiebreakerBtnRevealOptions) DOM.tiebreakerBtnRevealOptions.disabled = true;
  if (DOM.tiebreakerBtnRevealAnswer) DOM.tiebreakerBtnRevealAnswer.disabled = false;
  if (DOM.tiebreakerBtnNextQuestion) DOM.tiebreakerBtnNextQuestion.disabled = true;
  
  // Start countdown
  startTiebreakerTimer();
}

function startTiebreakerTimer() {
  gameState.timeRemaining = 30;
  updateTiebreakerTimerRingUI();
  
  if (countdownAudio) {
    countdownAudio.currentTime = 0;
    countdownAudio.play().catch(err => console.log("Audio playback blocked: user interaction required first.", err));
  }
  
  gameState.timerId = setInterval(() => {
    gameState.timeRemaining--;
    updateTiebreakerTimerRingUI();
    
    if (gameState.timeRemaining === 10) {
      if (countdownAudio) {
        countdownAudio.pause();
      }
      if (tenSecondsAudio) {
        tenSecondsAudio.currentTime = 0;
        tenSecondsAudio.play().catch(err => console.log("Warning audio playback blocked:", err));
      }
    }
    
    if (gameState.timeRemaining <= 10) {
      if (DOM.tiebreakerTimerContainer) DOM.tiebreakerTimerContainer.classList.add('warning');
    }
    
    if (gameState.timeRemaining <= 0) {
      clearInterval(gameState.timerId);
      stopCountdownAudio();
      revealTiebreakerCorrectAnswer();
    }
  }, 1000);
}

function revealTiebreakerCorrectAnswer() {
  if (gameState.stage !== 'RUNNING') return;
  gameState.stage = 'REVEALED';
  
  clearInterval(gameState.timerId);
  stopCountdownAudio();
  if (DOM.tiebreakerTimerContainer) DOM.tiebreakerTimerContainer.classList.remove('warning');
  if (DOM.tiebreakerTimerCountdown) DOM.tiebreakerTimerCountdown.textContent = "✓";
  
  if (DOM.tiebreakerOptionsPlaceholder) DOM.tiebreakerOptionsPlaceholder.style.display = 'none';
  if (DOM.tiebreakerOptionsContainer) DOM.tiebreakerOptionsContainer.classList.remove('hidden');
  
  const currentQuestion = TIEBREAKER_QUESTIONS[gameState.tiebreakerIndex];
  const correctIdx = currentQuestion.correctIndex;
  
  const optionButtons = DOM.tiebreakerOptionsContainer.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, idx) => {
    if (idx === correctIdx) {
      btn.classList.add('correct-answer-reveal');
      btn.querySelector('.option-icon').innerHTML = '<span class="material-symbols-outlined text-green-500">check_circle</span>';
    } else {
      btn.classList.add('incorrect-reveal');
      btn.querySelector('.option-icon').innerHTML = '';
    }
  });
  
  // Display explanation
  if (DOM.tiebreakerExplanationText) {
    DOM.tiebreakerExplanationText.textContent = currentQuestion.explanation;
  }
  if (DOM.tiebreakerExplanationBox) {
    DOM.tiebreakerExplanationBox.classList.remove('hidden');
  }
  
  // Configure buttons
  if (DOM.tiebreakerBtnRevealOptions) DOM.tiebreakerBtnRevealOptions.disabled = true;
  if (DOM.tiebreakerBtnRevealAnswer) DOM.tiebreakerBtnRevealAnswer.disabled = true;
  if (DOM.tiebreakerBtnNextQuestion) DOM.tiebreakerBtnNextQuestion.disabled = false;
  
  // Update button text if resolved
  updateTiebreakerNextQuestionButton();
}

function nextTiebreakerQuestion() {
  if (gameState.stage !== 'REVEALED') return;
  
  if (gameState.tiebreakerIndex >= 4 || gameState.tiebreakerIndex >= TIEBREAKER_QUESTIONS.length - 1) {
    const vignette = document.getElementById('stadium-vignette-overlay');
    if (vignette) {
      vignette.classList.add('stadium-vignette');
      vignette.classList.remove('tiebreaker-vignette');
    }
    showFinalResults();
  } else {
    gameState.tiebreakerIndex++;
    loadTiebreakerQuestion();
  }
}

function quitTiebreaker() {
  clearInterval(gameState.timerId);
  stopCountdownAudio();
  
  const vignette = document.getElementById('stadium-vignette-overlay');
  if (vignette) {
    vignette.classList.add('stadium-vignette');
    vignette.classList.remove('tiebreaker-vignette');
  }
  showLandingPage();
}

function renderTiebreakerSidebarScoreboard() {
  if (!DOM.tiebreakerSidebarScoreboardContainer) return;
  DOM.tiebreakerSidebarScoreboardContainer.innerHTML = '';
  
  const maxScore = Math.max(...gameState.teams.map(t => t.score));
  
  gameState.teams.forEach((team, index) => {
    if (team.score === maxScore) {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between bg-error-container/10 border border-error/20 p-4 rounded-lg w-full';
      row.innerHTML = `
        <div class="flex flex-col text-left">
          <span class="font-label-sm text-xs text-error font-bold uppercase tracking-wider">Contender</span>
          <span class="font-headline-md text-base text-on-surface font-medium team-name"></span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-headline-md text-xl font-bold text-error team-score" id="tiebreaker-score-${index}">0</span>
          <button class="bg-error hover:bg-error/80 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-xs" title="Award Win">+10</button>
        </div>
      `;
      row.querySelector('.team-name').textContent = team.name;
      row.querySelector('.team-score').textContent = team.score;
      
      row.querySelector('button').addEventListener('click', () => {
        adjustTeamScore(index, 10);
        renderTiebreakerSidebarScoreboard();
        updateTiebreakerNextQuestionButton();
      });
      
      DOM.tiebreakerSidebarScoreboardContainer.appendChild(row);
    }
  });
}

function updateTiebreakerNextQuestionButton() {
  if (!DOM.tiebreakerBtnNextQuestion) return;
  
  const span = DOM.tiebreakerBtnNextQuestion.querySelector('span');
  if (gameState.tiebreakerIndex >= 4 || gameState.tiebreakerIndex >= TIEBREAKER_QUESTIONS.length - 1) {
    if (span) span.textContent = "Finish & Show Champion";
  } else {
    if (span) span.textContent = "Next Tiebreaker Step";
  }
}

// ================= THEME SWITCHER LOGIC ================= //
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.body.classList.add('light-theme');
  } else {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('light-theme');
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  if (isDark) {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  }
}
