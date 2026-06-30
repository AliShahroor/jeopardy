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
  tap whoever answers correctly to give them the points. Wrong answers never
  deduct points.
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
  - *👥 Family Feud* — reveal the survey answers and tap who called each; **ranked
    scoring**, so the #1 answer is worth **$700** down to **$100** for the last.
    Typed guesses accept close spelling and natural phrasing variants such as
    "washroom" for "bathroom" or "garbage" for "trash".
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
| `IMAGE_CREDITS.md` | Source and license notes for externally hosted image questions. |

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

### Adding image and audio-style questions

Image questions can point at remote, freely licensed image URLs:

```js
{
  q: "What famous Paris landmark is shown in this image?",
  a: "The Eiffel Tower",
  points: 200,
  type: "image",
  image: "https://commons.wikimedia.org/wiki/Special:FilePath/Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg?width=900",
  imageAlt: "Photo of the Eiffel Tower in Paris",
  accept: ["Eiffel Tower"]
}
```

Prefer Wikimedia Commons, public-domain, CC0, CC BY, or CC BY-SA images, and
record the source in `IMAGE_CREDITS.md`. Avoid unclear licenses and
NonCommercial-only media for the public hosted site.

Current real-photo examples live in the `Famous Landmarks` category and are
mixed into the normal randomized board pool:

- `$200`: Eiffel Tower photo → identify the landmark.
- `$400`: Giza pyramids photo → name the nearby city.
- `$600`: Colosseum photo → name the city.
- `$800`: Taj Mahal photo → name the Indian city.
- `$1000`: Petra treasury photo → name the ancient city.

For audio, use a future `assets/audio/` folder and keep clips copyright-safe
before adding an `audio` question type. Public-domain recordings, self-made
clips, or licensed/generated snippets are safest for a public site.

## Content QA checklist

Before adding or merging a new question batch:

- Cross-check roles and labels in the clue, especially sports positions,
  nationalities, dates, titles, and "first/most/only" claims.
- Add `accept` aliases for common alternate spellings, surnames, abbreviations,
  and harmless wording variants.
- For Family Feud answers, add natural synonym variants in `app.js` →
  `FEUD_ACCEPT` when the survey wording is strict but players may say the same
  idea differently.
- Avoid ambiguous answers unless the clue explicitly says "name one" or lists
  all acceptable answers.
- Run `node --check` on each edited JavaScript file after data edits to catch
  syntax errors before pushing.

## Note on "AI generates any genre"

A truly tiny model bundled in the page can't produce accurate trivia (it would
hallucinate facts and be a huge download). So this uses a **curated offline
bank + a randomized board generator** instead: reliable, instant, free, and it
works with no internet and no API keys. If you ever want live arbitrary-genre
generation, that can be added later via an optional (free) LLM API key.
