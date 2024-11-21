import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint'
import pluginReact from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'
import { FlatCompat } from '@eslint/eslintrc'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginAstro from 'eslint-plugin-astro'

const compat = new FlatCompat()

export interface ReactPluginOptions {
  framework?: 'next' | 'expo' | 'astro'
}

const eslintNext = compat.config(nextPlugin.configs['core-web-vitals'])
const eslintExpo = compat.extends('eslint-config-expo')
const eslintAstro = eslintPluginAstro.configs.recommended

const eslintTailwind = pluginTailwindcss.configs['flat/recommended']

export const react = ({ framework }: ReactPluginOptions) =>
  tseslint.config(
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      extends: [
        // @ts-expect-error - Types are broken in eslint-plugin-react https://github.com/jsx-eslint/eslint-plugin-react/issues/3838
        pluginReact.configs.flat.recommended,
        // @ts-expect-error - See above
        pluginReact.configs.flat['jsx-runtime'],
        ...compat.config(reactHooks.configs.recommended),
        ...(framework === 'expo' ? eslintExpo : eslintTailwind),
        ...(framework === 'next' ? eslintNext : []),
        ...(framework === 'astro' ? eslintAstro : []),
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/prop-types': 'off',
        'react/display-name': 'warn',
        'react/button-has-type': 'warn',
        'tailwindcss/no-custom-classname': [
          'warn',
          {
            callees: ['classnames', 'clsx', 'cva', 'twMerge', 'cn'],
            ignoredKeys: ['color', 'variant', 'size', 'defaultVariants'],
          },
        ],
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
  ) satisfies FlatConfig.ConfigArray
