// FIFA Men's World Cup Quiz - Presenter Mode Logic

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

function stopCountdownAudio() {
  if (countdownAudio) {
    countdownAudio.pause();
    countdownAudio.currentTime = 0;
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
  
  // Setup inputs
  teamsQtyDisplay: document.getElementById('teams-qty-display'),
  btnQtyDec: document.getElementById('btn-qty-dec'),
  btnQtyInc: document.getElementById('btn-qty-inc'),
  teamInputsContainer: document.getElementById('team-inputs-container'),
  
  // Selection Buttons
  btnSelectRound1: document.getElementById('btn-select-round1'),
  btnSelectRound2: document.getElementById('btn-select-round2'),
  
  // Quiz Presenter Elements
  currentQuestionNum: document.getElementById('current-question-num'),
  totalQuestionsNum: document.getElementById('total-questions-num'),
  quizRoundIndicator: document.getElementById('quiz-round-indicator'),
  timerCountdown: document.getElementById('timer-countdown'),
  timerProgressRing: document.getElementById('timer-progress-ring'),
  timerContainer: document.querySelector('.timer-container'),
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
  
  // Results Elements
  finalLeaderboardList: document.getElementById('final-leaderboard-list'),
  btnRetryRound: document.getElementById('btn-retry-round'),
  btnHome: document.getElementById('btn-home'),
  reviewCardsContainer: document.getElementById('review-cards-container'),
  
  // Canvas
  confettiCanvas: document.getElementById('confetti-canvas')
};

// Default Group Names
const DEFAULT_GROUP_NAMES = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"];

// ================= 3. INITS & EVENT LISTENERS ================= //
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Qty selectors
  DOM.btnQtyDec.addEventListener('click', () => adjustTeamQuantity(-1));
  DOM.btnQtyInc.addEventListener('click', () => adjustTeamQuantity(1));
  
  // Generate default team inputs
  generateTeamInputs();
  
  // Round selection handlers
  DOM.btnSelectRound1.addEventListener('click', () => startPresenterQuiz('round1'));
  DOM.btnSelectRound2.addEventListener('click', () => startPresenterQuiz('round2'));
  
  // Keypress support for accessibility
  DOM.btnSelectRound1.addEventListener('keydown', (e) => { if (e.key === 'Enter') startPresenterQuiz('round1'); });
  DOM.btnSelectRound2.addEventListener('keydown', (e) => { if (e.key === 'Enter') startPresenterQuiz('round2'); });

  // Host Action Buttons
  DOM.btnRevealOptions.addEventListener('click', revealOptionsAndStartTimer);
  DOM.btnRevealAnswer.addEventListener('click', revealCorrectAnswer);
  DOM.btnNextQuestion.addEventListener('click', nextPresenterQuestion);
  
  // Quiz Control Handlers
  DOM.btnQuitQuiz.addEventListener('click', quitPresenterQuiz);
  DOM.btnRetryRound.addEventListener('click', retryPresenterRound);
  DOM.btnHome.addEventListener('click', showLandingPage);
  
  // Resize handler for canvas
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
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
    wrapper.className = 'team-input-wrapper';
    
    wrapper.innerHTML = `
      <i data-lucide="shield"></i>
      <input type="text" class="team-input" placeholder="Group ${i + 1} Name" value="" required>
    `;
    
    // Set value safely
    wrapper.querySelector('.team-input').value = defaultName;
    
    DOM.teamInputsContainer.appendChild(wrapper);
  }
  
  lucide.createIcons();
}

// ================= 5. SECTIONS NAVIGATION ================= //
function switchSection(targetSection) {
  const sections = [DOM.landingPage, DOM.quizPage, DOM.resultsPage];
  sections.forEach(sec => {
    if (sec.classList.contains('active')) {
      sec.classList.remove('active');
    }
  });

  setTimeout(() => {
    sections.forEach(sec => sec.style.display = 'none');
    targetSection.style.display = 'block';
    
    targetSection.offsetHeight; // force repaint
    targetSection.classList.add('active');
    
    lucide.createIcons();
  }, 300);
}

function showLandingPage() {
  stopConfetti();
  switchSection(DOM.landingPage);
}

// ================= 6. PRESENTER QUIZ GAMEPLAY ================= //
function startPresenterQuiz(roundKey) {
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
    const button = document.createElement('div');
    button.className = 'option-btn';
    button.innerHTML = `
      <span class="option-letter">${letter}</span>
      <span class="option-text"></span>
      <span class="option-icon"></span>
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
    const maxScore = Math.max(...gameState.teams.map(t => t.score));
    const tiedForFirst = gameState.teams.filter(t => t.score === maxScore);
    
    if (tiedForFirst.length === 1 || gameState.tiebreakerIndex >= TIEBREAKER_QUESTIONS.length - 1) {
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
    if (gameState.currentRound === 'round2') {
      const maxScore = Math.max(...gameState.teams.map(t => t.score));
      const tiedForFirst = gameState.teams.filter(t => t.score === maxScore);
      
      if (tiedForFirst.length > 1) {
        startTiebreakerMode();
        return;
      }
    }
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
        <button class="btn-adj minus" title="Correct Mistake (-10)">-10</button>
        <button class="btn-adj plus" title="Add 10 Points">+10</button>
      </div>
    `;
    
    // Set text safely
    row.querySelector('.team-name').textContent = team.name;
    row.querySelector('.team-score').textContent = team.score;
    
    // Event Listeners for point adjustments
    row.querySelector('.plus').addEventListener('click', () => adjustTeamScore(index, 10));
    row.querySelector('.minus').addEventListener('click', () => adjustTeamScore(index, -10));
    
    DOM.sidebarScoreboardContainer.appendChild(row);
  });
  
  // Call dynamic button text updater for tiebreaker mode
  if (gameState.isTiebreakerMode) {
    updateNextQuestionButton();
  }
}

