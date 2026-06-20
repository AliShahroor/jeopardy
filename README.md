# Jeopardy! Game

A polished, fully client-side Jeopardy party game. No backend, no build step,
no cost — open `index.html` in any browser, or host it free (see `../DEPLOY.md`).

## Features

- **Login** with a name (saved locally, with quick-login for returning players).
- **Topic Mode** — pick 6 from **26 genres** (Science, History, Geography,
  Video Games, Anime & Manga, Football, Superheroes, Mythology, Chemistry,
  Flags of the World, and more). A fresh, randomized board is built every game.
  - **🎲 Surprise Me** auto-picks 6 random categories.
- **Custom Mode** — write your own categories, questions, and answers.
- **Question types:**
  - **Text** — classic trivia clues.
  - **Image** — e.g. *"Which country does this flag belong to?"* (flag emoji
    render as real flags on most devices).
  - **Interactive challenges** — rapid-fire rounds like *"Name 30 European
    countries in 60 seconds"*.
- **Adjustable timer** per question (30s → 2 min), changeable per game.
- **2–4 players**, scoreboard, turn tracking, correct/wrong judging.
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
