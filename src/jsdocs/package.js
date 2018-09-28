'use strict';

module.exports = packageConf => {
  const metapakData =
    packageConf.metapak && packageConf.metapak.data
      ? packageConf.metapak.data
      : {};

  // Adding documentation generation script
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.doc =
    ' echo "# API" > API.md;' + ' jsdoc2md ' + metapakData.files + ' >> API.md';

  // Add doc deps
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies['jsdoc-to-markdown'] = '^4.0.1';

  return packageConf;
};
