import tseslint, { type ConfigArray } from 'typescript-eslint'

import { base } from './src/flat-base'

const config: ConfigArray = tseslint.config(...base, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
  },
})

export default config
