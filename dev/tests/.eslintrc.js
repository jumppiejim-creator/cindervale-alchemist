// Lint config for the extracted app script. Focus: real bugs (undefined names, duplicate keys/props,
// hook-order violations) and unused variables — not style.
const g = require('./globals.json'); const globals = {}; for (const k of Object.keys(g)) globals[k] = 'writable';
Object.assign(globals, { React: 'readonly', ReactDOM: 'readonly', firebase: 'readonly' });
module.exports = { root: true, env: { browser: true, es2022: true }, parserOptions: { ecmaVersion: 2022, sourceType: 'script', ecmaFeatures: { jsx: true } },
  plugins: ['react', 'react-hooks'], settings: { react: { version: '18.2' } }, globals,
  rules: { 'no-undef': 'error', 'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: true }], 'no-dupe-keys': 'error', 'no-unreachable': 'warn', 'no-dupe-else-if': 'warn', 'no-duplicate-case': 'error', 'no-self-assign': 'error', 'no-redeclare': 'error', 'no-func-assign': 'error', 'no-const-assign': 'error', 'use-isnan': 'error', 'valid-typeof': 'error',
    'react/jsx-no-undef': 'error', 'react/jsx-uses-vars': 'error', 'react/jsx-uses-react': 'error', 'react/jsx-no-duplicate-props': 'error', 'react-hooks/rules-of-hooks': 'error' } };
