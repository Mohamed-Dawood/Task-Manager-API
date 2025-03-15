import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    languageOptions: { globals: globals.browser, process: 'readonly' },
    env: {
      node: true, // ✅ Enables Node.js global variables like `process`
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
