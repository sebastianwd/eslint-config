import { defineConfig } from 'eslint/config'

import { base } from './src/flat-base'

const config = defineConfig(...base, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
  },
})

export default config
