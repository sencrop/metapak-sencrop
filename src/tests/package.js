'use strict';

module.exports = packageConf => {
  // Let's add test scripts
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.test = 'jest';
  packageConf.scripts.cover = 'jest --coverage';
  packageConf.scripts.preversion = packageConf.scripts.preversion
    ? packageConf.scripts.preversion +
      (/(^| && )npm t($| && )/.test(packageConf.scripts.preversion)
        ? ''
        : ' && npm t')
    : 'npm t';

  // Add the jest config
  packageConf.jest = {
    coverageReporters: ['lcov'],
    testEnvironment: 'node',
  };

  // Add the testing dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jest = '^23.6.0';
  packageConf.devDependencies.sinon = '^6.3.4';
  delete packageConf.devDependencies.istanbul;

  return packageConf;
};
