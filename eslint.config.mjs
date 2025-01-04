import { fixupConfigRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [".expo", "**/node_modules", "**/expo-env.d.ts"],
  },
  ...fixupConfigRules(
    compat.extends(
      "expo",
      "prettier",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
    ),
  ),
  {
    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "error",
      semi: ["error", "always"],

      "no-console": [
        "warn",
        {
          allow: ["info", "error"],
        },
      ],

      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
