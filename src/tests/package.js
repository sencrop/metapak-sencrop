'use strict';

const { ensureScript } = require('../utils');
const { getMetapakConfig } = require('../utils');

const TEST_SCRIPT = 'npm t';
const JEST_SCRIPT = 'npm run jest';

module.exports = packageConf => {
  const { data } = getMetapakConfig(packageConf);

  // Let's add test scripts
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.jest = 'NODE_ENV=${NODE_ENV:-test} jest';
  packageConf.scripts.cover = 'NODE_ENV=${NODE_ENV:-test} jest --coverage';
  packageConf.scripts.test = ensureScript(
    packageConf.scripts.test,
    JEST_SCRIPT,
  );
  packageConf.scripts.preversion = ensureScript(
    packageConf.scripts.preversion,
    TEST_SCRIPT,
  );

  packageConf.husky = packageConf.husky || {};
  packageConf.husky.hooks = packageConf.husky.hooks || {};
  packageConf.husky.hooks['pre-commit'] = ensureScript(
    packageConf.husky.hooks['pre-commit'],
    TEST_SCRIPT,
  );

  // Add the jest config
  packageConf.jest = {
    coverageReporters: ['lcov'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    roots: data.jestRoots || ['<rootDir>/src'],
  };

  // Add the testing dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jest = '^23.6.0';
  delete packageConf.devDependencies.sinon;
  delete packageConf.devDependencies.istanbul;

  return packageConf;
};
