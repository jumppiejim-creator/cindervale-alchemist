#!/bin/bash
# Static checks on the app source (game.jsx): ESLint (undefined names, dupes, hooks), use-before-declare
# reads (Babel turns those into silent `undefined`), and escape sequences that JSX would print literally.
# usage: dev/tests/lint.sh [repoDir]
H=$(cd "$(dirname "$0")" && pwd); R=${1:-$(cd "$H/../.." && pwd)}
TMP=$(mktemp -d)
node "$H/globals.js" "$R" && node "$H/extract.js" "$R" "$TMP/app.jsx"
(cd "$H" && npx eslint --no-eslintrc -c .eslintrc.js "$TMP/app.jsx" -f unix) | sed "s#$TMP/app.jsx#game.jsx#" | grep -v "^$"
node "$H/tdz.js" "$TMP/app.jsx"; echo "JSX escapes: $(node "$H/jsxesc.js" "$TMP/app.jsx")"
rm -rf "$TMP"
