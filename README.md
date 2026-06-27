# Jeopardy! Game

A polished, fully client-side Jeopardy party game. No backend, no build step,
no cost — open `index.html` in any browser, or host it free (see `../DEPLOY.md`).

**Live site:** https://alishahroor.github.io/jeopardy/

## Features

- **Login** with a name (saved locally, with quick-login for returning players).
- **Topic Mode** — pick 6 from **24 broad, exciting themes** (General Knowledge,
  Sports, History, Geography, Movies & TV, Music, Science, Famous People,
  Video Games, Anime, Football, Flags, and more). Questions are clean, direct
  **question-and-answer** trivia (well-known facts, no cryptic wordplay), and a
  fresh randomized board is built every game. Geography even mixes in flag
  questions. Use the **search box** to find a theme.
  - **🎲 Surprise Me** auto-picks 6 random categories.
- **Custom Mode** — write your own categories, questions, and answers.
- **Question types:**
  - **Text** — classic trivia clues.
  - **Image** — e.g. *"Which country does this flag belong to?"* (flag emoji
    render as real flags on most devices).
  - **Interactive challenges** — rapid-fire rounds like *"Name 30 European
    countries in 60 seconds"*.
- **Adjustable timer** per question (30s → 2 min), changeable per game.
- **Individuals or Teams** — play solo (2–4 players) or in groups. Name the
  teams and members yourself, or paste a list of people and **shuffle them into
  random teams**.
- **2–4 players/teams**, scoreboard (teams show their members), turn tracking.
- **💰 Steal** — when a player answers wrong, any other player can steal:
  answer correctly to take the points, or get it wrong and lose them.
- **⚡ Bonus Rounds (lifeline)** — optional, configurable count per game. In team
  games a **random player from each side** faces off. Bonus questions come from a
  **separate bank** (`bonus-data.js`), so they never repeat the board. Four modes
  with variable, risk/reward payouts:
  - *⚡ Rapid-Fire* — take turns; **type each answer** (close spellings &
    synonyms count via fuzzy matching). Every correct one banks **+$100**; you
    keep what you earn.
  - *📝 Name as Many* — pick a topic and play **Rate** (every *N* named banks
    $*X*, e.g. every 10 countries = $100) or **Bid** (call a number → hit it for
    **bid × $25**, miss → opponent gets $100). Supported topics (countries,
    capitals, states, planets, elements, NBA teams) let you **type answers** that
    auto-validate.
  - *🎲 High Stakes* — double-or-nothing: a player wagers up to their score on one
    question. Nail it → win the wager; miss → lose it.
  - *👥 Family Feud* — reveal the survey answers and tap who called each; every
    find banks **+$50** for that side.
- **💾 Save / Load** — remembers the entire game: board, every score, whose
  turn it is, answered cells, timer, and bonus rounds left.
- **🔗 Share** — turn any game into a link. Anyone who opens it plays your exact
  board (categories, questions, timer). No account needed. Great for sharing a
  custom quiz with friends.
- **Save / Load** games locally per user.
- Sound effects (Web Audio — no files), confetti, and animations.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All screens (login, menu, setup, board, modals). Loads the data files in order: `jeopardy-data.js`, `jeopardy-extra.js`, `bonus-data.js`, `enrich-data.js`, `questions.js`, then `game.js`, `app.js`. |
| `style.css`  | All styling (dark/gold Jeopardy theme, responsive). |
| `jeopardy-data.js` | `REAL_CATEGORIES` — the broad, curated direct-Q&A themes (General Knowledge, Movies & TV, etc.). Loaded **first**. |
| `jeopardy-extra.js` | `EXTRA_QUESTIONS` (more questions for existing categories + a few new ones like Logos & Brands, TV Shows), plus `FAMILY_FEUD` survey data and `NAME_PROMPTS_EXTRA`. |
| `bonus-data.js` | **Separate bonus content** so bonus rounds never reuse a board question: `RAPID_FIRE` (short Q&A with `accept` aliases), `NAME_SETS` (normalized acceptable-answer lists for typed "Name as Many"), and `NAME_PROMPT_KEY` (maps a prompt to its answer set). |
| `enrich-data.js` | `ENRICH_QUESTIONS` — extra, difficulty-laddered questions that enrich the thinner genre categories (Video Games, Anime, Mythology, …). |
| `questions.js` | Defines `QUESTION_BANK` (genre categories like Video Games, Anime, Flags) **and** runs the merge + de-dupe pipeline (see below), plus `CHALLENGE_ANSWERS` for the interactive challenges. |
| `game.js` | Game engine, local storage, sound, particle systems, and the fuzzy answer matcher (`fuzzyAnswerMatch`, `matchNameSet`). |
| `app.js` | UI controller: screens, board rendering, the resolve/steal flow, all four bonus modes, sharing, etc. |

### How the question bank is assembled

The playable bank is built in `questions.js` at load time, in this order:

1. Start with the `QUESTION_BANK` literal defined in `questions.js`.
2. `Object.assign(QUESTION_BANK, REAL_CATEGORIES)` — merge in (and overwrite
   same-named categories from) `jeopardy-data.js`.
3. **Filter:** every category **not** listed in `ACTIVE_CATEGORIES`
   (in `questions.js`) is deleted. This is the curated, user-visible set.
4. Merge in `EXTRA_QUESTIONS` (`jeopardy-extra.js`) then `ENRICH_QUESTIONS`
   (`enrich-data.js`), each de-duped by question text.
5. **De-dupe pass:** drop any repeated answer within a category and any question
   whose exact text already appeared in another category (flags de-dupe by
   answer, since they share a prompt). A tier is never emptied.
6. Sprinkle in a few interactive rapid-fire challenges.

> Note: because of step 3, any category whose name is not in `ACTIVE_CATEGORIES`
> never appears in a game. `RAPID_FIRE`/`NAME_SETS` (bonus content) are **not**
> part of this board bank — that separation is intentional.

## Adding your own genre to the built-in bank

Open `questions.js` and add a new key to `QUESTION_BANK`:

```js
"My Genre": [
  { q: "Clue text…", a: "Answer", points: 200, type: "text" },
  // 5 questions per point value (200/400/600/800/1000) works best
]
```

**Important:** you must also add `"My Genre"` to the `ACTIVE_CATEGORIES` array in
`questions.js` — otherwise the merge pipeline (step 3 above) filters it out and
it will never show up on the board. Optionally add an icon for it in
`app.js` → `CATEGORY_ICONS`.

## Note on "AI generates any genre"

A truly tiny model bundled in the page can't produce accurate trivia (it would
hallucinate facts and be a huge download). So this uses a **curated offline
bank + a randomized board generator** instead: reliable, instant, free, and it
works with no internet and no API keys. If you ever want live arbitrary-genre
generation, that can be added later via an optional (free) LLM API key.
