const globals = require("globals");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");

module.exports = tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", ".idx/**"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  }
);
