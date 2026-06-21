# Jeopardy! Game

A polished, fully client-side Jeopardy party game. No backend, no build step,
no cost — open `index.html` in any browser, or host it free (see `../DEPLOY.md`).

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
- **⚡ Bonus Rounds (lifeline)** — twice per game, optional, two modes:
  *Rapid-Fire Trivia* (each contestant answers as many questions as they can in
  30–60s) or *Name as Many* (pick a topic, bid how many you can name, then name
  them before the clock runs out). Winner takes **+$250**.
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
| `index.html` | All screens (login, menu, setup, board, modals). |
| `style.css`  | All styling (dark/gold Jeopardy theme, responsive). |
| `questions.js` | The curated question bank (26 categories) + challenge answer sets. |
| `game.js` | Game engine, local storage, sound, and particle systems. |
| `app.js` | UI controller: screens, board rendering, sharing, etc. |

## Adding your own genre to the built-in bank

Open `questions.js` and add a new key to `QUESTION_BANK`:

```js
"My Genre": [
  { q: "Clue text…", a: "Answer", points: 200, type: "text" },
  // 5 questions per point value (200/400/600/800/1000) works best
]
```

Optionally add an icon for it in `app.js` → `CATEGORY_ICONS`.

## Note on "AI generates any genre"

A truly tiny model bundled in the page can't produce accurate trivia (it would
hallucinate facts and be a huge download). So this uses a **curated offline
bank + a randomized board generator** instead: reliable, instant, free, and it
works with no internet and no API keys. If you ever want live arbitrary-genre
generation, that can be added later via an optional (free) LLM API key.
