module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    _: false,
    moment: false,
    $: false,
  },
  extends: [
    "eslint:recommended",
    "@vue/standard",
    "@vue/typescript",
    "plugin:vue/essential",
    "prettier",
    "prettier/flowtype",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  rules: {
    "semi": "error",
    "prettier/prettier": [
      "error", {
        endOfLine: 'auto',
        singleQuote: true,
        semi: false,
        useTabs: false,
        usePrettierrc: false,
        jsxBracketSameLine: true,
        trailingComma: 'none',
        tabWidth: 2,
        usePrettierrc: false,
        printWidth: 200,
        bracketSpacing: true,
        arrowParens: 'avoid'
      }
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": ["error", {
      "asyncArrow": "always",
      "anonymous": "never",
      "named": "never"
    }],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 200,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    "vue/array-bracket-spacing": "error",
    "vue/arrow-spacing": "error",
    "vue/block-spacing": "error",
    "vue/brace-style": "error",
    "vue/camelcase": "error",
    "vue/comma-dangle": "error",
    "vue/component-name-in-template-casing": "error",
    "vue/eqeqeq": "error",
    "vue/key-spacing": "error",
    "vue/match-component-file-name": "error",
    "vue/object-curly-spacing": ["error", "always"],
    "no-unreachable": "error"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
