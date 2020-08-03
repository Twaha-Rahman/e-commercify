module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'preact'],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    /*
     * Possible Errors
     * http://eslint.org/docs/rules/#possible-errors
     * ---------------------------------------------
     */

    'no-loss-of-precision': 'error',
    'no-return-assign': 'error',

    /*
     * Best Practices
     * http://eslint.org/docs/rules/#best-practices
     * --------------------------------------------
     */

    'consistent-return': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'guard-for-in': 'error',
    'no-constructor-return': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'off',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-throw-literal': 'error',
    'prefer-promise-reject-errors': 'error',
    radix: 'error',
    'require-atomic-updates': 'error',
    'require-await': 'error',

    /*
     * Strict Mode
     * http://eslint.org/docs/rules/#strict-mode
     * --------------------------------------------
     */

    strict: 'error',

    /*
     * Stylistic Issues
     * http://eslint.org/docs/rules/#stylistic-issues
     * ----------------------------------------------
     */

    camelcase: 'error',
    'linebreak-style': ['error', 'unix'],
    // This rule is enabled just to check for long comments,
    // since Prettier cannot yet split comments which are too long.
    // https://github.com/prettier/eslint-config-prettier#max-len
    'max-len': ['error', { comments: 80, ignoreUrls: true }],
    'new-cap': 'error',
    'no-lonely-if': 'error',
    'no-multi-assign': 'error',
    'no-restricted-syntax': ['error', 'SequenceExpression'],
    'nonblock-statement-body-position': 'error',
    'prefer-exponentiation-operator': 'error',
    semi: ['error', 'always'],
    'sort-vars': 'error',
    'spaced-comment': 'error',

    /*
     * EcmaScript 6
     * https://eslint.org/docs/rules/#ecmascript-6
     * -------------------------------------------
     */

    // Do not enable this rule for now.
    // https://github.com/prettier/eslint-config-prettier#arrow-body-style-and-prefer-arrow-callback
    'arrow-body-style': 'off',

    // This rule can be safely used with Prettier if 'allowParens' is false.
    // https://github.com/prettier/eslint-config-prettier#no-confusing-arrow
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-var': 'error',
    'object-shorthand': 'error',

    // Do not enable this rule for now.
    // https://github.com/prettier/eslint-config-prettier#arrow-body-style-and-prefer-arrow-callback
    'prefer-arrow-callback': 'off',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error'
  }
};
