// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").FlatConfig[]} */
export default [
  // 1) Reglas JS recomendadas
  js.configs.recommended,

  // 2) Ignorar carpeta de build
  { ignores: ["dist/**"] },

  // 3) Archivos .ts puros
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.jest.json"],
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        // Jest globals
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // 4) Archivos TSX y JSX (React + Hooks)
  {
    files: ["**/*.tsx", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: ["./tsconfig.json", "./tsconfig.jest.json"],
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        // Jest globals
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Reglas TS
      ...tsPlugin.configs.recommended.rules,

      // Reglas React / JSX
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // No hace falta importar React en scope con el nuevo JSX runtime
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
