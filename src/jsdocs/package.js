'use strict';

module.exports = packageConf => {
  const metapakData =
    packageConf.metapak && packageConf.metapak.data
      ? packageConf.metapak.data
      : {};

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.doc =
    'mkdir -p .readme;' +
    ' echo "# API" > API.md;' +
    ' jsdoc2md ' +
    metapakData.files +
    ' >> API.md';

  // Ignore the API.md file
  metapakData.ignore = [...new Set([...(metapakData.ignore || []), 'API.md'])];

  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies['jsdoc-to-markdown'] = '^4.0.1';

  return packageConf;
};
