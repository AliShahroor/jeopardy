// game.js - Jeopardy Game Engine

class JeopardyGame {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.board = {};
    this.answeredCells = new Set();
    this.gameMode = 'topic'; // 'topic' or 'custom'
    this.timerDuration = 30; // seconds
    this.timerInterval = null;
    this.timeRemaining = 0;
    this.gameName = '';
    this.categories = [];
    this.pointValues = [200, 400, 600, 800, 1000];
    this.totalCells = 0;
    this.answeredCount = 0;
    this.isGameOver = false;
    this.currentQuestion = null;
    this.challengeCorrectAnswers = [];
    this.challengeTimer = null;
    this.bonusLifelines = 3; // head-to-head bonus rounds remaining
    this.initialScores = [];
    this.bonusAwards = {};
  }

  // Build the players array from either plain names or {name, members} objects.
  buildPlayers(players) {
    return players.map((p, index) => {
      const isObj = p && typeof p === 'object';
      return {
        name: isObj ? p.name : p,
        members: isObj && Array.isArray(p.members) ? p.members : [],
        isTeam: !!(isObj && p.members),
        score: 0,
        color: this.getPlayerColor(index),
        id: index
      };
    });
  }

  // Build a 5-row board array for a user-written custom category. The rows are
  // used in the order given, keeping each question's own point value (so a
  // custom category can use any point amounts, even repeated ones).
  buildCustomTierBoard(questions) {
    const rows = (questions || []).slice(0, 5).map((q, i) => ({
      q: q.q || '(no question set)',
      a: q.a || '(none)',
      points: (q.points != null ? q.points : this.pointValues[i]),
      type: q.type || 'text'
    }));
    while (rows.length < 5) {
      const i = rows.length;
      rows.push({ q: '(no question set)', a: '(none)', points: this.pointValues[i], type: 'text' });
    }
    return rows;
  }

  // Initialize a new game with topic mode. `customBoards` maps a category name
  // to a user-written question list, letting players MIX their own categories
  // in with the built-in ones.
  initTopicGame(categories, players, timerDuration, gameName, customBoards) {
    customBoards = customBoards || {};
    this.gameMode = 'topic';
    this.categories = categories;
    this.players = this.buildPlayers(players);
    this.timerDuration = timerDuration;
    this.gameName = gameName || 'Untitled Game';
    this.board = {};
    categories.forEach(cat => {
      if (customBoards[cat]) {
        this.board[cat] = this.buildCustomTierBoard(customBoards[cat]);
      } else {
        const built = buildGameBoard([cat]);
        this.board[cat] = built[cat] || [];
      }
    });
    this.totalCells = categories.length * this.pointValues.length;
    this.answeredCells = new Set();
    this.answeredCount = 0;
    this.currentPlayerIndex = 0;
    this.isGameOver = false;
    this.bonusLifelines = 3;
    this.initialScores = this.players.map(p => p.score || 0);
    this.bonusAwards = {};
  }

  // Initialize a custom game
  initCustomGame(customBoard, players, timerDuration, gameName) {
    this.gameMode = 'custom';
    this.categories = Object.keys(customBoard);
    this.players = this.buildPlayers(players);
    this.timerDuration = timerDuration;
    this.gameName = gameName || 'Custom Game';
    this.board = customBoard;
    this.totalCells = this.categories.length * this.pointValues.length;
    this.answeredCells = new Set();
    this.answeredCount = 0;
    this.currentPlayerIndex = 0;
    this.isGameOver = false;
    this.bonusLifelines = 3;
    this.initialScores = this.players.map(p => p.score || 0);
    this.bonusAwards = {};
  }

  // Load a saved game state
  loadGameState(state) {
    this.players = state.players;
    this.currentPlayerIndex = state.currentPlayerIndex;
    this.board = state.board;
    this.answeredCells = new Set(state.answeredCells);
    this.gameMode = state.gameMode;
    this.timerDuration = state.timerDuration;
    this.gameName = state.gameName;
    this.categories = state.categories;
    this.totalCells = state.totalCells;
    this.answeredCount = state.answeredCount;
    this.isGameOver = state.isGameOver;
    this.bonusLifelines = state.bonusLifelines != null ? state.bonusLifelines : 3;
    this.initialScores = state.initialScores || this.players.map(p => p.score || 0);
    this.bonusAwards = state.bonusAwards || {};
  }

  // Save game state
  getGameState() {
    return {
      players: this.players,
      currentPlayerIndex: this.currentPlayerIndex,
      board: this.board,
      answeredCells: Array.from(this.answeredCells),
      gameMode: this.gameMode,
      timerDuration: this.timerDuration,
      gameName: this.gameName,
      categories: this.categories,
      totalCells: this.totalCells,
      answeredCount: this.answeredCount,
      isGameOver: this.isGameOver,
      bonusLifelines: this.bonusLifelines,
      initialScores: this.initialScores,
      bonusAwards: this.bonusAwards,
      savedAt: new Date().toISOString()
    };
  }

  getPlayerColor(index) {
    const colors = [
      '#FF6B6B', // coral red
      '#4ECDC4', // teal
      '#FFE66D', // yellow
      '#A855F7'  // purple
    ];
    return colors[index % colors.length];
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    return this.getCurrentPlayer();
  }

  getQuestion(categoryIndex, pointIndex) {
    const category = this.categories[categoryIndex];
    const cellKey = `${categoryIndex}-${pointIndex}`;

    if (this.answeredCells.has(cellKey)) return null;

    const questions = this.board[category];
    if (!questions || !questions[pointIndex]) return null;

    this.currentQuestion = {
      ...questions[pointIndex],
      categoryIndex,
      pointIndex,
      cellKey,
      category
    };

    return this.currentQuestion;
  }

  skipQuestion(cellKey) {
    if (this.answeredCells.has(cellKey)) return false;
    this.answeredCells.add(cellKey);
    this.answeredCount++;

    if (this.answeredCount >= this.totalCells) {
      this.isGameOver = true;
    }
    return true;
  }

  // Adjust a player's score by a delta (used for steals, where one question
  // can change several players' scores before the cell is closed).
  adjustScore(playerIndex, delta, meta) {
    if (this.players[playerIndex]) {
      this.players[playerIndex].score += delta;
      if (meta && meta.bonus && delta > 0) {
        this.bonusAwards[playerIndex] = (this.bonusAwards[playerIndex] || 0) + delta;
      }
    }
  }

  // Mark a cell as resolved exactly once (after all answer/steal attempts).
  markAnswered(cellKey) {
    if (this.answeredCells.has(cellKey)) return false;
    this.answeredCells.add(cellKey);
    this.answeredCount++;
    if (this.answeredCount >= this.totalCells) {
      this.isGameOver = true;
    }
    return true;
  }

  isCellAnswered(categoryIndex, pointIndex) {
    return this.answeredCells.has(`${categoryIndex}-${pointIndex}`);
  }

  getWinner() {
    if (this.players.length === 0) return null;
    return this.players.reduce((best, player) =>
      player.score > best.score ? player : best
    , this.players[0]);
  }

  getScoreboard() {
    return [...this.players].sort((a, b) => b.score - a.score);
  }

  getRemainingCells() {
    return this.totalCells - this.answeredCount;
  }

  // Timer methods
  startTimer(duration, onTick, onComplete) {
    this.stopTimer();
    this.timeRemaining = duration || this.timerDuration;

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (onTick) onTick(this.timeRemaining);

      if (this.timeRemaining <= 0) {
        this.stopTimer();
        if (onComplete) onComplete();
      }
    }, 1000);

    return this.timeRemaining;
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getTimeRemaining() {
    return this.timeRemaining;
  }

  // Challenge mode methods
  startChallenge(question, onTick, onComplete) {
    this.challengeCorrectAnswers = [];
    const timeLimit = question.timeLimit || 60;
    return this.startTimer(timeLimit, onTick, onComplete);
  }

  checkChallengeAnswer(input, challengeType) {
    const normalizedInput = input.toLowerCase().trim();
    const validAnswers = CHALLENGE_ANSWERS[challengeType];

    if (!validAnswers) return { valid: false, alreadyAnswered: false };

    const alreadyAnswered = this.challengeCorrectAnswers.includes(normalizedInput);
    if (alreadyAnswered) return { valid: false, alreadyAnswered: true };

    // Exact match only against the normalized answer set (aliases like "uk" /
    // "united kingdom" are listed explicitly in CHALLENGE_ANSWERS). Prefix
    // matching is intentionally NOT used, so a single letter cannot match.
    const isValid = validAnswers.includes(normalizedInput);

    if (isValid) {
      this.challengeCorrectAnswers.push(normalizedInput);
    }

    return { valid: isValid, alreadyAnswered: false, count: this.challengeCorrectAnswers.length };
  }

  getChallengeScore() {
    return this.challengeCorrectAnswers.length;
  }
}

