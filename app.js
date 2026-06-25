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
    format: 'individual',     // 'individual' | 'teams'
    teamCount: 2,
    teamMode: 'named',        // 'named' | 'random'
    teams: [],                // [{ name, members: [] }]
    players: ['Player 1', 'Player 2'],
    timer: 30,
    bonusRounds: 3,
    gameName: '',
    selectedTopics: [],
    customBoard: {},
    customCategories: {},     // name -> [questions] for "add your own" mixed categories
    presetBoard: null
  };

  // ---- Category Icons ----
  // Icons for the active board categories (see ACTIVE_CATEGORIES in questions.js).
  const CATEGORY_ICONS = {
    "General Knowledge": "&#129504;",
    "Sports": "&#9917;",
    "History": "&#127984;",
    "Geography": "&#127758;",
    "Movies & TV": "&#127916;",
    "Music & Songs": "&#127925;",
    "Science": "&#128300;",
    "Animals & Nature": "&#128058;",
    "Food & Drink": "&#127869;",
    "Famous People": "&#128100;",
    "Technology & Inventions": "&#128161;",
    "Space & Astronomy": "&#128640;",
    "Art & Literature": "&#127912;",
    "Pop Culture": "&#11088;",
    "Famous Landmarks": "&#127963;",
    "Video Games": "&#127918;",
    "Anime & Manga": "&#127884;",
    "Superheroes": "&#129464;",
    "Football (Soccer)": "&#9917;",
    "Cars & Automotive": "&#128663;",
    "Internet Culture": "&#127760;",
    "Mythology": "&#9889;",
    "World Religions": "&#128720;",
    "Flags of the World": "&#128681;",
    "Logos & Brands": "&#127991;",
    "Cartoons & Animation": "&#128371;",
    "TV Shows": "&#128250;"
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
      format: 'individual',
      teamCount: 2,
      teamMode: 'named',
      teams: [],
      players: ['Player 1', 'Player 2'],
      timer: 30,
      bonusRounds: 3,
      gameName: '',
      selectedTopics: [],
      customBoard: {},
      customCategories: {},
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
      format: 'individual',
      teamCount: 2,
      teamMode: 'named',
      teams: [],
      players: ['Player 1', 'Player 2'],
      timer: pendingSharedGame.timer || 30,
      bonusRounds: 3,
      gameName: pendingSharedGame.name || 'Shared Game',
      selectedTopics: [],
      customBoard: {},
      customCategories: {},
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
    // Mode selection (topic / custom)
    document.querySelectorAll('.mode-card[data-mode]').forEach(card => {
      card.classList.toggle('selected', card.dataset.mode === setupState.mode);
    });

    // Format selection (individual / teams)
    document.querySelectorAll('.mode-card[data-format]').forEach(card => {
      card.classList.toggle('selected', card.dataset.format === setupState.format);
    });

    // Game name
    document.getElementById('setup-game-name').value = setupState.gameName;

    // Players / Teams
    renderPlayerInputs();
    applyFormatUI();

    // Timer
    document.querySelectorAll('.timer-option[data-time]').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.time) === setupState.timer);
    });
    // Bonus rounds
    document.querySelectorAll('.timer-option[data-bonus]').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.bonus) === setupState.bonusRounds);
    });
  }

  // Apply the chosen number of bonus rounds to the freshly-started game.
  function applyBonusRounds() {
    if (setupState.bonusRounds != null) game.bonusLifelines = setupState.bonusRounds;
  }

  function selectMode(mode) {
    setupState.mode = mode;
    sound.playClick();
    document.querySelectorAll('.mode-card[data-mode]').forEach(card => {
      card.classList.toggle('selected', card.dataset.mode === mode);
    });
  }

  // ---- Format: Individuals vs Teams ----
  function selectFormat(fmt) {
    setupState.format = fmt;
    sound.playClick();
    document.querySelectorAll('.mode-card[data-format]').forEach(card => {
      card.classList.toggle('selected', card.dataset.format === fmt);
    });
    applyFormatUI();
  }

  function applyFormatUI() {
    const isTeams = setupState.format === 'teams';
    const playersSec = document.getElementById('setup-players-section');
    const teamsSec = document.getElementById('setup-teams-section');
    if (playersSec) playersSec.style.display = isTeams ? 'none' : '';
    if (teamsSec) teamsSec.style.display = isTeams ? '' : 'none';
    if (isTeams) renderTeamsUI();
  }

  function selectTeamCount(n) {
    setupState.teamCount = n;
    sound.playClick();
    document.querySelectorAll('.timer-option[data-teams]').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.teams) === n);
    });
    renderTeamsUI();
  }

  function selectTeamMode(mode) {
    setupState.teamMode = mode;
    sound.playClick();
    document.querySelectorAll('.team-mode-btn').forEach(b => {
      b.classList.toggle('selected', b.dataset.teammode === mode);
    });
    renderTeamsUI();
  }

  function renderTeamsUI() {
    // Sync the count / mode button highlights to current state
    document.querySelectorAll('.timer-option[data-teams]').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.teams) === setupState.teamCount);
    });
    document.querySelectorAll('.team-mode-btn').forEach(b => {
      b.classList.toggle('selected', b.dataset.teammode === setupState.teamMode);
    });

    const namedArea = document.getElementById('team-named-area');
    const randomArea = document.getElementById('team-random-area');
    const isNamed = setupState.teamMode === 'named';
    if (namedArea) namedArea.style.display = isNamed ? '' : 'none';
    if (randomArea) randomArea.style.display = isNamed ? 'none' : '';

    // Keep the teams array sized to teamCount
    if (!Array.isArray(setupState.teams)) setupState.teams = [];
    while (setupState.teams.length < setupState.teamCount) {
      const i = setupState.teams.length;
      setupState.teams.push({ name: `Team ${i + 1}`, members: [''] });
    }
    setupState.teams = setupState.teams.slice(0, setupState.teamCount);
    setupState.teams.forEach(t => {
      if (!Array.isArray(t.members)) t.members = [];
      if (t.members.length === 0) t.members = [''];
    });

    if (isNamed && namedArea) {
      namedArea.innerHTML = setupState.teams.map((t, i) => `
        <div class="team-card">
          <div class="team-card-head">
            <span class="player-color-dot" style="background:${PLAYER_COLORS[i]}; color:${PLAYER_COLORS[i]}"></span>
            <input type="text" class="input-field" value="${escapeHtml(t.name)}"
                   placeholder="Team ${i + 1} name" maxlength="20"
                   onchange="window.app.updateTeamName(${i}, this.value)">
          </div>
          <div class="team-members-list">
            ${t.members.map((mem, j) => `
              <div class="member-row">
                <input type="text" class="input-field" value="${escapeHtml(mem)}"
                       placeholder="Player ${j + 1} name" maxlength="15"
                       onchange="window.app.updateTeamMember(${i}, ${j}, this.value)">
                ${t.members.length > 1 ? `<button class="btn-remove-player" onclick="window.app.removeTeamMember(${i}, ${j})">&#x2715;</button>` : ''}
              </div>
            `).join('')}
          </div>
          <button class="btn btn-secondary btn-small add-member-btn" onclick="window.app.addTeamMember(${i})">+ Add member</button>
        </div>
      `).join('');
    }
  }

  function updateTeamName(i, val) {
    if (setupState.teams[i]) setupState.teams[i].name = val.trim() || `Team ${i + 1}`;
  }

  function updateTeamMember(i, j, val) {
    const t = setupState.teams[i];
    if (!t) return;
    if (!Array.isArray(t.members)) t.members = [];
    t.members[j] = val.trim();
  }

  function addTeamMember(i) {
    const t = setupState.teams[i];
    if (!t) return;
    if (!Array.isArray(t.members)) t.members = [];
    t.members.push('');
    sound.playClick();
    renderTeamsUI();
  }

  function removeTeamMember(i, j) {
    const t = setupState.teams[i];
    if (!t || !Array.isArray(t.members) || t.members.length <= 1) return;
    t.members.splice(j, 1);
    sound.playClick();
    renderTeamsUI();
  }

  function shuffleTeams() {
    const raw = (document.getElementById('team-random-pool').value || '')
      .split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    if (raw.length < setupState.teamCount) {
      showToast(`Enter at least ${setupState.teamCount} players to make ${setupState.teamCount} teams`, 'error');
      return;
    }
    // Fisher-Yates shuffle
    const pool = raw.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const teams = Array.from({ length: setupState.teamCount }, (_, i) => ({ name: `Team ${i + 1}`, members: [] }));
    pool.forEach((p, idx) => teams[idx % setupState.teamCount].members.push(p));
    setupState.teams = teams;
    sound.playBoardReveal();

    const preview = document.getElementById('team-random-preview');
    if (preview) {
      preview.innerHTML = teams.map((t, i) => `
        <div class="team-preview-card" style="border-color:${PLAYER_COLORS[i]}">
          <strong style="color:${PLAYER_COLORS[i]}">${escapeHtml(t.name)}</strong>
          <span>${t.members.map(escapeHtml).join(', ')}</span>
        </div>
      `).join('');
    }
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
    document.querySelectorAll('.timer-option[data-time]').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.time) === time);
    });
  }

  function selectBonusRounds(n) {
    setupState.bonusRounds = n;
    sound.playClick();
    document.querySelectorAll('.timer-option[data-bonus]').forEach(opt => {
      opt.classList.toggle('selected', parseInt(opt.dataset.bonus) === n);
    });
  }

  function proceedFromSetup() {
    if (!setupState.presetBoard) {
      setupState.gameName = document.getElementById('setup-game-name').value.trim() || 'My Jeopardy Game';
    }

    if (setupState.format === 'teams') {
      const teams = (setupState.teams || []).slice(0, setupState.teamCount).map((t, i) => ({
        name: (t.name || `Team ${i + 1}`).trim() || `Team ${i + 1}`,
        members: (t.members || []).slice()
      }));
      if (teams.length < 2) {
        showToast('Need at least 2 teams', 'error');
        return;
      }
      const tNames = teams.map(t => t.name.toLowerCase());
      if (new Set(tNames).size !== tNames.length) {
        showToast('Team names must be unique', 'error');
        return;
      }
      if (setupState.teamMode === 'random' && teams.every(t => t.members.length === 0)) {
        showToast('Tap "Shuffle into teams" to assign players first', 'error');
        return;
      }
      setupState.players = teams; // array of {name, members}
    } else {
      // Validate individual player names
      const names = setupState.players.map(n => n.trim()).filter(n => n.length > 0);
      if (names.length < 2) {
        showToast('Need at least 2 players', 'error');
        return;
      }
      const uniqueNames = new Set(names.map(n => n.toLowerCase()));
      if (uniqueNames.size !== names.length) {
        showToast('Player names must be unique', 'error');
        return;
      }
      setupState.players = names;
    }

    // Shared game: board is already built, jump straight into play
    if (setupState.presetBoard) {
      sound.playBoardReveal();
      game.initCustomGame(setupState.presetBoard, setupState.players, setupState.timer, setupState.gameName);
      applyBonusRounds();
      pendingSharedGame = null;
      document.getElementById('setup-screen').classList.remove('preset-mode');
      startBoardWithReveal();
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
  const TOPIC_RENDER_CAP = 90; // cap rendered cards for performance with 500+ categories
  let topicSearch = '';

  function showTopicScreen() {
    showScreen('topic-screen');
    setupState.selectedTopics = [];
    setupState.customCategories = {};
    topicSearch = '';
    const search = document.getElementById('topic-search');
    if (search) search.value = '';
    renderTopicGrid();
  }

  function filterTopics(term) {
    topicSearch = (term || '').trim().toLowerCase();
    renderTopicGrid();
  }

  function renderTopicGrid() {
    const all = getAvailableCategories();
    const grid = document.getElementById('topic-grid');

    const filtered = topicSearch
      ? all.filter(cat => cat.toLowerCase().includes(topicSearch))
      : all;
    const shown = filtered.slice(0, TOPIC_RENDER_CAP);

    grid.innerHTML = shown.map(cat => {
      const isSelected = setupState.selectedTopics.includes(cat);
      const isDisabled = !isSelected && setupState.selectedTopics.length >= 6;
      const questionCount = QUESTION_BANK[cat] ? QUESTION_BANK[cat].length : 0;

      return `
        <div class="topic-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
             onclick="window.app.toggleTopic('${escapeJs(cat)}')">
          <span class="topic-icon">${CATEGORY_ICONS[cat] || '&#128196;'}</span>
          <div class="topic-name">${escapeHtml(cat)}</div>
          <div class="topic-count">${questionCount} questions</div>
        </div>
      `;
    }).join('');

    const note = document.getElementById('topic-more-note');
    if (note) {
      if (filtered.length > shown.length) {
        note.textContent = `Showing ${shown.length} of ${filtered.length} matches — type to narrow it down.`;
      } else if (filtered.length === 0) {
        note.textContent = 'No categories match your search.';
      } else {
        note.textContent = '';
      }
    }

    document.getElementById('topic-counter').innerHTML =
      `<span>${setupState.selectedTopics.length}</span> / 6 categories selected`;

    renderSelectedChips();
  }

  function renderSelectedChips() {
    const container = document.getElementById('topic-selected');
    if (!container) return;
    if (setupState.selectedTopics.length === 0) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = setupState.selectedTopics.map(cat => {
      const isCustom = !!(setupState.customCategories && setupState.customCategories[cat]);
      const icon = isCustom ? '&#128221;' : (CATEGORY_ICONS[cat] || '&#128196;');
      return `
      <button class="topic-chip ${isCustom ? 'topic-chip--custom' : ''}" onclick="window.app.toggleTopic('${escapeJs(cat)}')" title="Remove">
        ${icon} ${escapeHtml(cat)} <span class="chip-x">&times;</span>
      </button>`;
    }).join('');
  }

  function toggleTopic(category) {
    const index = setupState.selectedTopics.indexOf(category);

    if (index > -1) {
      setupState.selectedTopics.splice(index, 1);
      // Removing a custom ("add your own") category discards its definition.
      if (setupState.customCategories && setupState.customCategories[category]) {
        delete setupState.customCategories[category];
      }
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
      setupState.gameName,
      setupState.customCategories
    );
    applyBonusRounds();
    startBoardWithReveal();
  }

  // ---- Add Your Own Category (mixed in with built-in categories) ----
  function openCustomCategory() {
    const rows = [200, 400, 600, 800, 1000].map(pts => `
      <div class="custom-cat-row">
        <span class="cc-dollar">$</span>
        <input type="number" class="input-field cc-pts" value="${pts}" min="0" step="50" placeholder="pts">
        <input type="text" class="input-field cc-q" placeholder="Question…" maxlength="160">
        <input type="text" class="input-field cc-a" placeholder="Answer" maxlength="60">
      </div>`).join('');
    document.getElementById('custom-cat-rows').innerHTML = rows;
    document.getElementById('custom-cat-name').value = '';
    document.getElementById('custom-cat-overlay').classList.add('active');
    sound.playClick();
  }

  function closeCustomCategory() {
    document.getElementById('custom-cat-overlay').classList.remove('active');
  }

  function saveCustomCategory() {
    const name = document.getElementById('custom-cat-name').value.trim();
    if (!name) { showToast('Give your category a name', 'error'); return; }
    if (QUESTION_BANK[name] || setupState.customCategories[name]) {
      showToast('That name is already taken', 'error'); return;
    }
    if (setupState.selectedTopics.length >= 6) {
      showToast('You already have 6 categories — remove one first', 'error'); return;
    }
    const defaults = [200, 400, 600, 800, 1000];
    const rows = [];
    let realCount = 0;
    document.querySelectorAll('#custom-cat-rows .custom-cat-row').forEach((row, i) => {
      let pts = parseInt(row.querySelector('.cc-pts').value, 10);
      if (isNaN(pts) || pts < 0) pts = defaults[i] || 200;
      const q = row.querySelector('.cc-q').value.trim();
      const a = row.querySelector('.cc-a').value.trim();
      if (q && a) {
        rows.push({ q, a, points: pts, type: 'text' });
        realCount++;
      } else {
        rows.push({ q: '(no question set)', a: '(none)', points: pts, type: 'text' });
      }
    });
    if (realCount === 0) {
      showToast('Add at least one question with an answer', 'error'); return;
    }
    setupState.customCategories[name] = rows;
    setupState.selectedTopics.push(name);
    sound.playReveal();
    closeCustomCategory();
    renderTopicGrid();
    showToast('Your category was added!', 'success');
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
    applyBonusRounds();
    startBoardWithReveal();
  }

  // After starting a new game, reveal team line-ups first (so everyone sees
  // who's with who), then show the board. Solo games skip straight to the board.
  function startBoardWithReveal() {
    const isTeams = game.players.some(p => p.isTeam && p.members && p.members.length);
    if (isTeams) {
      showTeamReveal();
    } else {
      showGameBoard();
    }
  }

  function showTeamReveal() {
    const modal = document.getElementById('team-reveal-modal');
    modal.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">The Teams!</h2>
      <p class="bonus-desc">Here's who's on each team &mdash; ${game.players.length} teams in total.</p>
      <div class="reveal-teams">
        ${game.players.map(p => `
          <div class="reveal-team-card" style="border-color:${p.color}">
            <div class="reveal-team-name" style="color:${p.color}">${escapeHtml(p.name)}</div>
            <div class="reveal-team-members">${p.members && p.members.length ? p.members.map(escapeHtml).join(' &middot; ') : '&mdash;'}</div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-primary btn-large" onclick="window.app.beginAfterReveal()">Let's Play!</button>
    `;
    document.getElementById('team-reveal-overlay').classList.add('active');
    sound.playBoardReveal();
    // A little confetti for the reveal
    setTimeout(() => {
      const rect = modal.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + 40, 40);
    }, 200);
  }

  function beginAfterReveal() {
    document.getElementById('team-reveal-overlay').classList.remove('active');
    sound.playClick();
    showGameBoard();
  }

  // ---- Game Board ----
  function showGameBoard() {
    showScreen('board-screen');
    renderBoard();
    renderScoreboard();
    updateBonusButton();
    document.querySelector('.board-header .game-title').textContent = game.gameName;
  }

  // ---- Adjust modal: fix scores / switch whose turn it is, any time ----
  function openAdjust() {
    const rows = game.players.map((p, i) => `
      <div class="adjust-row">
        <label class="adjust-turn" title="Set as current turn">
          <input type="radio" name="adjust-turn" value="${i}" ${i === game.currentPlayerIndex ? 'checked' : ''}>
        </label>
        <span class="adjust-dot" style="background:${p.color}"></span>
        <span class="adjust-name" style="color:${p.color}">${escapeHtml(p.name)}</span>
        <input type="number" class="input-field adjust-score" data-i="${i}" value="${p.score}" step="100">
      </div>`).join('');
    document.getElementById('adjust-rows').innerHTML =
      `<p class="adjust-help">&#128081; = whose turn &middot; edit the score boxes to fix the scoreline</p>` + rows;
    document.getElementById('adjust-overlay').classList.add('active');
    sound.playClick();
  }

  function closeAdjust() {
    document.getElementById('adjust-overlay').classList.remove('active');
  }

  function saveAdjust() {
    document.querySelectorAll('#adjust-rows .adjust-score').forEach(inp => {
      const i = parseInt(inp.dataset.i, 10);
      let v = parseInt(inp.value, 10);
      if (isNaN(v)) v = 0;
      if (game.players[i]) game.players[i].score = v;
    });
    const turn = document.querySelector('#adjust-rows input[name="adjust-turn"]:checked');
    if (turn) game.currentPlayerIndex = parseInt(turn.value, 10);
    closeAdjust();
    renderScoreboard();
    sound.playCorrect();
    showToast('Game adjusted', 'success');
  }

  function renderBoard() {
    const board = document.getElementById('jeopardy-board');
    const numCats = game.categories.length;

    board.style.gridTemplateColumns = `repeat(${numCats}, 1fr)`;

    let html = '';

    // Category headers
    game.categories.forEach(cat => {
      html += `<div class="board-category-header" role="columnheader">${escapeHtml(cat)}</div>`;
    });

    // Question cells (5 rows). Rendered as <button> so they are natively
    // keyboard-focusable and activate on Enter/Space.
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < numCats; col++) {
        const isAnswered = game.isCellAnswered(col, row);
        // Show this cell's actual point value (custom categories can set their own).
        const cellQ = game.board[game.categories[col]] && game.board[game.categories[col]][row];
        const pointValue = (cellQ && cellQ.points != null) ? cellQ.points : game.pointValues[row];
        const catName = game.categories[col];

        html += `
          <button type="button" class="board-cell ${isAnswered ? 'answered' : ''}"
               data-col="${col}" data-row="${row}" ${isAnswered ? 'disabled' : ''}
               aria-label="${escapeHtml(catName)}, $${pointValue}${isAnswered ? ', already played' : ''}"
               onclick="window.app.selectCell(${col}, ${row})">
            <span class="cell-value">$${pointValue}</span>
          </button>
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
        ${player.members && player.members.length ? `<div class="player-members">${escapeHtml(player.members.join(', '))}</div>` : ''}
        <div class="player-score ${player.score < 0 ? 'negative' : ''}">
          ${player.score < 0 ? '-' : ''}$${Math.abs(player.score)}
        </div>
        <div class="player-turn-indicator">YOUR TURN</div>
      </div>
    `).join('');
  }

  // Element that opened the current modal, so focus can be restored on close.
  let lastFocusedTrigger = null;

  function selectCell(col, row) {
    if (game.isCellAnswered(col, row)) return;

    const question = game.getQuestion(col, row);
    if (!question) return;

    sound.playReveal();

    // Flip animation on the cell
    const cell = document.querySelector(`.board-cell[data-col="${col}"][data-row="${row}"]`);
    if (cell) cell.classList.add('flipping');
    lastFocusedTrigger = document.activeElement;

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
    // Move keyboard focus into the dialog.
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  }

  function renderTextQuestion(question) {
    const content = document.getElementById('modal-content');

    content.innerHTML = `
      <div class="question-text">${escapeHtml(question.q)}</div>
      <div class="timer-container">
        <div class="timer-bar-wrapper">
          <div class="timer-bar" id="timer-bar" style="width: 100%"></div>
        </div>
        <div class="timer-display" id="timer-display">${game.timerDuration || "∞"}</div>
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
        <div class="correct-answer hidden-answer" id="answer-box">
          <span class="answer-label">Answer</span>
          <span id="answer-text"></span>
        </div>
        <div id="judge-controls"></div>
      </div>
    `;

    startQuestionTimer();
    initJudging();
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
        imageHtml = `<div class="question-image">${template.emoji}<br><small style="font-size:0.8rem; color: rgba(255,255,255,0.6);">${template.description}</small></div>`;
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
        <div class="timer-display" id="timer-display">${game.timerDuration || "∞"}</div>
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
        <div class="correct-answer hidden-answer" id="answer-box">
          <span class="answer-label">Answer</span>
          <span id="answer-text"></span>
        </div>
        <div id="judge-controls"></div>
      </div>
    `;

    startQuestionTimer();
    initJudging();
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
      if (isNaN(pIdx)) return;
      btn.classList.toggle('selected', pIdx === index);
      btn.style.borderColor = pIdx === index ? game.players[pIdx].color : '';
    });
  }

  function startQuestionTimer() {
    selectedAnsweringPlayer = game.currentPlayerIndex;
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer-display');
    const totalTime = game.timerDuration;

    // No-timer mode: leave the bar full, show infinity, never auto-reveal.
    if (!totalTime) {
      if (timerDisplay) timerDisplay.textContent = '∞';
      if (timerBar) timerBar.style.width = '100%';
      return;
    }

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
        // Time's up — do NOT reveal the answer; open it up for a steal.
        sound.playTimerEnd();
        timerDisplay.textContent = '0';
        timerBar.style.width = '0%';
        handleTimeUp();
      }
    );
  }

  // ---- Resolving a question (two phases: original answer, then steal) ----
  // The answer stays HIDDEN until resolved.
  //  Phase 1: did the player whose turn it is get it right?
  //           - correct  -> +points
  //           - wrong     -> NO deduction for them (Jeopardy-style), opens steal
  //  Phase 2 (steal): any OTHER player may try. A steal is a RISK:
  //           - correct  -> +points to the stealer
  //           - wrong    -> -points from the stealer (the documented downside)
  let answerShown = false;
  // Track score changes for this question so a misclick can be undone.
  let lastAward = null; // { index, delta }

  function initJudging() {
    answerShown = false;
    lastAward = null;
    renderResolvePanel(false);
  }

  function showAnswer() {
    answerShown = true;
    const box = document.getElementById('answer-box');
    const txt = document.getElementById('answer-text');
    if (txt && game.currentQuestion) txt.textContent = game.currentQuestion.a;
    if (box) box.classList.remove('hidden-answer');
  }

  // Timer ran out — don't reveal the answer; the player on turn missed their
  // chance, so go straight to the steal phase (other players can answer).
  function handleTimeUp() {
    game.stopTimer();
    renderStealPanel(true);
  }

  // ---- Phase 1: the player whose turn it is ----
  function renderResolvePanel(timedOut) {
    const controls = document.getElementById('judge-controls');
    const question = game.currentQuestion;
    if (!controls || !question) return;
    const turnPlayer = game.players[game.currentPlayerIndex];
    controls.innerHTML = `
      ${timedOut ? '<p class="times-up-note">&#9200; Time\'s up — anyone can steal now!</p>' : ''}
      <p class="judge-target">Did <strong style="color:${turnPlayer.color}">${escapeHtml(turnPlayer.name)}</strong> answer correctly? <span class="judge-pts">(&plusmn;$${question.points})</span></p>
      <div class="judge-buttons">
        <button class="btn btn-success" onclick="window.app.awardTurn(true)">&#10003; Correct (+$${question.points})</button>
        <button class="btn btn-danger" onclick="window.app.awardTurn(false)">&#10007; Wrong / no answer</button>
      </div>
      <div class="judge-buttons" style="margin-top: 12px;">
        <button class="btn btn-secondary" onclick="window.app.showAnswer()">&#128065; Show Answer</button>
        <button class="btn btn-secondary" onclick="window.app.skipFromReveal()">Skip</button>
      </div>
    `;
  }

  // Resolve the player on turn. Correct = award & finish. Wrong = no penalty,
  // open the steal phase.
  function awardTurn(isCorrect) {
    const question = game.currentQuestion;
    if (!question) return;
    game.stopTimer();
    if (isCorrect) {
      applyAward(game.currentPlayerIndex, question.points);
      celebrateAward();
      setTimeout(finishQuestion, 1100);
    } else {
      sound.playWrong();
      renderStealPanel(false);
    }
  }

  // ---- Phase 2: the steal ----
  function renderStealPanel(timedOut) {
    const controls = document.getElementById('judge-controls');
    const question = game.currentQuestion;
    if (!controls || !question) return;
    const stealers = game.players
      .map((p, i) => ({ p, i }))
      .filter(o => o.i !== game.currentPlayerIndex);
    controls.innerHTML = `
      ${timedOut ? '<p class="times-up-note">&#9200; Time\'s up — open for a steal!</p>' : ''}
      <p class="judge-target">&#128176; Steal! Tap a player, then mark their attempt. <span class="judge-pts">(correct +$${question.points} &middot; wrong &minus;$${question.points})</span></p>
      <div class="resolve-players">
        ${stealers.map(o => `
          <div class="steal-row" style="display:flex; gap:8px; align-items:center; justify-content:center; margin-bottom:8px; flex-wrap:wrap;">
            <span class="resolve-btn" style="border-color: ${o.p.color}; color: ${o.p.color}; cursor:default;">${escapeHtml(o.p.name)}</span>
            <button class="btn btn-success btn-small" onclick="window.app.resolveSteal(${o.i}, true)">&#10003; +$${question.points}</button>
            <button class="btn btn-danger btn-small" onclick="window.app.resolveSteal(${o.i}, false)">&#10007; &minus;$${question.points}</button>
          </div>`).join('')}
      </div>
      <div class="judge-buttons" style="margin-top: 12px;">
        <button class="btn btn-danger" onclick="window.app.noOneGotIt()">&#10007; No one got it</button>
        <button class="btn btn-secondary" onclick="window.app.showAnswer()">&#128065; Show Answer</button>
      </div>
    `;
  }

  // Resolve a steal attempt: correct adds points, wrong DEDUCTS them.
  function resolveSteal(index, isCorrect) {
    const question = game.currentQuestion;
    if (!question) return;
    game.stopTimer();
    if (isCorrect) {
      applyAward(index, question.points);
      celebrateAward();
      setTimeout(finishQuestion, 1100);
    } else {
      applyAward(index, -question.points);
      sound.playWrong();
      const modal = document.getElementById('question-modal');
      if (modal) { modal.classList.remove('flash-correct'); modal.classList.add('flash-wrong'); }
      // Wrong steal resolved — keep the panel open so another player can still
      // try (or the host can close it out via "No one got it").
      setTimeout(() => {
        const modal2 = document.getElementById('question-modal');
        if (modal2) modal2.classList.remove('flash-wrong');
        renderStealPanel(false);
      }, 700);
    }
  }

  // Apply a score change and remember it so it can be undone with one tap.
  function applyAward(index, delta) {
    game.adjustScore(index, delta);
    lastAward = { index, delta };
    renderScoreboard();
    showUndo();
  }

  // A small floating "undo last award" affordance (lightweight; the Adjust
  // modal remains for deeper edits).
  function showUndo() {
    if (!lastAward) return;
    let bar = document.getElementById('undo-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'undo-bar';
      bar.className = 'undo-bar';
      document.body.appendChild(bar);
    }
    const p = game.players[lastAward.index];
    const sign = lastAward.delta >= 0 ? '+' : '−';
    bar.innerHTML = `
      <span>${escapeHtml(p ? p.name : 'Player')}: ${sign}$${Math.abs(lastAward.delta)}</span>
      <button class="btn btn-secondary btn-small" onclick="window.app.undoLastAward()">&#8630; Undo</button>`;
    bar.classList.add('show');
    clearTimeout(showUndo._t);
    showUndo._t = setTimeout(() => { if (bar) bar.classList.remove('show'); }, 6000);
  }

  function undoLastAward() {
    if (!lastAward) return;
    game.adjustScore(lastAward.index, -lastAward.delta);
    lastAward = null;
    renderScoreboard();
    const bar = document.getElementById('undo-bar');
    if (bar) bar.classList.remove('show');
    sound.playClick();
    // Re-open the cell if it was already closed by finishQuestion.
    const q = game.currentQuestion;
    if (q && game.answeredCells.has(q.cellKey)) {
      game.answeredCells.delete(q.cellKey);
      game.answeredCount = Math.max(0, game.answeredCount - 1);
      game.isGameOver = false;
      renderBoard();
    }
    showToast('Last award undone', 'success');
  }

  function celebrateAward() {
    showAnswer();
    const modal = document.getElementById('question-modal');
    sound.playCorrect();
    if (modal) {
      modal.classList.remove('flash-wrong');
      modal.classList.add('flash-correct');
      const rect = modal.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
      particles.createStarBurst(rect.left + rect.width / 2, rect.top + rect.height / 3);
    }
  }

  function noOneGotIt() {
    game.stopTimer();
    showAnswer();
    sound.playWrong();
    const controls = document.getElementById('judge-controls');
    if (!controls) return;
    // If bonus rounds remain, offer to settle it with one.
    if (game.bonusLifelines > 0 && game.players.length >= 2) {
      controls.innerHTML = `
        <p class="judge-target">Nobody got it!</p>
        <div class="judge-buttons">
          <button class="btn btn-bonus" onclick="window.app.bonusFromQuestion()">&#9889; Settle with a Bonus Round (${game.bonusLifelines} left)</button>
          <button class="btn btn-secondary" onclick="window.app.skipFromReveal()">Just move on</button>
        </div>
      `;
    } else {
      setTimeout(finishQuestion, 1400);
    }
  }

  // Launch a bonus round straight from a "nobody got it" question.
  function bonusFromQuestion() {
    const question = game.currentQuestion;
    if (question) game.markAnswered(question.cellKey);
    closeQuestionModal();
    game.nextPlayer();
    renderScoreboard();
    renderBoard();
    openBonus();
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
    if (game.isGameOver) setTimeout(() => showResults(), 500);
  }

  // Skip / give up on the question with no scoring — reveal the answer, then move on.
  function skipFromReveal() {
    showAnswer();
    setTimeout(finishQuestion, 1000);
  }

  // Close out the current question (cell resolved once), advance the turn.
  function finishQuestion() {
    const question = game.currentQuestion;
    if (question) game.markAnswered(question.cellKey);
    closeQuestionModal();
    game.nextPlayer();
    renderScoreboard();
    renderBoard();
    if (game.isGameOver) setTimeout(() => showResults(), 500);
  }

  function closeQuestionModal() {
    game.stopTimer();
    const overlay = document.getElementById('question-overlay');
    overlay.classList.remove('active');
    selectedAnsweringPlayer = null;
    answerShown = false;
    // Reset any cell left mid-flip (e.g. dismissed without resolving), so it
    // doesn't stay stuck in the flip animation. Does NOT mark it answered.
    document.querySelectorAll('.board-cell.flipping').forEach(c => c.classList.remove('flipping'));
    // Return focus to the triggering cell for keyboard users.
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
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
        <p style="color: rgba(255,255,255,0.6); margin-bottom: 8px;">
          They reached <strong style="color: var(--gold)">${score}</strong> out of ${target}
        </p>
        <p style="color: rgba(255,255,255,0.45); margin-bottom: 18px; font-size: 0.9rem;">Did they complete it? (You decide &mdash; in case of a last-second answer.)</p>
        <div class="judge-buttons">
          <button class="btn btn-success" onclick="window.app.awardChallenge(true)">&#10003; Completed &mdash; Award $${question.points}</button>
          <button class="btn btn-secondary" onclick="window.app.awardChallenge(false)">&#10007; Not completed</button>
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

  // Settle an interactive challenge (single player; no steal).
  function awardChallenge(isCorrect) {
    const question = game.currentQuestion;
    if (!question) return;
    const playerIdx = selectedAnsweringPlayer !== null ? selectedAnsweringPlayer : game.currentPlayerIndex;
    const modal = document.getElementById('question-modal');
    if (isCorrect) {
      game.adjustScore(playerIdx, question.points); // wrong = no points (no penalty)
      modal.classList.add('flash-correct');
    } else {
      sound.playWrong();
      modal.classList.add('flash-wrong');
    }
    renderScoreboard();
    setTimeout(finishQuestion, 800);
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

  // ---- Bonus Round (head-to-head lifeline) ----
  let bonusState = null;

  function updateBonusButton() {
    const btn = document.getElementById('bonus-btn');
    if (!btn) return;
    const n = game.bonusLifelines || 0;
    btn.innerHTML = `&#9889; Bonus (${n})`;
    btn.disabled = n <= 0;
    btn.classList.toggle('disabled', n <= 0);
  }

  function buildBonusPool() {
    // Rapid-fire should be STRAIGHTFORWARD: use only the easy tiers ($200/$400).
    const pool = [];
    Object.keys(QUESTION_BANK).forEach(cat => {
      (QUESTION_BANK[cat] || []).forEach(q => {
        if (q.type === 'text' && q.q && q.a && q.points <= 400) pool.push({ q: q.q, a: q.a });
      });
    });
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }

  function pickTwoPlayers() {
    const n = game.players.length;
    const a = Math.floor(Math.random() * n);
    let b = Math.floor(Math.random() * n);
    while (b === a && n > 1) b = Math.floor(Math.random() * n);
    return { a, b };
  }

  function openBonus() {
    if (!game.players || game.players.length < 2) return;
    if ((game.bonusLifelines || 0) <= 0) {
      showToast('No bonus rounds left this game', 'error');
      return;
    }
    const pick = pickTwoPlayers();
    bonusState = {
      mode: 'trivia',            // 'trivia' (rapid-fire) | 'name' (bidding) | 'feud'
      a: pick.a, b: pick.b,
      duration: 45,
      scores: { a: 0, b: 0 },    // used by trivia mode
      current: 'a', queue: [], qIndex: 0,
      prompt: NAME_PROMPTS[Math.floor(Math.random() * NAME_PROMPTS.length)],
      bid: 10, attempter: 'a', count: 0,
      feudIndex: (typeof FAMILY_FEUD !== 'undefined') ? Math.floor(Math.random() * FAMILY_FEUD.length) : 0,
      feudRevealed: {},
      useReps: false, repA: null, repB: null
    };
    rollBonusReps();
    sound.playClick();
    renderBonusSetup();
    document.getElementById('bonus-overlay').classList.add('active');
  }

  // For team games, pick a random member from each team to represent it.
  function rollBonusReps() {
    const ma = game.players[bonusState.a] && game.players[bonusState.a].members;
    const mb = game.players[bonusState.b] && game.players[bonusState.b].members;
    bonusState.repA = (ma && ma.length) ? ma[Math.floor(Math.random() * ma.length)] : null;
    bonusState.repB = (mb && mb.length) ? mb[Math.floor(Math.random() * mb.length)] : null;
  }

  // Label for a contestant slot — shows the random member (if using players) + team.
  function contestantLabel(slot) {
    const idx = slot === 'a' ? bonusState.a : bonusState.b;
    const team = game.players[idx];
    const rep = slot === 'a' ? bonusState.repA : bonusState.repB;
    if (bonusState.useReps && rep) return escapeHtml(rep) + ' <small>(' + escapeHtml(team.name) + ')</small>';
    return escapeHtml(team.name);
  }

  function setBonusUseReps(on) {
    bonusState.useReps = on;
    if (on) rollBonusReps();
    sound.playClick();
    renderBonusSetup();
  }

  function setBonusFeud(index) { bonusState.feudIndex = parseInt(index, 10); }

  // Randomize everything: contestants, member reps, and the topic/question.
  function randomizeBonus() {
    const pick = pickTwoPlayers();
    bonusState.a = pick.a; bonusState.b = pick.b;
    rollBonusReps();
    bonusState.prompt = NAME_PROMPTS[Math.floor(Math.random() * NAME_PROMPTS.length)];
    if (typeof FAMILY_FEUD !== 'undefined') bonusState.feudIndex = Math.floor(Math.random() * FAMILY_FEUD.length);
    sound.playBoardReveal();
    renderBonusSetup();
  }

  // Prompts for the "name as many as you can" bidding challenge (host counts).
  let NAME_PROMPTS = [
    'Countries in Europe', 'Countries in Africa', 'Countries in Asia',
    'World capital cities', 'U.S. states', 'NBA teams', 'Football (soccer) clubs',
    'Elements on the periodic table', 'Disney animated movies', 'Ocean animals',
    'Car brands', 'Pizza toppings', 'Marvel superheroes', 'Types of fruit'
  ];
  if (typeof NAME_PROMPTS_EXTRA !== 'undefined') {
    NAME_PROMPTS = NAME_PROMPTS.concat(NAME_PROMPTS_EXTRA);
  }

  function setBonusMode(mode) {
    bonusState.mode = mode;
    sound.playClick();
    renderBonusSetup();
  }

  function setBonusPrompt(val) { bonusState.prompt = val; }
  function setBonusBid(delta) {
    bonusState.bid = Math.max(1, Math.min(99, bonusState.bid + delta));
    sound.playClick();
    renderBonusSetup();
  }
  function setBonusAttempter(slot) {
    bonusState.attempter = slot;
    sound.playClick();
    renderBonusSetup();
  }

  function playerOption(slot) {
    return game.players.map((p, i) =>
      `<option value="${i}" ${bonusState[slot] === i ? 'selected' : ''}>${escapeHtml(p.name)}</option>`
    ).join('');
  }

  function renderBonusSetup() {
    const m = document.getElementById('bonus-modal');
    const A = game.players[bonusState.a], B = game.players[bonusState.b];
    const mode = bonusState.mode;
    const isName = mode === 'name';
    const isFeud = mode === 'feud';
    const teamsHaveMembers = game.players.some(p => p.members && p.members.length);

    const modeToggle = `
      <div class="bonus-mode-toggle">
        <button class="team-mode-btn ${mode === 'trivia' ? 'selected' : ''}" onclick="window.app.setBonusMode('trivia')">&#9889; Rapid-Fire</button>
        <button class="team-mode-btn ${isName ? 'selected' : ''}" onclick="window.app.setBonusMode('name')">&#128221; Name as Many</button>
        <button class="team-mode-btn ${isFeud ? 'selected' : ''}" onclick="window.app.setBonusMode('feud')">&#128101; Family Feud</button>
      </div>`;

    const facensToggle = teamsHaveMembers ? `
      <div class="bonus-faceoff">
        <button class="team-mode-btn ${!bonusState.useReps ? 'selected' : ''}" onclick="window.app.setBonusUseReps(false)">Whole teams</button>
        <button class="team-mode-btn ${bonusState.useReps ? 'selected' : ''}" onclick="window.app.setBonusUseReps(true)">&#127922; Random players</button>
      </div>` : '';

    const repsLine = (bonusState.useReps && teamsHaveMembers)
      ? `<p class="bonus-reps">${contestantLabel('a')} &nbsp;vs&nbsp; ${contestantLabel('b')}</p>` : '';

    const vs = `
      ${facensToggle}
      <div class="bonus-vs">
        <div class="bonus-slot" style="border-color:${A.color}">
          <label>Side 1</label>
          <select class="input-field" onchange="window.app.setBonusPlayer('a', this.value)">${playerOption('a')}</select>
        </div>
        <div class="bonus-vs-label">VS</div>
        <div class="bonus-slot" style="border-color:${B.color}">
          <label>Side 2</label>
          <select class="input-field" onchange="window.app.setBonusPlayer('b', this.value)">${playerOption('b')}</select>
        </div>
      </div>
      ${repsLine}`;

    let body, desc, startBtn;
    if (isFeud) {
      const feud = (typeof FAMILY_FEUD !== 'undefined') ? FAMILY_FEUD : [];
      desc = `Survey says! Both sides guess the top answers. Reveal them one by one, then award <strong>+$250</strong> to the side that found the most.`;
      body = `
        ${vs}
        <div class="bonus-name-setup">
          <label class="bonus-field-label">Survey question</label>
          <select class="input-field" onchange="window.app.setBonusFeud(this.value)">
            ${feud.map((f, i) => `<option value="${i}" ${i === bonusState.feudIndex ? 'selected' : ''}>${escapeHtml(f.prompt.replace('We asked 100 people: ', ''))}</option>`).join('')}
          </select>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusFeud()">Start Feud!</button>`;
    } else if (isName) {
      desc = `Pick a topic and bid: "I can name X." The bidder must name that many before time runs out. Make it &rarr; <strong>+$250</strong>; fall short &rarr; the opponent gets <strong>+$250</strong>.`;
      const attA = game.players[bonusState.a], attB = game.players[bonusState.b];
      body = `
        ${vs}
        <div class="bonus-name-setup">
          <label class="bonus-field-label">Topic to name</label>
          <select class="input-field" onchange="window.app.setBonusPrompt(this.value)">
            ${NAME_PROMPTS.map(p => `<option ${p === bonusState.prompt ? 'selected' : ''}>${escapeHtml(p)}</option>`).join('')}
          </select>
          <label class="bonus-field-label">Winning bid &mdash; how many will they name?</label>
          <div class="bid-stepper">
            <button class="btn btn-secondary" onclick="window.app.setBonusBid(-1)">&minus;</button>
            <span class="bid-value">${bonusState.bid}</span>
            <button class="btn btn-secondary" onclick="window.app.setBonusBid(1)">+</button>
          </div>
          <label class="bonus-field-label">Who took the bid (has to name them)?</label>
          <div class="bonus-attempter">
            <button class="team-mode-btn ${bonusState.attempter === 'a' ? 'selected' : ''}" onclick="window.app.setBonusAttempter('a')" style="border-color:${attA.color}">${contestantLabel('a')}</button>
            <button class="team-mode-btn ${bonusState.attempter === 'b' ? 'selected' : ''}" onclick="window.app.setBonusAttempter('b')" style="border-color:${attB.color}">${contestantLabel('b')}</button>
          </div>
        </div>
        <div class="bonus-duration">
          <span>Timer:</span>
          <div class="timer-selector">
            ${[30, 45, 60].map(d => `<button class="timer-option ${bonusState.duration === d ? 'selected' : ''}" onclick="window.app.setBonusDuration(${d})">${d}s</button>`).join('')}
          </div>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusName()">Start Naming!</button>`;
    } else {
      desc = `Two contestants go one at a time: answer as many questions as you can before the clock runs out. Most correct wins <strong>+$250</strong>.`;
      body = `
        ${vs}
        <div class="bonus-duration">
          <span>Time each:</span>
          <div class="timer-selector">
            ${[30, 45, 60].map(d => `<button class="timer-option ${bonusState.duration === d ? 'selected' : ''}" onclick="window.app.setBonusDuration(${d})">${d}s</button>`).join('')}
          </div>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusDuel()">Start Duel</button>`;
    }

    m.innerHTML = `
      <span class="bonus-icon">&#9889;</span>
      <h2 class="bonus-title">Bonus Round</h2>
      ${modeToggle}
      <p class="bonus-desc">${desc} (Lifeline &mdash; ${game.bonusLifelines} left.)</p>
      ${body}
      <div class="bonus-actions">
        <button class="btn btn-secondary" onclick="window.app.randomizeBonus()">&#127922; Randomize</button>
        ${startBtn}
      </div>
      <button class="btn btn-secondary btn-small bonus-cancel" onclick="window.app.closeBonus()">Cancel</button>
    `;
  }

  function setBonusPlayer(slot, val) {
    const idx = parseInt(val);
    bonusState[slot] = idx;
    const other = slot === 'a' ? 'b' : 'a';
    if (bonusState.useReps) rollBonusReps();
    if (bonusState[other] === idx) {
      bonusState[other] = (idx + 1) % game.players.length;
    }
    renderBonusSetup();
  }

  function setBonusDuration(d) {
    bonusState.duration = d;
    sound.playClick();
    renderBonusSetup();
  }

  function rerollBonus() {
    const pick = pickTwoPlayers();
    bonusState.a = pick.a;
    bonusState.b = pick.b;
    sound.playBoardReveal();
    renderBonusSetup();
  }

  function startBonusDuel() {
    if (bonusState.a === bonusState.b) {
      showToast('Pick two different contestants', 'error');
      return;
    }
    bonusState.queue = buildBonusPool();
    bonusState.qIndex = 0;
    bonusState.scores = { a: 0, b: 0 };
    bonusState.current = 'a';
    sound.playBoardReveal();
    renderBonusIntro();
  }

  function renderBonusIntro() {
    const m = document.getElementById('bonus-modal');
    const slot = bonusState.current;
    const p = game.players[slot === 'a' ? bonusState.a : bonusState.b];
    m.innerHTML = `
      <div class="bonus-intro">
        <p class="bonus-intro-label">Get ready, Contestant ${slot === 'a' ? '1' : '2'}!</p>
        <h2 class="bonus-intro-name" style="color:${p.color}">${escapeHtml(p.name)}</h2>
        <p class="bonus-desc">${bonusState.duration} seconds &mdash; answer as many as you can. Hand the device to ${escapeHtml(p.name)}!</p>
        <button class="btn btn-primary btn-large" onclick="window.app.beginBonusTurn()">Go!</button>
      </div>
    `;
  }

  function beginBonusTurn() {
    renderBonusPlay();
    game.startTimer(bonusState.duration,
      (remaining) => {
        const bar = document.getElementById('bonus-timer-bar');
        const disp = document.getElementById('bonus-timer-display');
        if (bar) bar.style.width = (remaining / bonusState.duration * 100) + '%';
        if (disp) disp.textContent = remaining;
        if (remaining <= 5) { if (bar) bar.classList.add('critical'); sound.playTimerWarning(); }
      },
      () => {
        sound.playTimerEnd();
        if (bonusState.current === 'a') {
          bonusState.current = 'b';
          renderBonusIntro();
        } else {
          endBonusDuel();
        }
      }
    );
  }

  function currentBonusQuestion() {
    if (bonusState.qIndex >= bonusState.queue.length) {
      bonusState.queue = bonusState.queue.concat(buildBonusPool());
    }
    return bonusState.queue[bonusState.qIndex];
  }

  function renderBonusPlay() {
    const m = document.getElementById('bonus-modal');
    const slot = bonusState.current;
    const p = game.players[slot === 'a' ? bonusState.a : bonusState.b];
    const q = currentBonusQuestion();
    m.innerHTML = `
      <div class="bonus-play">
        <div class="bonus-play-head">
          <span style="color:${p.color}; font-weight:700">${escapeHtml(p.name)}</span>
          <span class="bonus-score">Correct: <strong id="bonus-count">${bonusState.scores[slot]}</strong></span>
        </div>
        <div class="timer-bar-wrapper"><div class="timer-bar" id="bonus-timer-bar" style="width:100%"></div></div>
        <div class="timer-display" id="bonus-timer-display">${bonusState.duration}</div>
        <div class="bonus-question">${escapeHtml(q.q)}</div>
        <div class="bonus-answer" id="bonus-answer" style="display:none;">Answer: <strong>${escapeHtml(q.a)}</strong></div>
        <div class="bonus-play-actions">
          <button class="btn btn-secondary btn-small" onclick="window.app.bonusPeek()">&#128065; Check</button>
          <button class="btn btn-success" onclick="window.app.bonusCorrect()">&#10003; Correct</button>
          <button class="btn btn-secondary" onclick="window.app.bonusSkip()">Skip &rarr;</button>
        </div>
      </div>
    `;
  }

  function bonusPeek() {
    const a = document.getElementById('bonus-answer');
    if (a) a.style.display = a.style.display === 'none' ? 'block' : 'none';
  }

  function bonusAdvance(correct) {
    const slot = bonusState.current;
    if (correct) { bonusState.scores[slot]++; sound.playChallengeCorrect(); }
    bonusState.qIndex++;
    renderBonusPlay();
  }
  function bonusCorrect() { bonusAdvance(true); }
  function bonusSkip() { bonusAdvance(false); }

  function endBonusDuel() {
    game.stopTimer();
    const sa = bonusState.scores.a, sb = bonusState.scores.b;
    const A = game.players[bonusState.a], B = game.players[bonusState.b];
    let resultHtml;
    if (sa === sb) {
      resultHtml = `<p class="bonus-result-tie">It's a tie at ${sa}! No bonus awarded.</p>`;
    } else {
      const winIdx = sa > sb ? bonusState.a : bonusState.b;
      const win = game.players[winIdx];
      game.adjustScore(winIdx, 250);
      resultHtml = `<p class="bonus-result-win" style="color:${win.color}">&#127942; ${escapeHtml(win.name)} wins +$250!</p>`;
    }
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();

    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">Bonus Results</h2>
      <div class="bonus-final">
        <div class="bonus-final-row" style="border-color:${A.color}"><span style="color:${A.color}">${escapeHtml(A.name)}</span><strong>${sa} correct</strong></div>
        <div class="bonus-final-row" style="border-color:${B.color}"><span style="color:${B.color}">${escapeHtml(B.name)}</span><strong>${sb} correct</strong></div>
      </div>
      ${resultHtml}
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>
    `;
    if (sa !== sb) {
      const rect = m.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
      sound.playGameOver();
    }
  }

  // ---- Bonus: "Name as many" bidding challenge ----
  function startBonusName() {
    if (bonusState.a === bonusState.b) {
      showToast('Pick two different contestants', 'error');
      return;
    }
    bonusState.count = 0;
    sound.playBoardReveal();
    renderBonusNamePlay();
    game.startTimer(bonusState.duration,
      (remaining) => {
        const bar = document.getElementById('bonus-timer-bar');
        const disp = document.getElementById('bonus-timer-display');
        if (bar) bar.style.width = (remaining / bonusState.duration * 100) + '%';
        if (disp) disp.textContent = remaining;
        if (remaining <= 5) { if (bar) bar.classList.add('critical'); sound.playTimerWarning(); }
      },
      () => { sound.playTimerEnd(); endBonusName(); }
    );
  }

  function renderBonusNamePlay() {
    const m = document.getElementById('bonus-modal');
    const att = game.players[bonusState.attempter === 'a' ? bonusState.a : bonusState.b];
    m.innerHTML = `
      <div class="bonus-play">
        <div class="bonus-play-head">
          <span style="color:${att.color}; font-weight:700">${escapeHtml(att.name)}</span>
          <span class="bonus-score">Target: <strong>${bonusState.bid}</strong></span>
        </div>
        <div class="timer-bar-wrapper"><div class="timer-bar" id="bonus-timer-bar" style="width:100%"></div></div>
        <div class="timer-display" id="bonus-timer-display">${bonusState.duration}</div>
        <div class="bonus-question">Name as many as you can:<br><span style="color:var(--gold)">${escapeHtml(bonusState.prompt)}</span></div>
        <div class="bonus-name-counter"><span id="bonus-name-count">0</span> / ${bonusState.bid}</div>
        <div class="bonus-play-actions">
          <button class="btn btn-success btn-large" onclick="window.app.bonusNameCount()">+1 Correct</button>
          <button class="btn btn-secondary" onclick="window.app.bonusNameDone()">Stop</button>
        </div>
      </div>`;
  }

  function bonusNameCount() {
    bonusState.count++;
    sound.playChallengeCorrect();
    const el = document.getElementById('bonus-name-count');
    if (el) el.textContent = bonusState.count;
    if (bonusState.count >= bonusState.bid) { game.stopTimer(); endBonusName(); }
  }

  function bonusNameDone() { game.stopTimer(); endBonusName(); }

  function endBonusName() {
    game.stopTimer();
    const reached = bonusState.count >= bonusState.bid;
    const attIdx = bonusState.attempter === 'a' ? bonusState.a : bonusState.b;
    const oppIdx = bonusState.attempter === 'a' ? bonusState.b : bonusState.a;
    const att = game.players[attIdx];
    const winIdx = reached ? attIdx : oppIdx;
    const win = game.players[winIdx];
    game.adjustScore(winIdx, 250);
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();

    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">${reached ? 'Bid Made!' : 'Came Up Short!'}</h2>
      <p class="bonus-desc">${escapeHtml(att.name)} named <strong>${bonusState.count}</strong> of ${bonusState.bid} &mdash; ${escapeHtml(bonusState.prompt)}.</p>
      <p class="bonus-result-win" style="color:${win.color}">&#127942; ${escapeHtml(win.name)} wins +$250!</p>
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>`;
    const rect = m.getBoundingClientRect();
    particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
    sound.playGameOver();
  }

  // ---- Bonus: Family Feud ----
  function startBonusFeud() {
    if (bonusState.a === bonusState.b) { showToast('Pick two different sides', 'error'); return; }
    if (typeof FAMILY_FEUD === 'undefined' || !FAMILY_FEUD[bonusState.feudIndex]) return;
    bonusState.feudRevealed = {};
    sound.playBoardReveal();
    renderBonusFeudPlay();
  }

  function renderBonusFeudPlay() {
    const m = document.getElementById('bonus-modal');
    const f = FAMILY_FEUD[bonusState.feudIndex];
    const slots = f.answers.map((ans, i) => `
      <button class="feud-slot ${bonusState.feudRevealed[i] ? 'revealed' : ''}" onclick="window.app.revealFeudAnswer(${i})">
        <span class="feud-rank">${i + 1}</span>
        <span class="feud-text">${bonusState.feudRevealed[i] ? escapeHtml(ans) : '&middot; &middot; &middot;'}</span>
      </button>`).join('');
    const A = game.players[bonusState.a], B = game.players[bonusState.b];
    m.innerHTML = `
      <span class="bonus-icon">&#128101;</span>
      <h2 class="bonus-title">Family Feud</h2>
      <p class="bonus-feud-q">${escapeHtml(f.prompt)}</p>
      <p class="bonus-desc">Tap an answer to reveal it as a side calls it out.</p>
      <div class="feud-board">${slots}</div>
      <p class="bonus-field-label">Who found the most? Award +$250:</p>
      <div class="resolve-players">
        <button class="resolve-btn" style="border-color:${A.color};color:${A.color}" onclick="window.app.awardFeud('a')">${contestantLabel('a')}</button>
        <button class="resolve-btn" style="border-color:${B.color};color:${B.color}" onclick="window.app.awardFeud('b')">${contestantLabel('b')}</button>
      </div>
      <div class="judge-buttons" style="margin-top:12px;">
        <button class="btn btn-secondary" onclick="window.app.awardFeud('tie')">Tie / no winner</button>
      </div>`;
  }

  function revealFeudAnswer(i) {
    bonusState.feudRevealed[i] = true;
    sound.playChallengeCorrect();
    renderBonusFeudPlay();
  }

  function awardFeud(winner) {
    const win = winner === 'tie' ? null : game.players[winner === 'a' ? bonusState.a : bonusState.b];
    if (win) game.adjustScore(winner === 'a' ? bonusState.a : bonusState.b, 250);
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();
    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">${winner === 'tie' ? "It's a tie!" : 'Bonus Won!'}</h2>
      ${win ? `<p class="bonus-result-win" style="color:${win.color}">&#127942; ${escapeHtml(win.name)} wins +$250!</p>` : '<p class="bonus-result-tie">No points awarded.</p>'}
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>`;
    if (win) {
      const r = m.getBoundingClientRect();
      particles.createConfetti(r.left + r.width / 2, r.top + r.height / 2, 50);
      sound.playGameOver();
    }
  }

  function closeBonus() {
    game.stopTimer();
    const overlay = document.getElementById('bonus-overlay');
    if (overlay) overlay.classList.remove('active');
    bonusState = null;
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

  // Escape a string for safe use inside a single-quoted JS string that itself
  // lives inside a double-quoted HTML attribute, e.g.
  //   onclick="window.app.foo('${escapeJs(name)}')"
  // Backslash MUST be escaped first. We also HTML-encode the characters that
  // could break out of the attribute (", <, >, &) so names containing quotes,
  // parentheses, or markup can't corrupt the handler.
  function escapeJs(str) {
    if (!str) return '';
    return String(str)
      .replace(/\\/g, '\\\\')   // backslash first
      .replace(/'/g, "\\'")     // close the JS string
      .replace(/\r?\n/g, ' ')   // no raw newlines in an attribute
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')  // close the HTML attribute
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
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

    // Focus trap: keep Tab focus inside whichever modal overlay is open.
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const openOverlay = document.querySelector('.modal-overlay.active');
      if (!openOverlay) return;
      const focusables = openOverlay.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      } else if (!openOverlay.contains(document.activeElement)) {
        e.preventDefault(); first.focus();
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
    selectBonusRounds,
    selectFormat,
    selectTeamCount,
    selectTeamMode,
    updateTeamName,
    updateTeamMember,
    addTeamMember,
    removeTeamMember,
    shuffleTeams,
    addPlayer,
    removePlayer,
    updatePlayerName,
    selectTimer,
    proceedFromSetup,
    toggleTopic,
    filterTopics,
    surpriseMe,
    openCustomCategory,
    closeCustomCategory,
    saveCustomCategory,
    startTopicGame,
    shareCurrentGame,
    copyShareLink,
    closeShare,
    beginAfterReveal,
    openAdjust,
    closeAdjust,
    saveAdjust,
    openBonus,
    setBonusMode,
    setBonusPlayer,
    setBonusDuration,
    setBonusPrompt,
    setBonusBid,
    setBonusAttempter,
    setBonusUseReps,
    setBonusFeud,
    randomizeBonus,
    rerollBonus,
    startBonusDuel,
    startBonusFeud,
    revealFeudAnswer,
    awardFeud,
    beginBonusTurn,
    bonusPeek,
    bonusCorrect,
    bonusSkip,
    startBonusName,
    bonusNameCount,
    bonusNameDone,
    closeBonus,
    switchCustomTab,
    updateCategoryName,
    updateCustomQuestion,
    startCustomGame,
    selectCell,
    selectAnsweringPlayer,
    showAnswer,
    awardTurn,
    resolveSteal,
    undoLastAward,
    noOneGotIt,
    bonusFromQuestion,
    skipQuestion,
    skipFromReveal,
    startChallenge,
    awardChallenge,
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
