'use strict';

const { getMetapakConfig } = require('../utils');
const { ensureScript } = require('../utils');

module.exports = (packageConf) => {
  const { data } = getMetapakConfig(packageConf);

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.architecture =
    'jsarch ' + data.files + ' > ARCHITECTURE.md';

  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jsarch = '^3.0.0';

  // Add pre-commit-lint
  packageConf.scripts['pre-commit-lint'] = ensureScript(
    packageConf.scripts['pre-commit-lint'],
    'npm run architecture && (git add ARCHITECTURE.md || exit 1)',
  );

  return packageConf;
};
