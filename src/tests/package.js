'use strict';

module.exports = (packageConf) => {
  // Let's add test scripts
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.test = 'jest --config=.jest.config.js';
  packageConf.scripts.cover = 'jest --config=.jest.config.js --coverage';
  packageConf.scripts.preversion = (
    packageConf.scripts.preversion ?
    packageConf.scripts.preversion +
    (
      /(^| && )npm t($| && )/
      .test(packageConf.scripts.preversion) ?
      '' :
      ' && npm t'
    ) :
    'npm t'
  );

  // Add the testing dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jest = '20.0.4';
  packageConf.devDependencies.sinon = '2.3.8';
  packageConf.devDependencies.istanbul = '0.4.5';

  return packageConf;
};
