'use strict';

const { getMetapakConfig } = require('../utils');
const { ensureScript } = require('../utils');

module.exports = packageConf => {
  const { data } = getMetapakConfig(packageConf);

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.architecture =
    'jsarch ' + data.files + ' > ARCHITECTURE.md';

  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.jsarch = '^2.0.1';

  // Add husky hooks for arch
  packageConf.husky = packageConf.husky || {};
  packageConf.husky.hooks = packageConf.husky.hooks || {};
  packageConf.husky.hooks['pre-commit'] = ensureScript(
    packageConf.husky.hooks['pre-commit'],
    'npm run architecture && (git add ARCHITECTURE.md || exit 1)',
  );

  return packageConf;
};
