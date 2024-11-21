declare module '@next/eslint-plugin-next' {
  export const configs: {
    recommended: { rules: import('eslint').Linter.RulesRecord }
    'core-web-vitals': { rules: import('eslint').Linter.RulesRecord }
  }
  export const rules: Record<string, import('eslint').Rule.RuleModule>
}
