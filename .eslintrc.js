module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    semi: ["error", "always"],
    "no-console": ["warn", { allow: ["info", "error"] }],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-unused-vars": "warn",
  },
};
