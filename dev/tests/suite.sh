#!/bin/bash
# Full regression suite. usage: dev/tests/suite.sh [repoDir]   (first run: cd dev/tests && npm install)
# 1) lint  2) data integrity  3) save/undo/rest state test  4) visit every screen in 4 zones x 3 builds
# (desktop + phone size)  5) seeded random-click "monkey" runs from a new game and from a late-game save.
# Any page error, console error or crash screen fails a run.
H=$(cd "$(dirname "$0")" && pwd); R=${1:-$(cd "$H/../.." && pwd)}
echo "== build"; node "$R/dev/build.js" --check || exit 1
echo "== lint"; "$H/lint.sh" "$R"
echo "== data"; node "$H/datacheck.js" --repo "$R" --no-dead | tail -3
echo "== state"; node "$H/statetest.js" "$R"
echo "== screens (desktop, phone)"
for MOB in "" mobile; do for z in 0 1 2 3; do for v in 0 1 2; do echo "$z $v"; done; done | xargs -P 3 -L 1 bash -c 'timeout 300 node "'"$H"'/tour.js" "'"$R"'" $0 $1 '"$MOB"' 2>&1 | grep -E "^OK|FAIL" | cut -c1-400'; done
echo "== monkey: new games (zones x classes)"
for z in 0 1 2 3; do for c in 0 1 2 3 4; do echo "$z $c"; done; done | xargs -P 3 -L 1 bash -c 'timeout 600 node "'"$H"'/monkey.js" "'"$R"'" 41 800 $0 $1 2>&1 | grep -E "^OK|seed|errs|PAGEERROR|CONSOLE" | cut -c1-400'
echo "== monkey: late-game saves"
for z in 0 1 2 3; do for c in 0 1 2; do echo "$z $c"; done; done | xargs -P 3 -L 1 bash -c 'RICH=1 timeout 900 node "'"$H"'/monkey.js" "'"$R"'" 31 300 $0 $1 2>&1 | grep -E "^OK|seed|errs|PAGEERROR|CONSOLE" | cut -c1-400'
