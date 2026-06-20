// app.js - Main Jeopardy Application Controller

(function() {
  'use strict';

  // ---- Globals ----
  let game = null;
  let storage = null;
  let sound = null;
  let particles = null;
  let currentScreen = 'login';
  let pendingSharedGame = null;
  let setupState = {
    mode: 'topic',
    players: ['Player 1', 'Player 2'],
    timer: 30,
    gameName: '',
    selectedTopics: [],
    customBoard: {},
    presetBoard: null
  };

  // ---- Category Icons ----
  const CATEGORY_ICONS = {
    "Geography": "&#127758;",
    "History": "&#127984;",
    "Science": "&#128300;",
    "Literature": "&#128218;",
    "Movies": "&#127916;",
    "Music": "&#127925;",
    "Sports": "&#9917;",
    "Technology": "&#128187;",
    "Food & Drink": "&#127869;",
    "Art": "&#127912;",
    "Mathematics": "&#128290;",
    "Nature": "&#127793;",
    "World Languages": "&#128172;",
    "Pop Culture": "&#11088;",
    "Space & Astronomy": "&#128640;",
    "Video Games": "&#127918;",
    "Anime & Manga": "&#127884;",
    "Superheroes": "&#129464;",
    "Football (Soccer)": "&#9917;",
    "Cars & Automotive": "&#128663;",
    "Internet Culture": "&#127760;",
    "Mythology": "&#9889;",
    "World Religions": "&#128720;",
    "Chemistry": "&#129514;",
    "Biology": "&#129516;",
    "Flags of the World": "&#128681;"
  };

  const PLAYER_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A855F7'];

  // ---- Initialize ----
  function init() {
    game = new JeopardyGame();
    storage = new GameStorage();
    sound = new SoundManager();
    particles = new ParticleSystem('particles');

    parseSharedGame();
    bindEvents();
    checkLogin();
  }

  // ---- Screen Management ----
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.add('active');
      currentScreen = screenId;
    }
  }

  // ---- Toast Notifications ----
  function showToast(message, type = '') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ---- Login ----
  function checkLogin() {
    const user = storage.getCurrentUser();
    if (user) {
      if (pendingSharedGame) { showSharedSetup(); return; }
      showMenuScreen(user);
    } else {
      showLoginScreen();
    }
  }

  function showLoginScreen() {
    showScreen('login-screen');
    const users = storage.getUsers();
    const recentContainer = document.getElementById('recent-users');

    if (users.length > 0) {
      document.getElementById('login-recent-section').style.display = 'block';
      recentContainer.innerHTML = users.map(u =>
        `<button class="recent-user-btn" onclick="window.app.quickLogin('${escapeHtml(u)}')">${escapeHtml(u)}</button>`
      ).join('');
    } else {
      document.getElementById('login-recent-section').style.display = 'none';
    }
  }

  function handleLogin() {
    const input = document.getElementById('login-username');
    const username = input.value.trim();

    if (!username) {
      showToast('Please enter a username', 'error');
      input.focus();
      return;
    }

    if (username.length > 20) {
      showToast('Username must be 20 characters or less', 'error');
      return;
    }

    storage.login(username);
    sound.init();
    sound.playClick();
    postLogin(username);
  }

  function quickLogin(username) {
    storage.login(username);
    sound.init();
    sound.playClick();
    postLogin(username);
  }

  function postLogin(username) {
    if (pendingSharedGame) { showSharedSetup(); return; }
    showMenuScreen(username);
  }

  // ---- Main Menu ----
  function showMenuScreen(username) {
    showScreen('menu-screen');
    document.getElementById('menu-username').textContent = username;
  }

  function handleLogout() {
    storage.logout();
    showLoginScreen();
  }

  // ---- Game Setup ----
  function showSetupScreen() {
    sound.playClick();
    showScreen('setup-screen');

    // Reset setup state
    setupState = {
      mode: 'topic',
      players: ['Player 1', 'Player 2'],
      timer: 30,
      gameName: '',
      selectedTopics: [],
      customBoard: {},
      presetBoard: null
    };

    // Clear any shared-game UI from a previous visit
    document.getElementById('setup-screen').classList.remove('preset-mode');
    const banner = document.getElementById('shared-banner');
    if (banner) banner.style.display = 'none';

    renderSetupScreen();
  }

  // Setup screen pre-loaded with a shared game board (opened via a share link)
  function showSharedSetup() {
    showScreen('setup-screen');
    setupState = {
      mode: pendingSharedGame.mode || 'custom',
      players: ['Player 1', 'Player 2'],
      timer: pendingSharedGame.timer || 30,
      gameName: pendingSharedGame.name || 'Shared Game',
      selectedTopics: [],
      customBoard: {},
      presetBoard: pendingSharedGame.board
    };

    document.getElementById('setup-screen').classList.add('preset-mode');
    const banner = document.getElementById('shared-banner');
    if (banner) {
      banner.style.display = 'block';
      banner.innerHTML = `&#128279; <strong>Shared game:</strong> &ldquo;${escapeHtml(setupState.gameName)}&rdquo; &mdash; add your players and set the timer, then hit Continue to play!`;
    }
    sound.playBoardReveal();
    renderSetupScreen();
  }

  function renderSetupScreen() {
    // Mode selection
    document.querySelectorAll('.mode-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.mode === setupState.mode);
    });

    // Game name
    document.getElementById('setup-game-name').value = setupState.gameName;

    // Players
    renderPlayerInputs();

    // Timer
    document.querySelectorAll('.timer-option').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.time) === setupState.timer);
    });
  }

  function selectMode(mode) {
    setupState.mode = mode;
    sound.playClick();
    document.querySelectorAll('.mode-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.mode === mode);
    });
  }

  function renderPlayerInputs() {
    const container = document.getElementById('player-inputs');
    container.innerHTML = setupState.players.map((name, index) => `
      <div class="player-input-row" style="animation-delay: ${index * 0.05}s">
        <div class="player-color-dot" style="background: ${PLAYER_COLORS[index]}; color: ${PLAYER_COLORS[index]}"></div>
        <input type="text" class="input-field" value="${escapeHtml(name)}"
               placeholder="Player ${index + 1} name"
               onchange="window.app.updatePlayerName(${index}, this.value)"
               maxlength="15">
        ${setupState.players.length > 2 ? `<button class="btn-remove-player" onclick="window.app.removePlayer(${index})">&#x2715;</button>` : ''}
      </div>
    `).join('');
  }

  function addPlayer() {
    if (setupState.players.length >= 4) {
      showToast('Maximum 4 players allowed', 'error');
      return;
    }
    sound.playClick();
    setupState.players.push(`Player ${setupState.players.length + 1}`);
    renderPlayerInputs();
  }

  function removePlayer(index) {
    if (setupState.players.length <= 2) return;
    sound.playClick();
    setupState.players.splice(index, 1);
    renderPlayerInputs();
  }

  function updatePlayerName(index, name) {
    setupState.players[index] = name || `Player ${index + 1}`;
  }

  function selectTimer(time) {
    setupState.timer = time;
    sound.playClick();
    document.querySelectorAll('.timer-option').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.time) === time);
    });
  }

  function proceedFromSetup() {
    if (!setupState.presetBoard) {
      setupState.gameName = document.getElementById('setup-game-name').value.trim() || 'My Jeopardy Game';
    }

    // Validate player names
    const names = setupState.players.map(n => n.trim()).filter(n => n.length > 0);
    if (names.length < 2) {
      showToast('Need at least 2 players', 'error');
      return;
    }
    setupState.players = names;

    // Check for duplicate names
    const uniqueNames = new Set(names.map(n => n.toLowerCase()));
    if (uniqueNames.size !== names.length) {
      showToast('Player names must be unique', 'error');
      return;
    }

    // Shared game: board is already built, jump straight into play
    if (setupState.presetBoard) {
      sound.playBoardReveal();
      game.initCustomGame(setupState.presetBoard, setupState.players, setupState.timer, setupState.gameName);
      pendingSharedGame = null;
      document.getElementById('setup-screen').classList.remove('preset-mode');
      showGameBoard();
      return;
    }

    sound.playClick();

    if (setupState.mode === 'topic') {
      showTopicScreen();
    } else {
      showCustomScreen();
    }
  }

  // ---- Topic Selection ----
  function showTopicScreen() {
    showScreen('topic-screen');
    setupState.selectedTopics = [];
    renderTopicGrid();
  }

  function renderTopicGrid() {
    const categories = getAvailableCategories();
    const grid = document.getElementById('topic-grid');

    grid.innerHTML = categories.map(cat => {
      const isSelected = setupState.selectedTopics.includes(cat);
      const isDisabled = !isSelected && setupState.selectedTopics.length >= 6;
      const questionCount = QUESTION_BANK[cat] ? QUESTION_BANK[cat].length : 0;

      return `
        <div class="topic-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
             onclick="window.app.toggleTopic('${escapeHtml(cat)}')">
          <span class="topic-icon">${CATEGORY_ICONS[cat] || '&#128196;'}</span>
          <div class="topic-name">${escapeHtml(cat)}</div>
          <div class="topic-count">${questionCount} questions</div>
        </div>
      `;
    }).join('');

    document.getElementById('topic-counter').innerHTML =
      `<span>${setupState.selectedTopics.length}</span> / 6 categories selected`;
  }

  function toggleTopic(category) {
    const index = setupState.selectedTopics.indexOf(category);

    if (index > -1) {
      setupState.selectedTopics.splice(index, 1);
      sound.playClick();
    } else if (setupState.selectedTopics.length < 6) {
      setupState.selectedTopics.push(category);
      sound.playReveal();
    } else {
      showToast('Maximum 6 categories. Deselect one first.', 'error');
      return;
    }

    renderTopicGrid();
  }

  function surpriseMe() {
    const cats = getAvailableCategories();
    // Fisher-Yates shuffle, then take 6
    const shuffled = cats.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setupState.selectedTopics = shuffled.slice(0, 6);
    sound.playBoardReveal();
    renderTopicGrid();
    showToast('Picked 6 random categories — hit Start!', 'success');
  }

  function startTopicGame() {
    if (setupState.selectedTopics.length !== 6) {
      showToast('Please select exactly 6 categories', 'error');
      return;
    }

    sound.playBoardReveal();
    game.initTopicGame(
      setupState.selectedTopics,
      setupState.players,
      setupState.timer,
      setupState.gameName
    );

    showGameBoard();
  }

  // ---- Custom Game Builder ----
  function showCustomScreen() {
    showScreen('custom-screen');
    initCustomBoard();
    renderCustomBuilder();
  }

  function initCustomBoard() {
    setupState.customBoard = {};
    for (let i = 0; i < 6; i++) {
      const catName = `Category ${i + 1}`;
      setupState.customBoard[catName] = [200, 400, 600, 800, 1000].map(pts => ({
        q: '',
        a: '',
        points: pts,
        type: 'text'
      }));
    }
  }

  function renderCustomBuilder() {
    const categories = Object.keys(setupState.customBoard);
    const tabsContainer = document.getElementById('custom-tabs');
    const panelsContainer = document.getElementById('custom-panels');

    tabsContainer.innerHTML = categories.map((cat, idx) =>
      `<button class="custom-tab ${idx === 0 ? 'active' : ''}"
              onclick="window.app.switchCustomTab(${idx})"
              data-tab="${idx}">${escapeHtml(cat)}</button>`
    ).join('');

    panelsContainer.innerHTML = categories.map((cat, idx) => {
      const questions = setupState.customBoard[cat];
      return `
        <div class="custom-category-panel ${idx === 0 ? 'active' : ''}" data-panel="${idx}">
          <div class="custom-category-header">
            <label style="color: rgba(255,215,0,0.7); font-size: 0.85rem; white-space: nowrap;">Category Name:</label>
            <input type="text" class="input-field" value="${escapeHtml(cat)}"
                   placeholder="Category name"
                   onchange="window.app.updateCategoryName(${idx}, this.value)"
                   maxlength="25">
          </div>
          ${questions.map((q, qIdx) => `
            <div class="custom-question-card">
              <div class="card-header">
                <span class="points-badge">$${q.points}</span>
              </div>
              <div class="card-fields">
                <input type="text" class="input-field" value="${escapeHtml(q.q)}"
                       placeholder="Enter question..."
                       onchange="window.app.updateCustomQuestion(${idx}, ${qIdx}, 'q', this.value)">
                <input type="text" class="input-field" value="${escapeHtml(q.a)}"
                       placeholder="Enter answer..."
                       onchange="window.app.updateCustomQuestion(${idx}, ${qIdx}, 'a', this.value)">
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }

  function switchCustomTab(index) {
    sound.playClick();
    document.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.custom-category-panel').forEach(p => p.classList.remove('active'));

    const tab = document.querySelector(`.custom-tab[data-tab="${index}"]`);
    const panel = document.querySelector(`.custom-category-panel[data-panel="${index}"]`);
    if (tab) tab.classList.add('active');
    if (panel) panel.classList.add('active');
  }

  function updateCategoryName(catIndex, newName) {
    const categories = Object.keys(setupState.customBoard);
    const oldName = categories[catIndex];
    if (!oldName || !newName.trim()) return;

    const newBoard = {};
    categories.forEach((cat, idx) => {
      if (idx === catIndex) {
        newBoard[newName.trim()] = setupState.customBoard[cat];
      } else {
        newBoard[cat] = setupState.customBoard[cat];
      }
    });
    setupState.customBoard = newBoard;

    // Update tab text
    const tab = document.querySelector(`.custom-tab[data-tab="${catIndex}"]`);
    if (tab) tab.textContent = newName.trim();
  }

  function updateCustomQuestion(catIndex, qIndex, field, value) {
    const categories = Object.keys(setupState.customBoard);
    const cat = categories[catIndex];
    if (!cat) return;
    setupState.customBoard[cat][qIndex][field] = value;
  }

  function startCustomGame() {
    // Validate: at least one question per category
    const categories = Object.keys(setupState.customBoard);
    let valid = true;

    categories.forEach(cat => {
      const questions = setupState.customBoard[cat];
      const hasAny = questions.some(q => q.q.trim() && q.a.trim());
      if (!hasAny) {
        valid = false;
      }
    });

    if (!valid) {
      showToast('Each category needs at least one question with an answer', 'error');
      return;
    }

    // Fill empty questions with placeholders
    categories.forEach(cat => {
      setupState.customBoard[cat] = setupState.customBoard[cat].map(q => {
        if (!q.q.trim()) {
          return { ...q, q: 'No question set', a: 'N/A' };
        }
        if (!q.a.trim()) {
          return { ...q, a: 'No answer provided' };
        }
        return q;
      });
    });

    sound.playBoardReveal();
    game.initCustomGame(
      setupState.customBoard,
      setupState.players,
      setupState.timer,
      setupState.gameName
    );

    showGameBoard();
  }

  // ---- Game Board ----
  function showGameBoard() {
    showScreen('board-screen');
    renderBoard();
    renderScoreboard();
    document.querySelector('.board-header .game-title').textContent = game.gameName;
  }

  function renderBoard() {
    const board = document.getElementById('jeopardy-board');
    const numCats = game.categories.length;

    board.style.gridTemplateColumns = `repeat(${numCats}, 1fr)`;

    let html = '';

    // Category headers
    game.categories.forEach(cat => {
      html += `<div class="board-category-header">${escapeHtml(cat)}</div>`;
    });

    // Question cells (5 rows)
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < numCats; col++) {
        const isAnswered = game.isCellAnswered(col, row);
        const pointValue = game.pointValues[row];

        html += `
          <div class="board-cell ${isAnswered ? 'answered' : ''}"
               data-col="${col}" data-row="${row}"
               onclick="window.app.selectCell(${col}, ${row})">
            <span class="cell-value">$${pointValue}</span>
          </div>
        `;
      }
    }

    board.innerHTML = html;

    // Animate cells in with staggered delay
    const cells = board.querySelectorAll('.board-cell:not(.answered)');
    cells.forEach((cell, i) => {
      cell.style.opacity = '0';
      cell.style.transform = 'scale(0.8)';
      setTimeout(() => {
        cell.style.transition = 'all 0.3s ease';
        cell.style.opacity = '1';
        cell.style.transform = 'scale(1)';
      }, i * 30);
    });
  }

  function renderScoreboard() {
    const container = document.getElementById('scoreboard');
    container.innerHTML = game.players.map((player, idx) => `
      <div class="player-score-card ${idx === game.currentPlayerIndex ? 'active-player' : ''}"
           style="border-color: ${idx === game.currentPlayerIndex ? player.color : 'rgba(255,255,255,0.12)'}">
        <div class="player-name" style="color: ${player.color}">${escapeHtml(player.name)}</div>
        <div class="player-score ${player.score < 0 ? 'negative' : ''}">
          ${player.score < 0 ? '-' : ''}$${Math.abs(player.score)}
        </div>
        <div class="player-turn-indicator">YOUR TURN</div>
      </div>
    `).join('');
  }

  function selectCell(col, row) {
    if (game.isCellAnswered(col, row)) return;

    const question = game.getQuestion(col, row);
    if (!question) return;

    sound.playReveal();

    // Flip animation on the cell
    const cell = document.querySelector(`.board-cell[data-col="${col}"][data-row="${row}"]`);
    if (cell) cell.classList.add('flipping');

    setTimeout(() => {
      showQuestionModal(question);
    }, 300);
  }

  // ---- Question Modal ----
  function showQuestionModal(question) {
    const overlay = document.getElementById('question-overlay');
    const modal = document.getElementById('question-modal');

    // Set category and points
    document.getElementById('modal-category').textContent = question.category;
    document.getElementById('modal-points').textContent = `$${question.points}`;

    // Clear previous state
    modal.className = 'question-modal';

    if (question.type === 'interactive') {
      renderInteractiveQuestion(question);
    } else if (question.type === 'image') {
      renderImageQuestion(question);
    } else {
      renderTextQuestion(question);
    }

    overlay.classList.add('active');
  }

  function renderTextQuestion(question) {
    const content = document.getElementById('modal-content');

    content.innerHTML = `
      <div class="question-text">${escapeHtml(question.q)}</div>
      <div class="timer-container">
        <div class="timer-bar-wrapper">
          <div class="timer-bar" id="timer-bar" style="width: 100%"></div>
        </div>
        <div class="timer-display" id="timer-display">${game.timerDuration}</div>
      </div>
      <div class="player-selector" id="player-selector">
        ${game.players.map((p, i) => `
          <button class="player-select-btn ${i === game.currentPlayerIndex ? 'selected' : ''}"
                  style="border-color: ${i === game.currentPlayerIndex ? p.color : ''}"
                  onclick="window.app.selectAnsweringPlayer(${i})"
                  data-player="${i}">
            ${escapeHtml(p.name)}
          </button>
        `).join('')}
      </div>
      <div class="answer-section" id="answer-section">
        <div class="answer-buttons">
          <button class="btn btn-primary" onclick="window.app.revealAnswer()">
            Reveal Answer
          </button>
          <button class="btn btn-secondary" onclick="window.app.skipQuestion()">
            Skip Question
          </button>
        </div>
      </div>
    `;

    startQuestionTimer();
  }

  function renderImageQuestion(question) {
    const content = document.getElementById('modal-content');
    let imageHtml = '';

    if (question.emoji) {
      // Direct glyph (e.g. a flag emoji, which renders as a real flag on most devices)
      imageHtml = `<div class="question-image question-image--glyph">${question.emoji}</div>`;
    } else if (question.imageType === 'emoji_map') {
      const template = IMAGE_TEMPLATES[question.imageData];
      if (template) {
        imageHtml = `<div class="question-image">${template.emoji}<br><small style="font-size:0.8rem; color: rgba(255,255,255,0.4);">${template.description}</small></div>`;
      }
    } else if (question.imageType === 'flag') {
      const template = IMAGE_TEMPLATES[question.imageData];
      if (template) {
        imageHtml = `<div class="css-flag ${question.imageData}"></div>`;
      }
    } else if (question.imageType === 'landmark') {
      const template = IMAGE_TEMPLATES[question.imageData];
      if (template) {
        imageHtml = `<div class="question-image">${template.emoji}</div>`;
      }
    }

    content.innerHTML = `
      ${imageHtml ? `<div class="question-image-container">${imageHtml}</div>` : ''}
      <div class="question-text">${escapeHtml(question.q)}</div>
      <div class="timer-container">
        <div class="timer-bar-wrapper">
          <div class="timer-bar" id="timer-bar" style="width: 100%"></div>
        </div>
        <div class="timer-display" id="timer-display">${game.timerDuration}</div>
      </div>
      <div class="player-selector" id="player-selector">
        ${game.players.map((p, i) => `
          <button class="player-select-btn ${i === game.currentPlayerIndex ? 'selected' : ''}"
                  style="border-color: ${i === game.currentPlayerIndex ? p.color : ''}"
                  onclick="window.app.selectAnsweringPlayer(${i})"
                  data-player="${i}">
            ${escapeHtml(p.name)}
          </button>
        `).join('')}
      </div>
      <div class="answer-section" id="answer-section">
        <div class="answer-buttons">
          <button class="btn btn-primary" onclick="window.app.revealAnswer()">
            Reveal Answer
          </button>
          <button class="btn btn-secondary" onclick="window.app.skipQuestion()">
            Skip Question
          </button>
        </div>
      </div>
    `;

    startQuestionTimer();
  }

  function renderInteractiveQuestion(question) {
    const content = document.getElementById('modal-content');
    const timeLimit = question.timeLimit || 60;
    const target = question.target || 30;

    content.innerHTML = `
      <div class="question-text">${escapeHtml(question.q)}</div>
      <div class="timer-container">
        <div class="timer-bar-wrapper">
          <div class="timer-bar" id="timer-bar" style="width: 100%"></div>
        </div>
        <div class="timer-display" id="timer-display">${timeLimit}</div>
      </div>
      <div class="player-selector" id="player-selector">
        ${game.players.map((p, i) => `
          <button class="player-select-btn ${i === game.currentPlayerIndex ? 'selected' : ''}"
                  style="border-color: ${i === game.currentPlayerIndex ? p.color : ''}"
                  onclick="window.app.selectAnsweringPlayer(${i})"
                  data-player="${i}">
            ${escapeHtml(p.name)}
          </button>
        `).join('')}
      </div>
      <div class="challenge-container" id="challenge-container">
        <div class="challenge-progress">
          <span class="count" id="challenge-count">0</span> / ${target}
        </div>
        <div class="challenge-input">
          <input type="text" class="input-field" id="challenge-input"
                 placeholder="Type your answer and press Enter..."
                 autocomplete="off" autocapitalize="off">
        </div>
        <div class="challenge-feedback" id="challenge-feedback"></div>
        <div class="challenge-answers-list" id="challenge-answers"></div>
      </div>
      <div class="answer-section" style="margin-top: 20px;">
        <button class="btn btn-primary" id="start-challenge-btn" onclick="window.app.startChallenge()">
          Start Challenge
        </button>
      </div>
    `;
  }

  let selectedAnsweringPlayer = null;

  function selectAnsweringPlayer(index) {
    selectedAnsweringPlayer = index;
    sound.playClick();
    document.querySelectorAll('.player-select-btn').forEach(btn => {
      const pIdx = parseInt(btn.dataset.player);
      btn.classList.toggle('selected', pIdx === index);
      btn.style.borderColor = pIdx === index ? game.players[pIdx].color : '';
    });
  }

  function startQuestionTimer() {
    selectedAnsweringPlayer = game.currentPlayerIndex;
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer-display');
    const totalTime = game.timerDuration;

    game.startTimer(totalTime,
      (remaining) => {
        const percent = (remaining / totalTime) * 100;
        timerBar.style.width = `${percent}%`;
        timerDisplay.textContent = remaining;

        if (remaining <= 5) {
          timerBar.className = 'timer-bar critical';
          timerDisplay.className = 'timer-display critical';
          sound.playTimerWarning();
        } else if (remaining <= 10) {
          timerBar.className = 'timer-bar warning';
          timerDisplay.className = 'timer-display warning';
        }
      },
      () => {
        // Time's up
        sound.playTimerEnd();
        timerDisplay.textContent = '0';
        timerBar.style.width = '0%';
        revealAnswer(true);
      }
    );
  }

  function revealAnswer(timedOut = false) {
    game.stopTimer();
    const question = game.currentQuestion;
    if (!question) return;

    const answerSection = document.getElementById('answer-section');
    const playerIdx = selectedAnsweringPlayer !== null ? selectedAnsweringPlayer : game.currentPlayerIndex;

    answerSection.innerHTML = `
      <div class="reveal-section">
        <div class="correct-answer">
          <span class="answer-label">Correct Answer</span>
          ${escapeHtml(question.a)}
        </div>
        ${timedOut ? '<p style="color: var(--wrong-red); margin-bottom: 15px;">Time\'s up!</p>' : ''}
        <p style="color: rgba(255,255,255,0.5); margin-bottom: 15px; font-size: 0.9rem;">
          Judging for: <strong style="color: ${game.players[playerIdx].color}">${escapeHtml(game.players[playerIdx].name)}</strong>
        </p>
        <div class="judge-buttons">
          <button class="btn btn-success" onclick="window.app.judgeAnswer(true)">
            &#10003; Correct
          </button>
          <button class="btn btn-danger" onclick="window.app.judgeAnswer(false)">
            &#10007; Wrong
          </button>
          <button class="btn btn-secondary" onclick="window.app.skipFromReveal()">
            Skip (No points)
          </button>
        </div>
      </div>
    `;
  }

  function judgeAnswer(isCorrect) {
    const question = game.currentQuestion;
    if (!question) return;

    const playerIdx = selectedAnsweringPlayer !== null ? selectedAnsweringPlayer : game.currentPlayerIndex;
    const modal = document.getElementById('question-modal');

    game.answerQuestion(question.cellKey, isCorrect, playerIdx);

    if (isCorrect) {
      sound.playCorrect();
      modal.classList.add('flash-correct');

      // Confetti
      const rect = modal.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
      particles.createStarBurst(rect.left + rect.width / 2, rect.top + rect.height / 3);
    } else {
      sound.playWrong();
      modal.classList.add('flash-wrong');
    }

    setTimeout(() => {
      closeQuestionModal();
      game.nextPlayer();
      renderScoreboard();
      renderBoard();

      if (game.isGameOver) {
        setTimeout(() => showResults(), 500);
      }
    }, 800);
  }

  function skipQuestion() {
    game.stopTimer();
    const question = game.currentQuestion;
    if (!question) return;

    game.skipQuestion(question.cellKey);
    closeQuestionModal();
    game.nextPlayer();
    renderScoreboard();
    renderBoard();

    if (game.isGameOver) {
      setTimeout(() => showResults(), 500);
    }
  }

  function skipFromReveal() {
    const question = game.currentQuestion;
    if (!question) return;

    game.skipQuestion(question.cellKey);
    closeQuestionModal();
    game.nextPlayer();
    renderScoreboard();
    renderBoard();

    if (game.isGameOver) {
      setTimeout(() => showResults(), 500);
    }
  }

  function closeQuestionModal() {
    game.stopTimer();
    const overlay = document.getElementById('question-overlay');
    overlay.classList.remove('active');
    selectedAnsweringPlayer = null;
  }

  // ---- Interactive Challenge ----
  let challengeActive = false;

  function startChallenge() {
    const question = game.currentQuestion;
    if (!question) return;

    challengeActive = true;
    const timeLimit = question.timeLimit || 60;
    const target = question.target || 30;
    const input = document.getElementById('challenge-input');
    const startBtn = document.getElementById('start-challenge-btn');

    if (startBtn) startBtn.style.display = 'none';
    input.disabled = false;
    input.focus();

    selectedAnsweringPlayer = game.currentPlayerIndex;

    game.startChallenge(question,
      (remaining) => {
        const timerBar = document.getElementById('timer-bar');
        const timerDisplay = document.getElementById('timer-display');
        if (!timerBar || !timerDisplay) return;

        const percent = (remaining / timeLimit) * 100;
        timerBar.style.width = `${percent}%`;
        timerDisplay.textContent = remaining;

        if (remaining <= 5) {
          timerBar.className = 'timer-bar critical';
          timerDisplay.className = 'timer-display critical';
          sound.playTimerWarning();
        } else if (remaining <= 10) {
          timerBar.className = 'timer-bar warning';
          timerDisplay.className = 'timer-display warning';
        }
      },
      () => {
        // Time's up
        challengeActive = false;
        sound.playTimerEnd();
        input.disabled = true;
        endChallenge(question, target);
      }
    );
  }

  function handleChallengeInput(e) {
    if (e.key !== 'Enter' || !challengeActive) return;

    const input = document.getElementById('challenge-input');
    const value = input.value.trim();
    if (!value) return;

    const question = game.currentQuestion;
    if (!question) return;

    const result = game.checkChallengeAnswer(value, question.challenge);
    const feedback = document.getElementById('challenge-feedback');
    const countEl = document.getElementById('challenge-count');
    const answersContainer = document.getElementById('challenge-answers');

    if (result.alreadyAnswered) {
      feedback.textContent = 'Already answered!';
      feedback.className = 'challenge-feedback duplicate';
    } else if (result.valid) {
      feedback.textContent = 'Correct!';
      feedback.className = 'challenge-feedback correct';
      sound.playChallengeCorrect();
      countEl.textContent = result.count;

      // Add tag
      const tag = document.createElement('span');
      tag.className = 'challenge-answer-tag';
      tag.textContent = value;
      answersContainer.appendChild(tag);

      // Check if target reached
      const target = question.target || 30;
      if (result.count >= target) {
        challengeActive = false;
        game.stopTimer();
        input.disabled = true;
        endChallenge(question, target);
      }
    } else {
      feedback.textContent = 'Not valid!';
      feedback.className = 'challenge-feedback wrong';
    }

    input.value = '';

    // Clear feedback after a short delay
    setTimeout(() => {
      if (feedback) feedback.textContent = '';
    }, 1500);
  }

  function endChallenge(question, target) {
    const score = game.getChallengeScore();
    const playerIdx = selectedAnsweringPlayer !== null ? selectedAnsweringPlayer : game.currentPlayerIndex;
    const isSuccess = score >= target;

    const container = document.getElementById('challenge-container');
    if (!container) return;

    container.innerHTML += `
      <div style="margin-top: 20px; text-align: center;">
        <p style="font-size: 1.3rem; color: ${isSuccess ? 'var(--correct-green)' : 'var(--wrong-red)'}; margin-bottom: 10px;">
          ${isSuccess ? 'Challenge Complete!' : 'Time\'s Up!'}
        </p>
        <p style="color: rgba(255,255,255,0.6); margin-bottom: 20px;">
          You got <strong style="color: var(--gold)">${score}</strong> out of ${target}
        </p>
        <div class="judge-buttons">
          ${isSuccess ?
            `<button class="btn btn-success" onclick="window.app.judgeAnswer(true)">&#10003; Award $${question.points}</button>` :
            `<button class="btn btn-danger" onclick="window.app.judgeAnswer(false)">&#10007; Deduct $${question.points}</button>
             <button class="btn btn-secondary" onclick="window.app.skipFromReveal()">Skip (No points)</button>`
          }
        </div>
      </div>
    `;

    if (isSuccess) {
      sound.playCorrect();
      const modal = document.getElementById('question-modal');
      const rect = modal.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
    } else {
      sound.playWrong();
    }
  }

  // ---- Results Screen ----
  function showResults() {
    showScreen('results-screen');
    sound.playGameOver();

    const winner = game.getWinner();
    const scoreboard = game.getScoreboard();

    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('winner-final-score').innerHTML = `Final Score: <span>$${winner.score}</span>`;

    const list = document.getElementById('results-scoreboard');
    list.innerHTML = scoreboard.map((player, idx) => `
      <div class="result-player-row" style="animation-delay: ${idx * 0.15}s">
        <div class="result-rank">${idx === 0 ? '&#127942;' : `#${idx + 1}`}</div>
        <div class="result-player-name" style="color: ${player.color}">${escapeHtml(player.name)}</div>
        <div class="result-player-score ${player.score < 0 ? 'negative' : ''}">
          ${player.score < 0 ? '-' : ''}$${Math.abs(player.score)}
        </div>
      </div>
    `).join('');

    // Confetti for the winner
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          particles.createConfetti(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.5,
            20
          );
        }, i * 300);
      }
    }, 500);
  }

  // ---- Saved Games ----
  function showSavedGames() {
    sound.playClick();
    showScreen('saved-screen');
    renderSavedGames();
  }

  function renderSavedGames() {
    const saves = storage.getSavesList();
    const container = document.getElementById('saved-games-list');

    if (saves.length === 0) {
      container.innerHTML = `
        <div class="no-saved-games">
          <span class="empty-icon">&#128194;</span>
          No saved games yet. Create a new game and save it!
        </div>
      `;
      return;
    }

    container.innerHTML = saves.map(save => `
      <div class="saved-game-card">
        <div class="saved-game-info">
          <h3>${escapeHtml(save.name)}</h3>
          <div class="saved-meta">
            Mode: ${save.mode === 'topic' ? 'Topic' : 'Custom'} | Players: ${escapeHtml(save.players)}<br>
            Progress: ${save.progress} | Saved: ${formatDate(save.savedAt)}
          </div>
        </div>
        <div class="saved-game-actions">
          <button class="btn btn-primary btn-small" onclick="window.app.loadSavedGame('${escapeJs(save.name)}')">
            Play
          </button>
          <button class="btn btn-danger btn-small" onclick="window.app.deleteSavedGame('${escapeJs(save.name)}')">
            &#128465;
          </button>
        </div>
      </div>
    `).join('');
  }

  function saveCurrentGame() {
    const name = game.gameName || 'Untitled';
    const state = game.getGameState();

    if (storage.saveGame(name, state)) {
      showToast('Game saved successfully!', 'success');
      sound.playCorrect();
    } else {
      showToast('Failed to save game. Are you logged in?', 'error');
    }
  }

  function loadSavedGame(name) {
    const state = storage.loadGame(name);
    if (!state) {
      showToast('Could not load game', 'error');
      return;
    }

    sound.playBoardReveal();
    game.loadGameState(state);

    if (game.isGameOver) {
      showResults();
    } else {
      showGameBoard();
    }
  }

  function deleteSavedGame(name) {
    if (storage.deleteGame(name)) {
      showToast('Game deleted', 'success');
      sound.playClick();
      renderSavedGames();
    }
  }

  // ---- Shareable Game Links ----
  function b64urlEncode(str) {
    const b64 = btoa(unescape(encodeURIComponent(str)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function b64urlDecode(str) {
    let s = str.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  }

  function buildShareLink() {
    try {
      const payload = {
        n: game.gameName,
        m: game.gameMode,
        c: game.categories,
        b: game.board,
        t: game.timerDuration
      };
      const encoded = b64urlEncode(JSON.stringify(payload));
      const base = location.origin + location.pathname;
      return base + '#play=' + encoded;
    } catch (e) {
      console.warn('Failed to build share link', e);
      return null;
    }
  }

  function parseSharedGame() {
    const hash = window.location.hash || '';
    const match = hash.match(/^#play=(.+)$/);
    if (!match) return;
    try {
      const payload = JSON.parse(b64urlDecode(match[1]));
      if (payload && payload.b && payload.c) {
        pendingSharedGame = {
          name: payload.n || 'Shared Game',
          mode: payload.m || 'custom',
          categories: payload.c,
          board: payload.b,
          timer: payload.t || 30
        };
      }
    } catch (e) {
      console.warn('Could not read shared game link', e);
    }
    // Clean the URL so a refresh doesn't loop back into the shared game
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  }

  function shareCurrentGame() {
    const link = buildShareLink();
    if (!link) {
      showToast('Could not create a share link', 'error');
      return;
    }
    const input = document.getElementById('share-link-input');
    const hint = document.getElementById('share-hint');
    if (input) input.value = link;
    if (hint) hint.textContent = '';
    document.getElementById('share-overlay').classList.add('active');
    sound.playClick();
  }

  function copyShareLink() {
    const input = document.getElementById('share-link-input');
    const hint = document.getElementById('share-hint');
    if (!input) return;
    input.focus();
    input.select();
    const done = () => { if (hint) hint.textContent = '✓ Link copied! Send it to your friends.'; sound.playCorrect(); };
    const fail = () => { if (hint) hint.textContent = 'Press Ctrl/Cmd+C to copy the selected link.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(input.value).then(done).catch(() => {
        try { document.execCommand('copy'); done(); } catch (e) { fail(); }
      });
    } else {
      try { document.execCommand('copy'); done(); } catch (e) { fail(); }
    }
  }

  function closeShare() {
    const overlay = document.getElementById('share-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ---- How To Play ----
  function showHowToPlay() {
    sound.playClick();
    showScreen('howto-screen');
  }

  // ---- Sound Toggle ----
  function toggleSound() {
    const enabled = sound.toggle();
    const btn = document.getElementById('sound-toggle');
    if (btn) {
      btn.textContent = enabled ? '&#128264;' : '&#128263;';
      btn.innerHTML = enabled ? '&#128264;' : '&#128263;';
      btn.classList.toggle('muted', !enabled);
    }
    showToast(enabled ? 'Sound enabled' : 'Sound muted');
  }

  // ---- Helpers ----
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeJs(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  function formatDate(isoString) {
    if (!isoString) return 'Unknown';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Unknown';
    }
  }

  // ---- Event Bindings ----
  function bindEvents() {
    // Login enter key
    const loginInput = document.getElementById('login-username');
    if (loginInput) {
      loginInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin();
      });
    }

    // Challenge input
    document.addEventListener('keydown', (e) => {
      if (challengeActive && e.key === 'Enter') {
        handleChallengeInput(e);
      }
    });

    // Close modal on overlay click (only on the overlay itself)
    const overlay = document.getElementById('question-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          // Don't close if there's an active timer or challenge
          if (challengeActive) return;
          game.stopTimer();
          closeQuestionModal();
        }
      });
    }

    // Keyboard shortcut: Escape to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const shareOverlay = document.getElementById('share-overlay');
        if (shareOverlay && shareOverlay.classList.contains('active')) {
          closeShare();
          return;
        }
        const overlay = document.getElementById('question-overlay');
        if (overlay && overlay.classList.contains('active')) {
          if (challengeActive) return;
          game.stopTimer();
          closeQuestionModal();
        }
      }
    });

    // Close share modal when clicking the backdrop
    const shareOverlay = document.getElementById('share-overlay');
    if (shareOverlay) {
      shareOverlay.addEventListener('click', (e) => {
        if (e.target === shareOverlay) closeShare();
      });
    }
  }

  // ---- Back Navigation ----
  function goBack(target) {
    sound.playClick();
    switch(target) {
      case 'menu':
        showMenuScreen(storage.getCurrentUser());
        break;
      case 'setup':
        showSetupScreen();
        break;
      default:
        showMenuScreen(storage.getCurrentUser());
    }
  }

  function endGameEarly() {
    if (confirm('Are you sure you want to end the game? You can save first.')) {
      game.isGameOver = true;
      showResults();
    }
  }

  // ---- Public API ----
  window.app = {
    handleLogin,
    quickLogin,
    handleLogout,
    showSetupScreen,
    showSavedGames,
    showHowToPlay,
    selectMode,
    addPlayer,
    removePlayer,
    updatePlayerName,
    selectTimer,
    proceedFromSetup,
    toggleTopic,
    surpriseMe,
    startTopicGame,
    shareCurrentGame,
    copyShareLink,
    closeShare,
    switchCustomTab,
    updateCategoryName,
    updateCustomQuestion,
    startCustomGame,
    selectCell,
    selectAnsweringPlayer,
    revealAnswer,
    judgeAnswer,
    skipQuestion,
    skipFromReveal,
    startChallenge,
    saveCurrentGame,
    loadSavedGame,
    deleteSavedGame,
    toggleSound,
    goBack,
    endGameEarly
  };

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', init);

})();
