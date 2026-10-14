# Cindervale regression tests

Developer-only tooling — the game never loads anything in this folder.

Setup (once): `cd dev/tests && npm install` (Playwright's Chromium: `npx playwright install chromium` if none is preinstalled).
The same install provides Babel for the game build, `node dev/build.js` (game.jsx → game.js). The tests run
the built game.js, so build before testing; `suite.sh` stops first if game.js is stale.

| Command | What it checks |
|---|---|
| `node dev/build.js --check` | game.js and its `?v=` in index.html match the current game.jsx |
| `dev/tests/lint.sh` | ESLint on the app source, game.jsx (undefined names, duplicate keys, hook order), reads of variables before their declaration (Babel makes these silent `undefined`), escape sequences JSX would print literally |
| `node dev/tests/datacheck.js` | game-data.js integrity: every id referenced resolves, every ingredient a recipe needs is obtainable, images exist, threat/clinic/quest shapes are right |
| `node dev/tests/statetest.js` | save → load round trip, Rest advances the day and pays shelf sales, Undo restores the full state, Title → Continue loads the latest autosave |
| `node dev/tests/tour.js . <zone 0-3> <build 0-2> [mobile]` | loads a late-game save and opens every screen and collapsible section; also flags a stray `0` rendered by a `{count&&…}` slip |
| `node dev/tests/monkey.js . <seed> <clicks> <zone> <class>` | seeded random clicking from a new game (`RICH=1` to start from a late-game save) |
| `dev/tests/suite.sh` | all of the above (≈25 min) |

The harness serves the repo at `http://game.test/`, serves React/Babel/Tone from `node_modules` and stubs
Firebase, so it runs offline and never touches real cloud saves. Any page error, console error or the
"Cindervale crashed" screen fails a run.
