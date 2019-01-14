'use strict';

const { getMetapakConfig } = require('../utils');

module.exports = packageConf => {
  const { data } = getMetapakConfig(packageConf);

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.architecture =
    'jsarch ' + data.files + ' > ARCHITECTURE.md';
  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jsarch = '^2.0.1';

  return packageConf;
};
