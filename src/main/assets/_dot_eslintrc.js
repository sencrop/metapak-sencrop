'use strict';

module.exports = {
  extends: 'eslint-config-simplifield/lib/backend',
  parserOptions: {
    sourceType: 'script',
    modules: true,
  },
  globals: {
    expect: true,
  },
  rules: {
    'no-magic-numbers': 0,
  },
};