function adjustTeamScore(teamIdx, amount) {
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
function showFinalResults() {
  // Sort teams by scores descending
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  
  // Rank calculation for final leaderboard
  let currentRank = 1;
  let prevScore = -1;
  
  DOM.finalLeaderboardList.innerHTML = '';
  sortedTeams.forEach((team, index) => {
    if (team.score !== prevScore) {
      currentRank = index + 1;
    }
    prevScore = team.score;
    
    const row = document.createElement('div');
    row.className = `leaderboard-row rank-${currentRank > 3 ? 'others' : currentRank}`;
    
    const placeSuffix = (currentRank === 1) ? '1st Place' : (currentRank === 2) ? '2nd Place' : (currentRank === 3) ? '3rd Place' : `${currentRank}th Place`;
    
    row.innerHTML = `
      <span class="rank-num" style="width: 140px; font-size: 1.25rem;">${placeSuffix}</span>
      <span class="leaderboard-name"></span>
      <span class="leaderboard-score"></span>
    `;
    
    row.querySelector('.leaderboard-name').textContent = team.name;
    row.querySelector('.leaderboard-score').textContent = `${team.score} pts`;
    
    DOM.finalLeaderboardList.appendChild(row);
  });
  
  // Switch Section
  switchSection(DOM.resultsPage);
  
  // Trigger celebrations if the winner scored > 0 points
  if (sortedTeams.length > 0 && sortedTeams[0].score > 0) {
    startConfetti();
  }
  
  // Populate the answer review sheet for the Quiz Master
  renderAnswerReviewSheet();
}

function renderAnswerReviewSheet() {
  DOM.reviewCardsContainer.innerHTML = '';
  
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
    const card = document.createElement('div');
    card.className = 'review-item-card';
    
    card.innerHTML = `
      <div class="review-card-header">
        <h3>Question ${idx + 1}: <span class="card-question-text"></span></h3>
      </div>
      
      <div class="review-answer-display">
        <span class="label">Correct Answer:</span>
        <span class="val"></span>
      </div>
      
      <p class="review-explanation"></p>
    `;
    
    card.querySelector('.card-question-text').textContent = q.question;
    card.querySelector('.review-answer-display .val').textContent = q.options[q.correctIndex];
    card.querySelector('.review-explanation').textContent = `💡 Fact: ${q.explanation}`;
    
    DOM.reviewCardsContainer.appendChild(card);
  });
}

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
  
  const overlay = document.getElementById('tiebreaker-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);
    
    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.style.display = 'none';
        loadTiebreakerQuestion();
      }, 500);
    }, 3500);
  } else {
    loadTiebreakerQuestion();
  }
}

function loadTiebreakerQuestion() {
  gameState.stage = 'LOADED';
  
  // Timer Reset
  clearInterval(gameState.timerId);
  gameState.timeRemaining = 30;
  DOM.timerContainer.classList.remove('warning');
  updateTimerRingUI();
  DOM.timerCountdown.textContent = '30';
  
  // Progress Bar for tiebreaker
  DOM.quizProgressFill.style.width = '100%';
  DOM.quizProgressFill.style.background = 'linear-gradient(90deg, #ff4757, var(--color-gold))';
  
  // Round Badge Indicator
  DOM.quizRoundIndicator.textContent = "Sudden Death Tiebreaker";
  DOM.quizRoundIndicator.style.background = 'rgba(255, 71, 87, 0.15)';
  DOM.quizRoundIndicator.style.color = '#ff4757';
  DOM.quizRoundIndicator.style.borderColor = 'rgba(255, 71, 87, 0.3)';
  
  // Question Tracker Text
  const trackerLabel = document.querySelector('.question-tracker .label');
  if (trackerLabel) {
    trackerLabel.textContent = "Tiebreaker";
  }
  DOM.currentQuestionNum.textContent = gameState.tiebreakerIndex + 1;
  DOM.totalQuestionsNum.textContent = "Sudden Death";
  
  // Load tiebreaker question content
  const currentQuestion = TIEBREAKER_QUESTIONS[gameState.tiebreakerIndex];
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
  
  // Visibility States
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
  
  // Host Buttons
  DOM.btnRevealOptions.disabled = false;
  DOM.btnRevealAnswer.disabled = true;
  DOM.btnNextQuestion.disabled = true;
  
  // Update Next Question Button label
  updateNextQuestionButton();
}

function updateNextQuestionButton() {
  if (!gameState.isTiebreakerMode) return;
  
  const maxScore = Math.max(...gameState.teams.map(t => t.score));
  const tiedForFirst = gameState.teams.filter(t => t.score === maxScore);
  
  const span = DOM.btnNextQuestion.querySelector('span');
  const icon = DOM.btnNextQuestion.querySelector('i');
  
  if (tiedForFirst.length === 1 || gameState.tiebreakerIndex >= TIEBREAKER_QUESTIONS.length - 1) {
    if (span) span.textContent = "Finish Quiz & Show Results";
    if (icon) {
      icon.setAttribute('data-lucide', 'award');
      lucide.createIcons();
    }
  } else {
    if (span) span.textContent = "Next Tiebreaker Question";
    if (icon) {
      icon.setAttribute('data-lucide', 'arrow-right');
      lucide.createIcons();
    }
  }
}
