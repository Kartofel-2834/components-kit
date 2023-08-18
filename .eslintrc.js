module.exports = {
  root: true,

  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },

  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
  ],
};
