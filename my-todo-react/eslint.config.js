import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,

  // solve import react
  pluginReact.configs.flat['jsx-runtime'],

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
    },
  },
];
