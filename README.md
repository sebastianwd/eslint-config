# swd-eslint-config

This is a custom eslint config for my projects. It uses the latest flat config version of eslint.

- Usage:

  - Install: `pnpm add -D eslint prettier typescript-eslint swd-eslint-config jiti`
  - In your `eslint.config.ts`:

    ```ts
    import swdEslintPlugin from 'swd-eslint-config'
    import tseslint from 'typescript-eslint'

    export default tseslint.config(
      ...swdEslintPlugin.configs.base,
      // if using React:
      ...swdEslintPlugin.configs.react(
        { framework: 'next' } // optional
      )
    )
    ```

    or the flat config with classic syntax:

    ```ts
    export default tseslint.config({
      extends: [
        ...swdEslintPlugin.configs.base,
        // if using React:
        ...swdEslintPlugin.configs.react(
          { framework: 'next' } // optional
        ),
      ],
    })
    ```

- Create a prettier config. Example:

  `prettier.config.mjs`

  ```js
  /** @type {import("prettier").Config} */
  export default {
    endOfLine: 'lf', // consistency between windows and linux
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    lineWidth: 120,
  }
  ```

### Troubleshooting

- If it doesn't work, try adding this to the `.npmrc` file:

  ```sh
  auto-install-peers = true
  public-hoist-pattern[]=*eslint*
  ```

- If using Expo, `eslint-config-expo` uses outdated versions, so you need to add the following to your `package.json`:

  ```json
    "pnpm": {
      "overrides": {
        "eslint-plugin-react-hooks": "^5.0.0"
      }
    }
  ```

### Plugins included:

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [@tanstack/eslint-plugin-query](https://github.com/TanStack/query/blob/main/docs/eslint/eslint-plugin-query.md)
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)

### Commands

- `pnpm build` - Builds the package
- `pnpm release` - Creates a new release, should be used before committing
- `pnpm release:publish` - Publishes the release, shouldn't be used manually
