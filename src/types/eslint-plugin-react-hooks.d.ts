declare module "eslint-plugin-react-hooks" {
  export const configs: {
    recommended: {
      rules: {
        "rules-of-hooks": import("eslint").Linter.RuleEntry;
        "exhaustive-deps": import("eslint").Linter.RuleEntry;
      };
    };
  };
  export const rules: Record<string, import("eslint").Rule.RuleModule>;
}
