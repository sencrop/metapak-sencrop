'use strict';

const { getMetapakConfig, ensureScript } = require('../utils');
const YError = require('yerror');

const ESLINT_CONFIG = {
  backend: {
    version: '^6.3.0',
    config: {
      extends: ['eslint:recommended', 'plugin:jest/recommended'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 9,
      },
      env: {
        es6: true,
        node: true,
        jest: true,
        mocha: true,
      },
      plugins: ['prettier', 'import', 'jest'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  },
  'create-react-app': {
    version: '5.16.0',
    config: {
      extends: 'react-app',
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  },
};

module.exports = packageConf => {
  const { data } = getMetapakConfig(packageConf);

  if (!data.files) {
    throw new Error('E_NO_FILES');
  }

  if (!data.eslintConfigType) {
    throw new Error('E_NO_ESLINT_TYPE');
  }
  if (!Object.keys(ESLINT_CONFIG).includes(data.eslintConfigType)) {
    throw new YError('E_UNKNOWN_ESLINT_TYPE', data.eslintConfigType);
  }

  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.lint = 'eslint ' + data.files;
  packageConf.scripts.prettier = 'prettier --write ' + data.files;

  // Add the MUST HAVE dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};

  if (data.eslintConfigType !== 'create-react-app') {
    packageConf.devDependencies['eslint-plugin-import'] = '^2.18.2';
    packageConf.devDependencies['eslint-plugin-jest'] = '^22.17.0';
  }
  packageConf.devDependencies.prettier = '^1.18.2';
  packageConf.devDependencies['eslint-plugin-prettier'] = '^3.1.0';
  packageConf.devDependencies['lint-staged'] = '^9.2.5';

  // Add eslint config
  packageConf.devDependencies.eslint =
    ESLINT_CONFIG[data.eslintConfigType].version;
  packageConf.eslintConfig = ESLINT_CONFIG[data.eslintConfigType].config;

  // Add husky hooks for lint staged
  packageConf.husky = packageConf.husky || {};
  packageConf.husky.hooks = packageConf.husky.hooks || {};
  packageConf.husky.hooks['pre-commit'] = ensureScript(
    packageConf.husky.hooks['pre-commit'],
    'lint-staged',
  );

  // Add lint-staged config
  packageConf['lint-staged'] = packageConf['lint-staged'] || {};
  packageConf['lint-staged']['*.{js,jsx}'] = [
    'eslint',
    'jest --bail --findRelatedTests',
  ];

  // Add prettier config
  packageConf.prettier = {
    semi: true,
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'all',
    proseWrap: 'always',
  };

  return packageConf;
};
