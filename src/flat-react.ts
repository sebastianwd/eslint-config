import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { type Linter } from 'eslint'
import { defineConfig } from 'eslint/config'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact, { type ReactFlatConfig } from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat()

export interface ReactPluginOptions {
  framework?: 'next' | 'expo' | 'astro'
  tanstack?: boolean
}

const eslintNext = () => compat.config(nextPlugin.configs['core-web-vitals'])
const eslintExpo = () => compat.extends('eslint-config-expo')
const eslintAstro = eslintPluginAstro.configs.recommended

export const react = (options: ReactPluginOptions = {}): Linter.Config[] => {
  const { framework, tanstack = true } = options

  return defineConfig(
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      extends: [
        pluginReact.configs.flat.recommended!,
        pluginReact.configs.flat['jsx-runtime'] as ReactFlatConfig,
        ...compat.config(reactHooks.configs.recommended),
        ...(tanstack ? pluginQuery.configs['flat/recommended'] : []),
        ...(framework === 'expo' ? eslintExpo() : []),
        ...(framework === 'next' ? eslintNext() : []),
        ...(framework === 'astro' ? eslintAstro : []),
      ],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        'better-tailwindcss': eslintPluginBetterTailwindcss,
      },
      settings: {
        react: {
          version: 'detect',
        },
        'better-tailwindcss': {
          entryPoint: './src/global.css',
        },
      },
      rules: {
        ...eslintPluginBetterTailwindcss.configs['recommended-warn']?.rules,
        'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
        'react/jsx-curly-brace-presence': [
          'error',
          { props: 'never', children: 'never' },
        ],
        'react/prop-types': 'off',
        'react/display-name': 'warn',
        'react/button-has-type': 'warn',
        ...(framework === 'next'
          ? {
              '@next/next/no-img-element': 'off',
            }
          : {}),
      },
    },
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      ignores: [
        '**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)',
        '**/*.test.@(ts|tsx|js|jsx|mjs|cjs)',
        '**/*.spec.@(ts|tsx|js|jsx|mjs|cjs)',
      ],
      extends: [jsxA11y.flatConfigs.recommended],
    }
  )
}