// ---- Fuzzy answer matching (shared by bonus rapid-fire & name-as-many) ----
// Normalize for comparison: lowercase, strip accents, drop punctuation and a
// leading article, collapse whitespace.
function normalizeAnswer(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(the|a|an)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 0; i < a.length; i++) {
    let cur = [i + 1];
    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      cur[j + 1] = Math.min(prev[j + 1] + 1, cur[j] + 1, prev[j] + cost);
    }
    prev = cur;
  }
  return prev[b.length];
}

// Does `input` match `correct` (or any of `accept` aliases), allowing for minor
// typos? Longer answers tolerate more typos; very short answers must be exact.
function fuzzyAnswerMatch(input, correct, accept) {
  const ni = normalizeAnswer(input);
  if (!ni) return false;
  const candidates = [correct].concat(accept || []).map(normalizeAnswer).filter(Boolean);
  for (const c of candidates) {
    if (ni === c) return true;
    if (ni.replace(/ /g, '') === c.replace(/ /g, '')) return true; // spacing
    const tol = c.length >= 8 ? 2 : (c.length >= 5 ? 1 : 0);
    if (tol && levenshtein(ni, c) <= tol) return true;
  }
  return false;
}

// Match a typed entry against a "name as many" answer set (array of already-
// normalized acceptable strings). Returns the matched canonical entry or null.
function matchNameSet(input, normalizedSet) {
  const ni = normalizeAnswer(input);
  if (!ni || !Array.isArray(normalizedSet)) return null;
  if (normalizedSet.includes(ni)) return ni;
  for (const c of normalizedSet) {
    if (c.length >= 6 && levenshtein(ni, c) <= 1) return c;
  }
  return null;
}

