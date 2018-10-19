'use strict';

const { getMetapakConfig } = require('../utils');

module.exports = packageConf => {
  const { data } = getMetapakConfig(packageConf);

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.doc =
    ' echo "# API" > API.md;' + ' jsdoc2md ' + data.files + ' >> API.md';

  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies['jsdoc-to-markdown'] = '^4.0.1';

  return packageConf;
};
