import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  },

  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript source files
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),

  // Server-side Node files
  {
    files: [
      "server/src/**/*.{ts,js}",
      "server/scripts/**/*.{ts,js}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // CommonJS tooling/config/migrations
  {
    files: [
      "server/**/*.cjs",
      "**/*.cjs",
    ],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Browser/client files
  {
    files: [
      "client/**/*.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];