import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import { FlatCompat } from "@eslint/eslintrc";
// @ts-expect-error - No types
import reactHooks from "eslint-plugin-react-hooks";

const compat = new FlatCompat();

export const react = tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    extends: [
      // @ts-expect-error - Types are broken in eslint-plugin-react https://github.com/jsx-eslint/eslint-plugin-react/issues/3838
      pluginReact.configs.flat.recommended,
      // @ts-expect-error - See above
      pluginReact.configs.flat["jsx-runtime"],
      ...compat.config(reactHooks.configs.recommended),
      ...pluginTailwindcss.configs["flat/recommended"],
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
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
      "react/display-name": "warn",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      "**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
      "**/*.test.@(ts|tsx|js|jsx|mjs|cjs)",
      "**/*.spec.@(ts|tsx|js|jsx|mjs|cjs)",
    ],
    extends: [jsxA11y.flatConfigs.recommended],
  }
) satisfies FlatConfig.ConfigArray;
