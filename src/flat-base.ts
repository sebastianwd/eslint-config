import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

export const base = tseslint.config({
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    pluginPrettierRecommended,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      extraFileExtensions: [".json", ".d.ts"],
    },
  },
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
  },
}) satisfies FlatConfig.ConfigArray;
