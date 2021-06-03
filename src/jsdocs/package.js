'use strict';

const { getMetapakConfig } = require('../utils');
const { ensureScript } = require('../utils');

module.exports = (packageConf) => {
  const { data } = getMetapakConfig(packageConf);

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.doc =
    ' echo "# API" > API.md;' + ' jsdoc2md ' + data.files + ' >> API.md';

  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies['jsdoc-to-markdown'] = '^5.0.0';

  // Add pre-commit-lint
  packageConf.scripts['pre-commit-lint'] = ensureScript(
    packageConf.scripts['pre-commit-lint'],
    'npm run doc && git add API.md',
  );

  return packageConf;
};
