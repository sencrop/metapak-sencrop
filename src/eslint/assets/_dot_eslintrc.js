module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    mocha: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
