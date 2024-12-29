module.exports = {
  extends: [
    "expo",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    semi: ["error", "always"],
    "no-console": ["warn", { allow: ["info", "error"] }],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/ban-ts-comment": "off", // I know what I'm doing
    "@typescript-eslint/no-require-imports": "off", // I never use require unless it's in a config file
    "react-hooks/exhaustive-deps": "off",
  },
};
