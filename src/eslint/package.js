'use strict';

module.exports = packageConf => {
  const metapakData =
    packageConf.metapak && packageConf.metapak.data
      ? packageConf.metapak.data
      : {};

  if (!metapakData.files) {
    throw new Error('E_NO_FILES');
  }

  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.lint = 'eslint ' + metapakData.files;
  packageConf.scripts.prettier = 'prettier --write ' + metapakData.files;

  // Add the MUST HAVE dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.eslint = '^5.6.0';
  packageConf.devDependencies.prettier = '^1.14.3';
  packageConf.devDependencies['eslint-plugin-prettier'] = '^2.6.2';
  packageConf.devDependencies['eslint-plugin-import'] = '^2.6.2';

  // Add eslint config
  packageConf.eslintConfig = {
    extends: 'eslint:recommended',
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
    plugins: ['prettier', 'import'],
    rules: {
      'prettier/prettier': 'error',
    },
  };

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
