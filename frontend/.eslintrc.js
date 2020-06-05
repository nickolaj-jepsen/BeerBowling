module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    jquery: true,
    es6: true,
    commonjs: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import", "react-hooks", "simple-import-sort", "jest", "unicorn", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    "no-console": [2, { allow: ["error"] }],

    eqeqeq: 2,
    "default-param-last": 2,
    "no-caller": 2,
    "no-constructor-return": 2,
    "no-div-regex": 2,
    "no-eval": 2,
    "no-extra-bind": 2,
    "no-iterator": 2,
    "no-labels": 2,
    "no-lone-blocks": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-param-reassign": 1,
    "no-proto": 2,
    "no-return-await": 2,
    "no-return-assign": 2,
    "no-script-url": 2,
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-throw-literal": 2,
    "no-useless-call": 2,
    "no-useless-catch": 2,
    "no-useless-concat": 2,
    "no-useless-escape": 2,
    "no-useless-return": 2,
    "no-with": 2,
    radix: 2,
    "prefer-promise-reject-errors": 2,
    "require-await": 2,
    yoda: 2,
    "no-shadow-restricted-names": 2,
    "no-bitwise": 2,
    "no-unneeded-ternary": 2,
    "prefer-exponentiation-operator": 2,
    "prefer-object-spread": 2,
    "sort-vars": 2,
    "no-useless-constructor": 0, // Doesn't work with typescript constructors
    "prefer-numeric-literals": 2,
    "prefer-template": 2,

    "prettier/prettier": 2,

    "import/no-duplicates": 2,
    "import/no-named-as-default": 0,

    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/display-name": 0,
    "react/prop-types": 0, // Not need when using typescript

    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/indent": 0, // Use prettier to manage indentation
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-use-before-define": 2,
    "@typescript-eslint/no-non-null-assertion": 2,
    "@typescript-eslint/prefer-optional-chain": 2,

    "react-hooks/rules-of-hooks": 2,

    "simple-import-sort/sort": 2,

    "unicorn/new-for-builtins": 2,
    "unicorn/throw-new-error": 2,
    "unicorn/explicit-length-check": 2,
    "unicorn/prefer-node-remove": 2,
    "unicorn/prefer-add-event-listener": 2,
    "unicorn/no-zero-fractions": 2,
    "unicorn/prefer-query-selector": 2,
    "unicorn/prefer-node-append": 0,
    "unicorn/prefer-spread": 2,
    "unicorn/catch-error-name": 2,
    "unicorn/no-for-loop": 2,
    "unicorn/prefer-includes": 2,
    "unicorn/prefer-event-key": 2,
    "unicorn/import-index": 2,
    "unicorn/prefer-flat-map": 2,
    "unicorn/prefer-string-slice": 2,
    "unicorn/prefer-text-content": 2,
    "unicorn/no-useless-undefined": 0,

    "unicorn/filename-case": 0,
    "unicorn/consistent-function-scoping": 0, // Does not work well with hooks
    "unicorn/no-abusive-eslint-disable": 0, // Should probably be enabled, but we have some legacy where eslint-disable helps
    "unicorn/prevent-abbreviations": 0,
    "unicorn/no-nested-ternary": 0,
    "unicorn/regex-shorthand": 0,
    "unicorn/prefer-modern-dom-apis": 0,

    /*

    POTENTIAL NEW RULES

    @typescript-eslint/explicit-function-return-type
    ------------------------------------------------
    Enable to validate return type with what's expected, could be enabled with the option { allowExpressions: true } to
    only valid non-anon functions
    ~800 errors (~400 with allowExpressions)

     */
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      env: {
        jest: true,
        node: true,
        browser: true,
      },
    },
    {
      // Config files
      files: ["**/gulp-tasks/**", "webpack.config.js", "webpack.config.prod.js", "gulpfile.js"],
      env: {
        node: true,
        browser: true,
      },
      rules: {
        "unicorn/no-process-exit": 0,
        "@typescript-eslint/no-var-requires": 0, // dont use import in vanilla js files
      },
    },
  ],
};