if (typeof window !== 'undefined') {
  window.normalizeAnswer = normalizeAnswer;
  window.fuzzyAnswerMatch = fuzzyAnswerMatch;
  window.matchNameSet = matchNameSet;
}

// Save/Load manager using localStorage
class GameStorage {
  constructor() {
    this.STORAGE_KEY = 'jeopardy_saved_games';
    this.USER_KEY = 'jeopardy_users';
    this.CURRENT_USER_KEY = 'jeopardy_current_user';
  }

  // User management
  login(username) {
    const users = this.getUsers();
    if (!users.includes(username)) {
      users.push(username);
      localStorage.setItem(this.USER_KEY, JSON.stringify(users));
    }
    localStorage.setItem(this.CURRENT_USER_KEY, username);
    return username;
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser() {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  }

  getUsers() {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Game save/load
  saveGame(gameName, gameState) {
    const user = this.getCurrentUser();
    if (!user) return false;

    const allSaves = this.getAllSaves();
    const userKey = `user_${user}`;

    if (!allSaves[userKey]) {
      allSaves[userKey] = {};
    }

    allSaves[userKey][gameName] = {
      ...gameState,
      gameName,
      savedAt: new Date().toISOString(),
      savedBy: user
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allSaves));
    return true;
  }

  loadGame(gameName) {
    const user = this.getCurrentUser();
    if (!user) return null;

    const allSaves = this.getAllSaves();
    const userKey = `user_${user}`;

    if (!allSaves[userKey] || !allSaves[userKey][gameName]) return null;
    return allSaves[userKey][gameName];
  }

  deleteGame(gameName) {
    const user = this.getCurrentUser();
    if (!user) return false;

    const allSaves = this.getAllSaves();
    const userKey = `user_${user}`;

    if (allSaves[userKey] && allSaves[userKey][gameName]) {
      delete allSaves[userKey][gameName];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allSaves));
      return true;
    }
    return false;
  }

  getUserSaves() {
    const user = this.getCurrentUser();
    if (!user) return {};

    const allSaves = this.getAllSaves();
    const userKey = `user_${user}`;

    return allSaves[userKey] || {};
  }

  getAllSaves() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  getSavesList() {
    const saves = this.getUserSaves();
    return Object.entries(saves).map(([name, data]) => ({
      name,
      savedAt: data.savedAt,
      players: data.players ? data.players.map(p => p.name).join(', ') : 'Unknown',
      categories: data.categories ? data.categories.join(', ') : 'Unknown',
      mode: data.gameMode || 'Unknown',
      progress: data.totalCells ? `${data.answeredCount}/${data.totalCells}` : 'Unknown'
    }));
  }
}

