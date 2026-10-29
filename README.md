# Secure Family

A simple, friendly cybersecurity check-up for people who are not technical: parents, aunts, uncles, grandparents.

People answer 10 yes/no questions, get a traffic-light result, and receive a personal checklist with step-by-step guides for iPhone, Android and common services. Everything is in plain English and Spanish.

## Privacy by design

There is no backend, no account and no analytics. Answers and checklist progress are saved only in the visitor's browser (`localStorage`). Fonts are self-hosted, so the site makes no third-party requests.

## Run it locally

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

Other scripts:

| Command | What it does |
| --- | --- |
| `npm test` | Runs the tests (Node's built-in test runner, no extra installs) |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves the built site locally |

## Editing the content

All text lives in `src/content/`, separate from the code:

- `questions.js`: the check-up questions. Each one points to the checklist item it checks and says which answer means "already protected".
- `checklist.js`: the safety steps, their priority section, time estimate, tips and step-by-step guides.
- `ui.js`: buttons, labels and other interface text.

Every text has an `en` and an `es` version. `npm test` checks that both languages are complete, that guides have the same number of steps in each language, and that every question points to a real checklist item.

## How it works

- `src/main.js`: hash-based routing (`#/`, `#/checkup/1`, `#/result`, `#/checklist`), state and click handling.
- `src/views/`: one function per screen that returns HTML. All text is escaped before it reaches the page.
- `src/lib/scoring.js`: pure functions for the score, traffic light and progress.
- `src/lib/storage.js`: reads and writes `localStorage`, validating saved data and never failing when storage is blocked.

Traffic light: 8 or more safe answers is green, 5 to 7 is amber, fewer than 5 is red. "I don't know" counts as not protected yet.

## Deploy

It is a static site. On Vercel, import the repository and keep the defaults for Vite (build command `npm run build`, output folder `dist`). Every pull request then gets its own preview link.

## Roadmap

- "Spot the scam" practice game with realistic fake messages
- Screenshots in the guides
- Optional privacy-friendly visit counts (Plausible or Umami)
