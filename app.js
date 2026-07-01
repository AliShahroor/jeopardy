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
    "Arab World": "&#128332;",
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
  const CATEGORY_PRESETS = {
    party: ['General Knowledge', 'Arab World', 'Football (Soccer)', 'Movies & TV', 'Music & Songs', 'Food & Drink'],
    arab: ['Arab World', 'Flags of the World', 'Football (Soccer)', 'Food & Drink', 'Famous Landmarks', 'General Knowledge'],
    football: ['Football (Soccer)', 'Sports', 'Flags of the World', 'Famous People', 'General Knowledge', 'Pop Culture'],
    hard: ['Science', 'History', 'Mythology', 'World Religions', 'Technology & Inventions', 'Art & Literature'],
    world: ['Flags of the World', 'Geography', 'Famous Landmarks', 'Arab World', 'World Religions', 'History'],
    cinema: ['Movies & TV', 'Music & Songs', 'Pop Culture', 'Famous People', 'Art & Literature', 'General Knowledge'],
    food: ['Food & Drink', 'Arab World', 'Geography', 'Science', 'General Knowledge', 'Pop Culture'],
    school: ['Science', 'History', 'Geography', 'Math & Logic', 'Technology & Inventions', 'Art & Literature']
  };
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

  function applyPreset(name) {
    const available = getAvailableCategories();
    const preset = CATEGORY_PRESETS[name] || [];
    setupState.selectedTopics = preset.filter(cat => available.includes(cat)).slice(0, 6);
    topicSearch = '';
    const search = document.getElementById('topic-search');
    if (search) search.value = '';
    sound.playBoardReveal();
    renderTopicGrid();
    showToast('Preset loaded — hit Start!', 'success');
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
      <div class="question-text">${escapeHtml(displayQuestionText(question.q))}</div>
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

    if (question.image) {
      imageHtml = `<img class="question-image question-image--asset" src="${escapeHtml(question.image)}" alt="${escapeHtml(question.imageAlt || question.q || 'Question image')}" loading="lazy">`;
    } else if (question.emoji) {
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
      <div class="question-text">${escapeHtml(displayQuestionText(question.q))}</div>
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
      <div class="question-text">${escapeHtml(displayQuestionText(question.q))}</div>
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
      <p class="judge-target">Did <strong style="color:${turnPlayer.color}">${escapeHtml(turnPlayer.name)}</strong> answer correctly? <span class="judge-pts">(+$${question.points})</span></p>
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
      <p class="judge-target">&#128176; Steal! Tap whoever got it right. <span class="judge-pts">(+$${question.points})</span></p>
      <div class="resolve-players">
        ${stealers.map(o => `
          <button class="resolve-btn" style="border-color: ${o.p.color}; color: ${o.p.color}" onclick="window.app.resolveSteal(${o.i})">
            &#10003; ${escapeHtml(o.p.name)} &nbsp;+$${question.points}
          </button>`).join('')}
      </div>
      <div class="judge-buttons" style="margin-top: 12px;">
        <button class="btn btn-danger" onclick="window.app.noOneGotIt()">&#10007; No one got it</button>
        <button class="btn btn-secondary" onclick="window.app.showAnswer()">&#128065; Show Answer</button>
      </div>
    `;
  }

  // Resolve a steal: the chosen player got it right (+points). Wrong answers
  // never deduct — the host just taps "No one got it" to move on.
  function resolveSteal(index) {
    const question = game.currentQuestion;
    if (!question) return;
    game.stopTimer();
    applyAward(index, question.points);
    celebrateAward();
    setTimeout(finishQuestion, 1100);
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
    if (question) {
      game.markAnswered(question.cellKey);
      if (window.rememberSeenQuestion) window.rememberSeenQuestion(question);
    }
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
    if (question) {
      game.markAnswered(question.cellKey);
      if (window.rememberSeenQuestion) window.rememberSeenQuestion(question);
    }
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

    const gains = game.players.map((player, idx) => ({
      player,
      gain: player.score - ((game.initialScores && game.initialScores[idx]) || 0),
      bonus: (game.bonusAwards && game.bonusAwards[idx]) || 0
    }));
    const comeback = gains.slice().sort((a, b) => b.gain - a.gain)[0];
    const bonusWinner = gains.slice().sort((a, b) => b.bonus - a.bonus)[0];
    const recap = document.getElementById('results-recap');
    if (recap) {
      recap.innerHTML = `
        <div class="recap-card">
          <span>MVP</span>
          <strong>${escapeHtml(winner.name)} &middot; $${winner.score}</strong>
        </div>
        <div class="recap-card">
          <span>Biggest Comeback</span>
          <strong>${comeback ? `${escapeHtml(comeback.player.name)} &middot; +$${Math.max(0, comeback.gain)}` : 'No comeback'}</strong>
        </div>
        <div class="recap-card">
          <span>Bonus Winner</span>
          <strong>${bonusWinner && bonusWinner.bonus > 0 ? `${escapeHtml(bonusWinner.player.name)} &middot; +$${bonusWinner.bonus}` : 'No bonus winner'}</strong>
        </div>
      `;
    }

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

  function downloadResultsCard() {
    if (!game || !game.players || game.players.length === 0) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const w = 1080;
    const h = 1350;
    canvas.width = w;
    canvas.height = h;

    const scoreboard = game.getScoreboard();
    const winner = game.getWinner();
    const gains = game.players.map((player, idx) => ({
      player,
      gain: player.score - ((game.initialScores && game.initialScores[idx]) || 0),
      bonus: (game.bonusAwards && game.bonusAwards[idx]) || 0
    }));
    const comeback = gains.slice().sort((a, b) => b.gain - a.gain)[0];
    const bonusWinner = gains.slice().sort((a, b) => b.bonus - a.bonus)[0];

    function roundedRect(x, y, width, height, radius) {
      if (ctx.roundRect) {
        ctx.roundRect(x, y, width, height, radius);
        return;
      }
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    }

    ctx.fillStyle = '#050A4E';
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(255,215,0,0.24)');
    grad.addColorStop(0.52, 'rgba(6,12,233,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0.26)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.font = '700 58px Arial, sans-serif';
    ctx.fillText('Jeopardy Night', w / 2, 125);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 92px Arial, sans-serif';
    ctx.fillText(winner.name, w / 2, 245);
    ctx.fillStyle = '#FFD700';
    ctx.font = '700 52px Arial, sans-serif';
    ctx.fillText(`Winner  $${winner.score}`, w / 2, 320);

    function card(x, y, width, height, label, value) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      roundedRect(x, y, width, height, 18);
      ctx.fill();
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255,255,255,0.62)';
      ctx.font = '700 25px Arial, sans-serif';
      ctx.fillText(label, x + 30, y + 45);
      ctx.fillStyle = '#FFD700';
      ctx.font = '700 34px Arial, sans-serif';
      ctx.fillText(value, x + 30, y + 96);
    }

    card(80, 390, 280, 135, 'MVP', `${winner.name}`);
    card(400, 390, 280, 135, 'Comeback', comeback ? `${comeback.player.name} +$${Math.max(0, comeback.gain)}` : 'None');
    card(720, 390, 280, 135, 'Bonus', bonusWinner && bonusWinner.bonus > 0 ? `${bonusWinner.player.name} +$${bonusWinner.bonus}` : 'None');

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 40px Arial, sans-serif';
    ctx.fillText('Final Standings', 90, 625);

    scoreboard.forEach((player, idx) => {
      const y = 700 + idx * 105;
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.beginPath();
      roundedRect(80, y - 55, 920, 78, 14);
      ctx.fill();
      ctx.fillStyle = idx === 0 ? '#FFD700' : '#FFFFFF';
      ctx.font = '700 34px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${idx + 1}. ${player.name}`, 120, y);
      ctx.textAlign = 'right';
      ctx.fillText(`$${player.score}`, 955, y);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.58)';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('Developed by Ali Shahroor and Mohamed Al Ani', w / 2, h - 80);

    const link = document.createElement('a');
    link.download = `jeopardy-results-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Share card downloaded!', 'success');
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
    // Bonus rapid-fire uses its OWN bank (bonus-data.js / RAPID_FIRE), kept
    // separate from the board so players never see the same question twice.
    // Falls back to the easy board tiers only if the bonus bank is unavailable.
    let pool = [];
    if (typeof RAPID_FIRE !== 'undefined' && RAPID_FIRE.length) {
      pool = RAPID_FIRE.map(q => ({ q: q.q, a: q.a, accept: q.accept || [] }));
    } else {
      Object.keys(QUESTION_BANK).forEach(cat => {
        (QUESTION_BANK[cat] || []).forEach(q => {
          if (q.type === 'text' && q.q && q.a && q.points <= 400) pool.push({ q: q.q, a: q.a, accept: [] });
        });
      });
    }
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
    const teamsHaveMembers = game.players.some(p => p.members && p.members.length);
    bonusState = {
      mode: 'trivia',            // 'trivia' (rapid-fire) | 'name' | 'wager' | 'feud'
      a: pick.a, b: pick.b,
      duration: 45,
      perCorrect: 100,           // rapid-fire: $ per correct answer
      scores: { a: 0, b: 0 },    // rapid-fire correct counts
      earned: { a: 0, b: 0 },    // rapid-fire $ earned (banked at end)
      current: 'a', queue: [], qIndex: 0,
      prompt: NAME_PROMPTS[Math.floor(Math.random() * NAME_PROMPTS.length)],
      nameScoring: 'bid',        // target challenge: high bidder must name that many
      ratePer: 10, ratePay: 100, // rate mode: every <ratePer> named = $<ratePay>
      bid: 10, bidWager: 100, attempter: 'a', count: 0, namedList: [],
      wagerSide: 'a', wager: 500, wagerQ: null, // double-or-nothing
      feudIndex: (typeof FAMILY_FEUD !== 'undefined') ? Math.floor(Math.random() * FAMILY_FEUD.length) : 0,
      feudRevealed: {}, feudFound: { a: 0, b: 0 },
      // Default to random individuals facing off in team games (random vs random).
      useReps: teamsHaveMembers, repA: null, repB: null
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
    bonusState.bidWager = nameBidPayout();
    sound.playClick();
    renderBonusSetup();
  }
  function raiseNameBid(slot) {
    bonusState.attempter = slot;
    bonusState.bid = Math.max(1, Math.min(99, bonusState.bid + 1));
    bonusState.bidWager = nameBidPayout();
    sound.playClick();
    renderBonusSetup();
  }
  function setBonusAttempter(slot) {
    bonusState.attempter = slot;
    sound.playClick();
    renderBonusSetup();
  }

  function setNameScoring(mode) {
    bonusState.nameScoring = mode;
    sound.playClick();
    renderBonusSetup();
  }
  function setRate(which, delta) {
    if (which === 'per') bonusState.ratePer = Math.max(1, Math.min(100, bonusState.ratePer + delta));
    else bonusState.ratePay = Math.max(25, Math.min(1000, bonusState.ratePay + delta));
    bonusState.bidWager = nameBidPayout();
    sound.playClick();
    renderBonusSetup();
  }

  function nameBidPayout() {
    const groups = Math.floor((bonusState.bid || 0) / Math.max(1, bonusState.ratePer || 1));
    return Math.min(1000, Math.max(bonusState.ratePay || 25, groups * (bonusState.ratePay || 25)));
  }

  // ---- High-Stakes wager helpers ----
  function wagerCap() {
    const w = game.players[bonusState.a];
    return Math.max(500, (w && w.score) || 0);
  }
  function setWagerPlayer(i) {
    bonusState.a = i;
    bonusState.wager = Math.min(bonusState.wager, wagerCap());
    sound.playClick();
    renderBonusSetup();
  }
  function setWager(delta) {
    bonusState.wager = Math.max(100, Math.min(wagerCap(), bonusState.wager + delta));
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
    const isWager = mode === 'wager';
    const teamsHaveMembers = game.players.some(p => p.members && p.members.length);

    const modeToggle = `
      <div class="bonus-mode-toggle">
        <button class="team-mode-btn ${mode === 'trivia' ? 'selected' : ''}" onclick="window.app.setBonusMode('trivia')">&#9889; Rapid-Fire</button>
        <button class="team-mode-btn ${isName ? 'selected' : ''}" onclick="window.app.setBonusMode('name')">&#128221; Name as Many</button>
        <!-- High Stakes (double-or-nothing) temporarily disabled — questions need work. -->
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
      desc = `Choose a survey question.`;
      body = `
        ${vs}
        <div class="bonus-name-setup">
          <label class="bonus-field-label">Survey question</label>
          <select class="input-field" onchange="window.app.setBonusFeud(this.value)">
            ${feud.map((f, i) => `<option value="${i}" ${i === bonusState.feudIndex ? 'selected' : ''}>${escapeHtml(f.prompt.replace('We asked 100 people: ', ''))}</option>`).join('')}
          </select>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusFeud()">Start Feud!</button>`;
    } else if (isWager) {
      const cap = wagerCap();
      desc = `Double or nothing! One contestant wagers up to <strong>$${cap}</strong>, then faces one tough question (type the answer). Nail it &rarr; <strong>win the wager</strong>. Miss &rarr; <strong>lose it</strong>.`;
      body = `
        <div class="bonus-name-setup">
          <label class="bonus-field-label">Who's taking the risk?</label>
          <div class="bonus-attempter bonus-attempter--wrap">
            ${game.players.map((p, i) => `<button class="team-mode-btn ${bonusState.a === i ? 'selected' : ''}" style="border-color:${p.color}" onclick="window.app.setWagerPlayer(${i})">${escapeHtml(p.name)} <small>($${p.score})</small></button>`).join('')}
          </div>
          <label class="bonus-field-label">Wager (max $${cap})</label>
          <div class="bid-stepper">
            <button class="btn btn-secondary" onclick="window.app.setWager(-100)">&minus;</button>
            <span class="bid-value">$${bonusState.wager}</span>
            <button class="btn btn-secondary" onclick="window.app.setWager(100)">+</button>
          </div>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusWager()">&#127922; Roll the Dice</button>`;
    } else if (isName) {
      const key = (typeof NAME_PROMPT_KEY !== 'undefined') ? NAME_PROMPT_KEY[bonusState.prompt] : null;
      const typed = key && typeof NAME_SETS !== 'undefined' && NAME_SETS[key];
      bonusState.bidWager = nameBidPayout();
      desc = `Set the payout rate, then raise the target back and forth. When a side stops, the high bidder must name <strong>${bonusState.bid}</strong>. Make it for <strong>+$${bonusState.bidWager}</strong>; miss and the other side gets <strong>+$${bonusState.bidWager}</strong>.`;
      const attA = game.players[bonusState.a], attB = game.players[bonusState.b];
      body = `
        ${vs}
        <div class="bonus-name-setup">
          <label class="bonus-field-label">Topic to name ${typed ? '<span class="typed-badge">type to auto-check</span>' : '<span class="typed-badge muted">host counts</span>'}</label>
          <select class="input-field" onchange="window.app.setBonusPrompt(this.value)">
            ${NAME_PROMPTS.map(p => `<option ${p === bonusState.prompt ? 'selected' : ''}>${escapeHtml(p)}</option>`).join('')}
          </select>
          <label class="bonus-field-label">Every <strong>${bonusState.ratePer}</strong> named = <strong>$${bonusState.ratePay}</strong></label>
          <div class="bid-stepper">
            <span class="bid-label">per</span>
            <button class="btn btn-secondary" onclick="window.app.setRate('per',-1)">&minus;</button>
            <span class="bid-value">${bonusState.ratePer}</span>
            <button class="btn btn-secondary" onclick="window.app.setRate('per',1)">+</button>
            <span class="bid-label">= $</span>
            <button class="btn btn-secondary" onclick="window.app.setRate('pay',-25)">&minus;</button>
            <span class="bid-value">${bonusState.ratePay}</span>
            <button class="btn btn-secondary" onclick="window.app.setRate('pay',25)">+</button>
          </div>
          <label class="bonus-field-label">Current high bid</label>
          <div class="bid-stepper">
            <button class="btn btn-secondary" onclick="window.app.setBonusBid(-1)">&minus;</button>
            <span class="bid-value">${bonusState.bid}</span>
            <button class="btn btn-secondary" onclick="window.app.setBonusBid(1)">+</button>
            <span class="bid-label">for</span>
            <span class="bid-value">$${bonusState.bidWager}</span>
          </div>
          <label class="bonus-field-label">Bidding war</label>
          <div class="bonus-attempter">
            <button class="team-mode-btn ${bonusState.attempter === 'a' ? 'selected' : ''}" onclick="window.app.raiseNameBid('a')" style="border-color:${attA.color}">${contestantLabel('a')} says ${bonusState.bid + 1}</button>
            <button class="team-mode-btn ${bonusState.attempter === 'b' ? 'selected' : ''}" onclick="window.app.raiseNameBid('b')" style="border-color:${attB.color}">${contestantLabel('b')} says ${bonusState.bid + 1}</button>
          </div>
          <p class="bonus-desc" style="font-size:.9rem;margin-top:8px;">Current high bidder: <strong>${contestantLabel(bonusState.attempter)}</strong>. Press Start when the other side stops/challenges.</p>
        </div>
        <div class="bonus-duration">
          <span>Timer:</span>
          <div class="timer-selector">
            ${[30, 45, 60, 90].map(d => `<button class="timer-option ${bonusState.duration === d ? 'selected' : ''}" onclick="window.app.setBonusDuration(${d})">${d}s</button>`).join('')}
          </div>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusName()">Start Naming!</button>`;
    } else {
      desc = `Two contestants take turns. Type each answer &mdash; every correct one banks <strong>+$${bonusState.perCorrect}</strong>. Keep what you earn!`;
      body = `
        ${vs}
        <div class="bonus-duration">
          <span>Time each:</span>
          <div class="timer-selector">
            ${[30, 45, 60].map(d => `<button class="timer-option ${bonusState.duration === d ? 'selected' : ''}" onclick="window.app.setBonusDuration(${d})">${d}s</button>`).join('')}
          </div>
        </div>`;
      startBtn = `<button class="btn btn-primary btn-large" onclick="window.app.startBonusDuel()">Start Rapid-Fire</button>`;
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
          <span class="bonus-score">Earned <strong id="bonus-earned">$${bonusState.earned[slot]}</strong> &middot; <span id="bonus-count">${bonusState.scores[slot]}</span> right</span>
        </div>
        <div class="timer-bar-wrapper"><div class="timer-bar" id="bonus-timer-bar" style="width:100%"></div></div>
        <div class="timer-display" id="bonus-timer-display">${bonusState.duration}</div>
        <div class="bonus-question">${escapeHtml(q.q)}</div>
        <input type="text" id="bonus-input" class="input-field bonus-input" autocomplete="off" placeholder="Type the answer &amp; press Enter…" onkeydown="if(event.key==='Enter'){event.preventDefault();window.app.bonusSubmitTyped();}">
        <div class="bonus-answer" id="bonus-answer" style="display:none;">Answer: <strong>${escapeHtml(q.a)}</strong></div>
        <div class="bonus-play-actions">
          <button class="btn btn-success" onclick="window.app.bonusSubmitTyped()">&#10003; Submit (+$${bonusState.perCorrect})</button>
          <button class="btn btn-secondary btn-small" onclick="window.app.bonusPeek()">&#128065; Reveal</button>
          <button class="btn btn-secondary btn-small" onclick="window.app.bonusMarkCorrect()">Mark right</button>
          <button class="btn btn-secondary btn-small" onclick="window.app.bonusSkip()">Skip &rarr;</button>
        </div>
      </div>
    `;
    const inp = document.getElementById('bonus-input');
    if (inp) inp.focus();
  }

  function bonusPeek() {
    const a = document.getElementById('bonus-answer');
    if (a) a.style.display = a.style.display === 'none' ? 'block' : 'none';
  }

  // Typed answer: fuzzy-matched (synonyms/typos) against the question's answer.
  function bonusSubmitTyped() {
    const inp = document.getElementById('bonus-input');
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    const q = currentBonusQuestion();
    if (window.fuzzyAnswerMatch(val, q.a, q.accept)) {
      bonusAdvance(true);
    } else {
      inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
      if (sound.playWrong) sound.playWrong();
      inp.value = '';
      inp.focus();
    }
  }

  // Host override — count the current question right without typing.
  function bonusMarkCorrect() { bonusAdvance(true); }

  function bonusAdvance(correct) {
    const slot = bonusState.current;
    if (correct) {
      bonusState.scores[slot]++;
      bonusState.earned[slot] += bonusState.perCorrect;
      sound.playChallengeCorrect();
    }
    bonusState.qIndex++;
    renderBonusPlay();
  }
  function bonusCorrect() { bonusAdvance(true); }
  function bonusSkip() { bonusAdvance(false); }

  function endBonusDuel() {
    game.stopTimer();
    const A = game.players[bonusState.a], B = game.players[bonusState.b];
    const ea = bonusState.earned.a, eb = bonusState.earned.b;
    // Everyone keeps what they earned (per-correct), no winner-take-all.
    if (ea > 0) game.adjustScore(bonusState.a, ea, { bonus: true });
    if (eb > 0) game.adjustScore(bonusState.b, eb, { bonus: true });
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();

    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">Rapid-Fire Results</h2>
      <div class="bonus-final">
        <div class="bonus-final-row" style="border-color:${A.color}"><span style="color:${A.color}">${escapeHtml(A.name)}</span><strong>${bonusState.scores.a} right &middot; +$${ea}</strong></div>
        <div class="bonus-final-row" style="border-color:${B.color}"><span style="color:${B.color}">${escapeHtml(B.name)}</span><strong>${bonusState.scores.b} right &middot; +$${eb}</strong></div>
      </div>
      <p class="bonus-desc">Everyone keeps what they earned!</p>
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>
    `;
    if (ea > 0 || eb > 0) {
      const rect = m.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
      sound.playGameOver();
    }
  }

  // ---- Bonus: "Name as many" (rate or bid scoring, with typed auto-check) ----
  function startBonusName() {
    if (bonusState.a === bonusState.b) {
      showToast('Pick two different contestants', 'error');
      return;
    }
    bonusState.count = 0;
    bonusState.namedList = [];
    bonusState.nameKey = (typeof NAME_PROMPT_KEY !== 'undefined') ? NAME_PROMPT_KEY[bonusState.prompt] : null;
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

  function nameRateEarned() {
    return Math.floor(bonusState.count / bonusState.ratePer) * bonusState.ratePay;
  }

  function renderBonusNamePlay() {
    const m = document.getElementById('bonus-modal');
    const att = game.players[bonusState.attempter === 'a' ? bonusState.a : bonusState.b];
    const typed = bonusState.nameKey && typeof NAME_SETS !== 'undefined' && NAME_SETS[bonusState.nameKey];
    const goalLine = `<div class="bonus-name-counter"><span id="bonus-name-count">${bonusState.count}</span> / ${bonusState.bid}</div>`;
    m.innerHTML = `
      <div class="bonus-play">
        <div class="bonus-play-head">
          <span style="color:${att.color}; font-weight:700">${escapeHtml(att.name)}</span>
          <span class="bonus-score">Target: <strong>${bonusState.bid}</strong> &middot; Wager: <strong>$${bonusState.bidWager}</strong></span>
        </div>
        <div class="timer-bar-wrapper"><div class="timer-bar" id="bonus-timer-bar" style="width:100%"></div></div>
        <div class="timer-display" id="bonus-timer-display">${bonusState.duration}</div>
        <div class="bonus-question">Name as many as you can:<br><span style="color:var(--gold)">${escapeHtml(bonusState.prompt)}</span></div>
        ${goalLine}
        ${typed ? `
          <input type="text" id="bonus-input" class="input-field bonus-input" autocomplete="off" placeholder="Type one &amp; press Enter…" onkeydown="if(event.key==='Enter'){event.preventDefault();window.app.bonusNameSubmit();}">
          <div class="bonus-named-tags" id="bonus-named-tags"></div>
          <div class="bonus-play-actions">
            <button class="btn btn-success" onclick="window.app.bonusNameSubmit()">Add</button>
            <button class="btn btn-secondary" onclick="window.app.bonusNameDone()">Stop &amp; Score</button>
          </div>` : `
          <div class="bonus-play-actions">
            <button class="btn btn-success btn-large" onclick="window.app.bonusNameCount()">+1 Correct</button>
            <button class="btn btn-secondary" onclick="window.app.bonusNameDone()">Stop &amp; Score</button>
          </div>`}
      </div>`;
    const inp = document.getElementById('bonus-input');
    if (inp) inp.focus();
    renderNamedTags();
  }

  function renderNamedTags() {
    const el = document.getElementById('bonus-named-tags');
    if (!el) return;
    el.innerHTML = bonusState.namedList.slice(-15).map(n => `<span class="named-tag">${escapeHtml(n)}</span>`).join('');
  }

  // Typed entry for set-backed prompts: validates against NAME_SETS, rejects
  // wrong answers and duplicates.
  function bonusNameSubmit() {
    const inp = document.getElementById('bonus-input');
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    const set = NAME_SETS[bonusState.nameKey];
    const matched = window.matchNameSet(val, set);
    const isDup = matched && bonusState.namedList.some(n => window.normalizeAnswer(n) === matched);
    if (!matched || isDup) {
      inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
      if (!matched && sound.playWrong) sound.playWrong();
      inp.value = '';
      inp.focus();
      return;
    }
    bonusState.namedList.push(val.trim());
    bonusNameCount();
    inp.value = '';
    inp.focus();
  }

  function bonusNameCount() {
    bonusState.count++;
    sound.playChallengeCorrect();
    const el = document.getElementById('bonus-name-count');
    if (el) el.textContent = bonusState.count;
    renderNamedTags();
    if (bonusState.count >= bonusState.bid) { game.stopTimer(); endBonusName(); }
  }

  function bonusNameDone() { game.stopTimer(); endBonusName(); }

  function endBonusName() {
    game.stopTimer();
    const attIdx = bonusState.attempter === 'a' ? bonusState.a : bonusState.b;
    const oppIdx = bonusState.attempter === 'a' ? bonusState.b : bonusState.a;
    const att = game.players[attIdx];
    let winIdx, award, title, line;
    const reached = bonusState.count >= bonusState.bid;
    award = bonusState.bidWager;
    if (reached) { winIdx = attIdx; title = 'Bid Made!'; }
    else { winIdx = oppIdx; title = 'Came Up Short!'; }
    line = `${escapeHtml(att.name)} named <strong>${bonusState.count}</strong> of ${bonusState.bid} for <strong>$${bonusState.bidWager}</strong> &mdash; ${escapeHtml(bonusState.prompt)}.`;
    const win = game.players[winIdx];
    if (award > 0) game.adjustScore(winIdx, award, { bonus: true });
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();

    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">${title}</h2>
      <p class="bonus-desc">${line}</p>
      ${award > 0
        ? `<p class="bonus-result-win" style="color:${win.color}">&#127942; ${escapeHtml(win.name)} wins +$${award}!</p>`
        : `<p class="bonus-result-tie">No points this time.</p>`}
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>`;
    if (award > 0) {
      const rect = m.getBoundingClientRect();
      particles.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
      sound.playGameOver();
    }
  }

  // ---- Bonus: High Stakes (double or nothing) ----
  function startBonusWager() {
    bonusState.wagerQ = (function () { const pool = buildBonusPool(); return pool[0] || { q: '(no question available)', a: '', accept: [] }; })();
    bonusState.duration = 30;
    sound.playBoardReveal();
    renderBonusWagerPlay();
    game.startTimer(30,
      (remaining) => {
        const bar = document.getElementById('bonus-timer-bar');
        const disp = document.getElementById('bonus-timer-display');
        if (bar) bar.style.width = (remaining / 30 * 100) + '%';
        if (disp) disp.textContent = remaining;
        if (remaining <= 5) { if (bar) bar.classList.add('critical'); sound.playTimerWarning(); }
      },
      () => { sound.playTimerEnd(); resolveWager(false); }
    );
  }

  function renderBonusWagerPlay() {
    const m = document.getElementById('bonus-modal');
    const w = game.players[bonusState.a];
    const q = bonusState.wagerQ;
    m.innerHTML = `
      <div class="bonus-play">
        <div class="bonus-play-head">
          <span style="color:${w.color}; font-weight:700">${escapeHtml(w.name)}</span>
          <span class="bonus-score">Wager: <strong>$${bonusState.wager}</strong></span>
        </div>
        <div class="timer-bar-wrapper"><div class="timer-bar" id="bonus-timer-bar" style="width:100%"></div></div>
        <div class="timer-display" id="bonus-timer-display">30</div>
        <div class="bonus-question">${escapeHtml(q.q)}</div>
        <input type="text" id="bonus-input" class="input-field bonus-input" autocomplete="off" placeholder="Type your answer &amp; press Enter…" onkeydown="if(event.key==='Enter'){event.preventDefault();window.app.wagerSubmit();}">
        <div class="bonus-play-actions">
          <button class="btn btn-success" onclick="window.app.wagerSubmit()">&#10003; Lock it in</button>
          <button class="btn btn-secondary" onclick="window.app.wagerGiveUp()">Give up</button>
        </div>
      </div>`;
    const inp = document.getElementById('bonus-input');
    if (inp) inp.focus();
  }

  function wagerSubmit() {
    const inp = document.getElementById('bonus-input');
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    const q = bonusState.wagerQ;
    resolveWager(window.fuzzyAnswerMatch(val, q.a, q.accept));
  }
  function wagerGiveUp() { resolveWager(false); }

  function resolveWager(correct) {
    game.stopTimer();
    const idx = bonusState.a;
    const w = game.players[idx];
    const q = bonusState.wagerQ;
    game.adjustScore(idx, correct ? bonusState.wager : -bonusState.wager, { bonus: true });
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();
    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">${correct ? '&#127942;' : '&#128128;'}</span>
      <h2 class="bonus-title">${correct ? 'Big Win!' : 'Wiped Out!'}</h2>
      <p class="bonus-desc">Answer: <strong>${escapeHtml(q.a)}</strong></p>
      <p class="${correct ? 'bonus-result-win' : 'bonus-result-tie'}" style="color:${w.color}">${escapeHtml(w.name)} ${correct ? 'wins +$' + bonusState.wager : 'loses $' + bonusState.wager}!</p>
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>`;
    if (correct) {
      const r = m.getBoundingClientRect();
      particles.createConfetti(r.left + r.width / 2, r.top + r.height / 2, 60);
      sound.playGameOver();
    } else if (sound.playWrong) {
      sound.playWrong();
    }
  }

  // ---- Bonus: Family Feud (RANKED: top answer = $700, down to $100) ----
  function startBonusFeud() {
    if (bonusState.a === bonusState.b) { showToast('Pick two different sides', 'error'); return; }
    if (typeof FAMILY_FEUD === 'undefined' || !FAMILY_FEUD[bonusState.feudIndex]) return;
    bonusState.feudRevealed = {};
    bonusState.feudSide = 'a';
    sound.playBoardReveal();
    renderBonusFeudPlay();
  }

  // Raw display name for a contestant slot (no HTML), for safe escaping at use.
  function contestantNameOnly(slot) {
    const idx = slot === 'a' ? bonusState.a : bonusState.b;
    const team = game.players[idx];
    const rep = slot === 'a' ? bonusState.repA : bonusState.repB;
    if (bonusState.useReps && rep) return rep;
    return team.name;
  }

  // Ranked value for the answer at index i out of `total`: the #1 answer is
  // worth $700, the last $100, evenly spaced and rounded to the nearest $50.
  function feudValue(i, total) {
    if (total <= 1) return 700;
    return Math.round((700 - (600 * i) / (total - 1)) / 50) * 50;
  }
  function feudTotals() {
    const f = FAMILY_FEUD[bonusState.feudIndex];
    const t = { a: 0, b: 0 };
    f.answers.forEach((_, i) => {
      const w = bonusState.feudRevealed[i];
      if (w === 'a' || w === 'b') t[w] += feudValue(i, f.answers.length);
    });
    return t;
  }

  function renderBonusFeudPlay() {
    const m = document.getElementById('bonus-modal');
    const f = FAMILY_FEUD[bonusState.feudIndex];
    const total = f.answers.length;
    const A = game.players[bonusState.a], B = game.players[bonusState.b];
    const nameA = escapeHtml(contestantNameOnly('a')), nameB = escapeHtml(contestantNameOnly('b'));
    const side = bonusState.feudSide || 'a';
    const creditControls = (i) => `
      <span class="feud-credit">
        <button class="btn btn-secondary" onclick="event.stopPropagation();window.app.feudCredit(${i}, 'a')">${nameA}</button>
        <button class="btn btn-secondary" onclick="event.stopPropagation();window.app.feudCredit(${i}, 'b')">${nameB}</button>
        <button class="btn btn-secondary" onclick="event.stopPropagation();window.app.feudCredit(${i}, 'none')">No points</button>
      </span>`;
    const slots = f.answers.map((ans, i) => {
      const val = feudValue(i, total);
      const who = bonusState.feudRevealed[i];
      if (who) {
        const p = who === 'a' ? A : (who === 'b' ? B : null);
        const credit = p ? ` <small style="color:${p.color}">(${who === 'a' ? nameA : nameB})</small>` : '';
        return `<div class="feud-slot revealed">
          <span class="feud-rank"${p ? ` style="background:${p.color}"` : ''}>${i + 1}</span>
          <span class="feud-text">${escapeHtml(ans)}${credit}</span>
          <span class="feud-value">$${val}</span>
          ${creditControls(i)}
        </div>`;
      }
      return `<div class="feud-slot">
        <span class="feud-rank">${i + 1}</span>
        <span class="feud-text">&middot; &middot; &middot; <small class="feud-worth">$${val}</small></span>
        ${creditControls(i)}
      </div>`;
    }).join('');
    const tot = feudTotals();
    m.innerHTML = `
      <span class="bonus-icon">&#128101;</span>
      <h2 class="bonus-title">Family Feud</h2>
      <p class="bonus-feud-q">${escapeHtml(f.prompt)}</p>
      <p class="bonus-desc">A side calls an answer &mdash; pick who's guessing, type it, and matches reveal automatically. <strong>#1 = $700</strong> down to <strong>$100</strong>.</p>
      <div class="bonus-attempter" style="margin-bottom:10px;">
        <button class="team-mode-btn ${side === 'a' ? 'selected' : ''}" style="border-color:${A.color}" onclick="window.app.feudSetSide('a')">${nameA}</button>
        <button class="team-mode-btn ${side === 'b' ? 'selected' : ''}" style="border-color:${B.color}" onclick="window.app.feudSetSide('b')">${nameB}</button>
      </div>
      <input type="text" id="feud-input" class="input-field bonus-input" autocomplete="off" placeholder="Type the answer they said &amp; press Enter…" onkeydown="if(event.key==='Enter'){event.preventDefault();window.app.feudGuess();}">
      <div class="feud-board">${slots}</div>
      <p class="bonus-field-label" style="text-align:center">${nameA}: <strong>$${tot.a}</strong> &nbsp;&middot;&nbsp; ${nameB}: <strong>$${tot.b}</strong></p>
      <div class="judge-buttons" style="margin-top:12px;">
        <button class="btn btn-secondary" onclick="window.app.feudRevealRest()">Reveal the rest</button>
        <button class="btn btn-primary btn-large" onclick="window.app.finishFeud()">Finish &amp; Award</button>
      </div>`;
    const inp = document.getElementById('feud-input');
    if (inp) inp.focus();
  }

  function feudSetSide(side) {
    bonusState.feudSide = side;
    sound.playClick();
    renderBonusFeudPlay();
  }

  const FEUD_ACCEPT = {
    'cleaning the bathroom': [
      'clean bathroom', 'clean the bathroom', 'bathroom', 'washroom',
      'cleaning the washroom', 'clean washroom', 'clean the washroom',
      'restroom', 'cleaning the restroom', 'clean restroom', 'clean the restroom',
      'toilet', 'cleaning the toilet', 'clean toilet', 'clean the toilet'
    ],
    'taking out trash': [
      'take out trash', 'take out the trash', 'taking out the trash',
      'trash', 'garbage', 'taking out garbage', 'taking out the garbage',
      'take out garbage', 'take out the garbage'
    ],
    'brush teeth': ['brushing teeth', 'brush my teeth', 'brush your teeth', 'tooth brushing'],
    'check phone': ['checking phone', 'check my phone', 'look at phone', 'look at my phone'],
    'drink coffee': ['coffee', 'have coffee', 'drinking coffee'],
    'eat breakfast': ['breakfast', 'have breakfast', 'eating breakfast'],
    'hit snooze': ['snooze', 'snooze alarm', 'hit the snooze button'],
    'ice cream cone': ['ice cream', 'icecream cone'],
    'beach ball': ['ball'],
    'watch tv': ['watch television', 'television', 'tv'],
    'take a nap': ['nap', 'sleep', 'sleeping'],
    'read a book': ['read', 'reading', 'book'],
    'take a bath': ['bath', 'bathe'],
    'go for a walk': ['walk', 'walking'],
    'listen to music': ['music', 'listening to music'],
    'have a snack': ['snack', 'eat a snack'],
    'bad weather': ['weather'],
    'car trouble': ['car problems', 'car broke down'],
    'long coffee line': ['coffee line', 'line at coffee shop'],
    'water bottle': ['water', 'bottle'],
    'mowing the lawn': ['mow lawn', 'mow the lawn', 'cut grass', 'cutting grass'],
    'chocolate syrup': ['chocolate sauce'],
    'whipped cream': ['whip cream'],
    'hot fudge': ['fudge']
  };

  function feudAccepts(answer) {
    return FEUD_ACCEPT[window.normalizeAnswer(answer)] || [];
  }

  // Type what a side called out; fuzzy-match it to a hidden answer and reveal it.
  function feudGuess() {
    const inp = document.getElementById('feud-input');
    if (!inp) return;
    const val = inp.value.trim();
    if (!val) return;
    const f = FAMILY_FEUD[bonusState.feudIndex];
    let hit = -1;
    for (let i = 0; i < f.answers.length; i++) {
      if (bonusState.feudRevealed[i]) continue;
      if (window.fuzzyAnswerMatch(val, f.answers[i], feudAccepts(f.answers[i]))) { hit = i; break; }
    }
    if (hit === -1) {
      inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
      if (sound.playWrong) sound.playWrong();
      inp.value = '';
      inp.focus();
      return;
    }
    bonusState.feudRevealed[hit] = bonusState.feudSide || 'a';
    sound.playChallengeCorrect();
    renderBonusFeudPlay();
  }

  // Reveal any answers nobody found (no points credited).
  function feudRevealRest() {
    const f = FAMILY_FEUD[bonusState.feudIndex];
    f.answers.forEach((_, i) => { if (!bonusState.feudRevealed[i]) bonusState.feudRevealed[i] = 'none'; });
    sound.playBoardReveal();
    renderBonusFeudPlay();
  }

  function revealFeudAnswer(i, side) {
    bonusState.feudRevealed[i] = side;
    sound.playChallengeCorrect();
    renderBonusFeudPlay();
  }

  function feudCredit(i, side) {
    bonusState.feudRevealed[i] = side;
    sound.playClick();
    renderBonusFeudPlay();
  }

  function finishFeud() {
    const tot = feudTotals();
    const aPay = tot.a, bPay = tot.b;
    if (aPay > 0) game.adjustScore(bonusState.a, aPay, { bonus: true });
    if (bPay > 0) game.adjustScore(bonusState.b, bPay, { bonus: true });
    if (game.bonusLifelines > 0) game.bonusLifelines--;
    updateBonusButton();
    renderScoreboard();
    const A = game.players[bonusState.a], B = game.players[bonusState.b];
    const m = document.getElementById('bonus-modal');
    m.innerHTML = `
      <span class="bonus-icon">&#127942;</span>
      <h2 class="bonus-title">Feud Results</h2>
      <div class="bonus-final">
        <div class="bonus-final-row" style="border-color:${A.color}"><span style="color:${A.color}">${escapeHtml(contestantNameOnly('a'))}</span><strong>+$${aPay}</strong></div>
        <div class="bonus-final-row" style="border-color:${B.color}"><span style="color:${B.color}">${escapeHtml(contestantNameOnly('b'))}</span><strong>+$${bPay}</strong></div>
      </div>
      <button class="btn btn-primary btn-large" onclick="window.app.closeBonus()">Back to Game</button>`;
    if (aPay > 0 || bPay > 0) {
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
  function displayQuestionText(str) {
    return String(str || '').replace(/^(Quick recall|Recall|Alternate clue|Category challenge|Board bonus|Deep pool clue|Fresh wording):\s*/i, '');
  }

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
    applyPreset,
    downloadResultsCard,
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
    raiseNameBid,
    setBonusAttempter,
    setBonusUseReps,
    setBonusFeud,
    setNameScoring,
    setRate,
    setWagerPlayer,
    setWager,
    randomizeBonus,
    rerollBonus,
    startBonusDuel,
    startBonusFeud,
    startBonusWager,
    wagerSubmit,
    wagerGiveUp,
    revealFeudAnswer,
    feudSetSide,
    feudGuess,
    feudCredit,
    feudRevealRest,
    finishFeud,
    beginBonusTurn,
    bonusPeek,
    bonusSubmitTyped,
    bonusMarkCorrect,
    bonusCorrect,
    bonusSkip,
    startBonusName,
    bonusNameSubmit,
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