// Sound effects manager (using Web Audio API - no external files needed)
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.volume = 0.3;
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  }

  ensureContext() {
    if (!this.audioContext) this.init();
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playTone(frequency, duration, type = 'sine', volume = null) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    const vol = volume !== null ? volume : this.volume;
    gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Sound effects
  playReveal() {
    this.playTone(523.25, 0.15, 'sine');
    setTimeout(() => this.playTone(659.25, 0.15, 'sine'), 100);
    setTimeout(() => this.playTone(783.99, 0.2, 'sine'), 200);
  }

  playCorrect() {
    this.playTone(523.25, 0.12, 'sine');
    setTimeout(() => this.playTone(659.25, 0.12, 'sine'), 80);
    setTimeout(() => this.playTone(783.99, 0.12, 'sine'), 160);
    setTimeout(() => this.playTone(1046.50, 0.3, 'sine'), 240);
  }

  playWrong() {
    this.playTone(311.13, 0.2, 'sawtooth', 0.15);
    setTimeout(() => this.playTone(233.08, 0.4, 'sawtooth', 0.15), 200);
  }

  playTimerWarning() {
    this.playTone(880, 0.1, 'square', 0.15);
  }

  playTimerEnd() {
    this.playTone(440, 0.15, 'square', 0.2);
    setTimeout(() => this.playTone(349.23, 0.15, 'square', 0.2), 150);
    setTimeout(() => this.playTone(261.63, 0.4, 'square', 0.2), 300);
  }

  playClick() {
    this.playTone(800, 0.05, 'sine', 0.1);
  }

  playGameOver() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.25, 'sine', 0.2), i * 180);
    });
  }

  playBoardReveal() {
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.15, 'triangle', 0.15), i * 100);
    });
  }

  playChallengeCorrect() {
    this.playTone(880, 0.08, 'sine', 0.15);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// Particle/Confetti system
class ParticleSystem {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.particles = [];
  }

  createConfetti(x, y, count = 30) {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#FF8C00', '#00FF88', '#FF69B4', '#00BFFF'];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';

      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const angle = Math.random() * 360;
      const velocity = Math.random() * 300 + 200;
      const vx = Math.cos(angle * Math.PI / 180) * velocity;
      const vy = Math.sin(angle * Math.PI / 180) * velocity - 200;
      const rotation = Math.random() * 720 - 360;

      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size * 0.6}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 10000;
        opacity: 1;
      `;

      document.body.appendChild(particle);

      const duration = Math.random() * 1000 + 1500;

      particle.animate([
        {
          transform: `translate(0, 0) rotate(0deg)`,
          opacity: 1
        },
        {
          transform: `translate(${vx}px, ${vy + 400}px) rotate(${rotation}deg)`,
          opacity: 0
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, duration + 100);
    }
  }

  createStarBurst(x, y) {
    for (let i = 0; i < 12; i++) {
      const star = document.createElement('div');
      star.innerHTML = '&#9733;';
      star.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        color: #FFD700;
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
      `;

      document.body.appendChild(star);

      const angle = (i / 12) * 360;
      const distance = Math.random() * 100 + 80;
      const tx = Math.cos(angle * Math.PI / 180) * distance;
      const ty = Math.sin(angle * Math.PI / 180) * distance;

      star.animate([
        { transform: 'translate(0, 0) scale(0)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(1.5)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out',
        fill: 'forwards'
      });

      setTimeout(() => {
        if (star.parentNode) star.parentNode.removeChild(star);
      }, 900);
    }
  }
}
