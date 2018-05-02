'use strict';

module.exports = packageConf => {
  // Let's add test scripts
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.test = 'jest --config=.jest.config.js';
  packageConf.scripts.cover = 'jest --config=.jest.config.js --coverage';
  packageConf.scripts.preversion = packageConf.scripts.preversion
    ? packageConf.scripts.preversion +
      (/(^| && )npm t($| && )/.test(packageConf.scripts.preversion)
        ? ''
        : ' && npm t')
    : 'npm t';

  // Add the testing dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jest = '^22.4.3';
  packageConf.devDependencies.sinon = '^5.0.3';
  delete packageConf.devDependencies.istanbul;

  return packageConf;
};
