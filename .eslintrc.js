module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always']
  }
};
