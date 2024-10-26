# swd-eslint-config

This is a custom eslint config for my projects. It uses the latest flat config version of eslint.

- Usage:

  - Install: `pnpm add -D swd-eslint-config`
  - In your `eslint.config.mjs`:

    ```ts
    import swdEslintPlugin from "swd-eslint-config";
    import tseslint from "typescript-eslint";

    export default tseslint.config(
      ...swdEslintPlugin.configs.base,
      // if using React:
      ...swdEslintPlugin.configs.react
    );

    // or the flat config with classic syntax:
    export default tseslint.config({
      extends: [
        ...swdEslintPlugin.configs.base,
        // if using React:
        ...swdEslintPlugin.configs.react,
      ],
    });
    ```

- Plugins included:
  - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
  - [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
  - [eslint-plugin-tailwindcss](https://github.com/tailwindlabs/eslint-plugin-tailwindcss)
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
  - [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
  - [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
  - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)
