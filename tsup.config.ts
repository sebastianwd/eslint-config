import { defineConfig } from "tsup";

export default defineConfig({
  bundle: true,
  entry: ["src/index.ts"],
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
});
