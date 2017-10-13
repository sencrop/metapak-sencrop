'use strict';

module.exports = (packageConf) => {
  const metapakData = packageConf.metapak && packageConf.metapak.data ?
    packageConf.metapak.data :
    {};
  // Let's add my handy scripts
  packageConf.scripts = packageConf.scripts || {};
  packageConf.scripts.lint = `eslint ${metapakData.files}`;

  // Add the MUST HAVE dependencies:
  packageConf.dependencies = packageConf.dependencies || {};

  // Add the MUST HAVE dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.eslint = '3.16.0';
  packageConf.devDependencies['eslint-config-simplifield'] = '4.1.1';

  return packageConf;
};
