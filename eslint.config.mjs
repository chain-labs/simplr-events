import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "check-file": checkFile,
    },

    rules: {
      "no-unused-vars": ["warn"],
      "@typescript-eslint/no-unused-vars": "warn",

      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: true,
        },
      ],

      "prefer-template": "error",
      semi: ["error"],
      quotes: ["error", "double"],
    },
  },
];
