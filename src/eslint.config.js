import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.vue', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: { vue },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'warn',
      'vue/no-v-html': 'off',
    },
  },
]
