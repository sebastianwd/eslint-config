import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'
import eslintPluginAstro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact, { type ReactFlatConfig } from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'
import tseslint, { type ConfigArray } from 'typescript-eslint'

import { findTailwindImportCss } from './utils/find-tailwind-config'

const compat = new FlatCompat()

export interface ReactPluginOptions {
  framework?: 'next' | 'expo' | 'astro'
  tailwind?:
    | {
        ignoredKeys?: string[]
      }
    | false
}

const eslintNext = () => compat.config(nextPlugin.configs['core-web-vitals'])
const eslintExpo = () => compat.extends('eslint-config-expo')
const eslintAstro = eslintPluginAstro.configs.recommended

const eslintTailwind = pluginTailwindcss.configs['flat/recommended']

export const react = (options?: ReactPluginOptions): ConfigArray =>
  tseslint.config(
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      extends: [
        pluginReact.configs.flat.recommended!,
        pluginReact.configs.flat['jsx-runtime'] as ReactFlatConfig,
        ...compat.config(reactHooks.configs.recommended),
        ...(options?.framework === 'expo' ? eslintExpo() : []),
        ...(options?.framework === 'next' ? eslintNext() : []),
        ...(options?.framework === 'astro' ? eslintAstro : []),
        ...(options?.tailwind === false ? [] : eslintTailwind),
      ],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          project: ['./tsconfig.json'],
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
        ...(options?.tailwind === false
          ? {}
          : {
              tailwindcss: {
                config: findTailwindImportCss(process.cwd()),
              },
            }),
      },
      rules: {
        'react/prop-types': 'off',
        'react/display-name': 'warn',
        'react/button-has-type': 'warn',
        ...(options?.framework === 'next'
          ? {
              '@next/next/no-img-element': 'off',
            }
          : {}),
        ...(options?.tailwind === false
          ? {}
          : {
              'tailwindcss/no-custom-classname': [
                'warn',
                {
                  callees: ['classnames', 'clsx', 'cva', 'twMerge', 'cn'],
                  ignoredKeys: [
                    'color',
                    'variant',
                    'size',
                    'defaultVariants',
                  ].concat(options?.tailwind?.ignoredKeys ?? []),
                },
              ],
            }),
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
