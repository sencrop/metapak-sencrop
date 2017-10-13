'use strict';

const config = require('../config.js');

const GITHUB_REPOSITORY_REGEXP =
  /git\+https:\/\/github.com\/([a-zA-Z0-9\-]+)\/([a-zA-Z0-9\-]+)\.git/;

module.exports = (packageConf) => {
  const metapakData = packageConf.metapak && packageConf.metapak.data ?
    packageConf.metapak.data :
    {};

  packageConf.license = 'SEE LICENSE IN LICENSE.md';

  // Let's always start with the 0.0.0 version
  packageConf.version = packageConf.version || '0.0.0';

  // Supporting Node LTS version only
  packageConf.engines = { node: '>=' + config.lastNodeLTS };

  // Let's add my handy scripts
  packageConf.scripts = packageConf.scripts || {};

  // I like this, it enable me to run arbitrary npm binary
  // without having global modules
  packageConf.scripts.cli = 'env NODE_ENV=${NODE_ENV:-cli}';

  // Lets use commitizen
  packageConf.scripts.cz = 'env NODE_ENV=${NODE_ENV:-cli} git cz';
  packageConf.config = {
    commitizen: {
      path: './node_modules/cz-conventional-changelog',
    },
  };

  // Add the changelog stuffs
  packageConf.scripts.changelog = 'conventional-changelog -p angular -i CHANGELOG.md -s';
  packageConf.scripts.version = 'npm run changelog && git add CHANGELOG.md';
  packageConf.scripts.lint = 'echo "WARNING: No linter configured"';
  packageConf.scripts.preversion = (
      packageConf.scripts.preversion ?
      packageConf.scripts.preversion +
      (
        /(^| && )npm run lint($| && )/
        .test(packageConf.scripts.preversion) ?
        '' :
        ' && npm run lint'
      ) :
      'npm run lint'
    );
  // Add the MUST HAVE dependencies:
  packageConf.dependencies = packageConf.dependencies || {};

  // Add the MUST HAVE dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.commitizen = '^2.9.6';
  packageConf.devDependencies['cz-conventional-changelog'] = '^2.0.0';
  packageConf.devDependencies['conventional-changelog-cli'] = '^1.2.0';

  // This job is already done by NPM, but once,.
  // This allows to do it on old repositories
  if(packageConf.repository && 'git' === packageConf.repository.type) {
    const [, userName, repositoryName] = GITHUB_REPOSITORY_REGEXP.exec(
      packageConf.repository.url
    ) || [];
    if(userName && repositoryName) {
      packageConf.bugs = packageConf.bugs || {
        url: 'https://github.com/' + userName + '/' + repositoryName + '/issues',
      };
      packageConf.homepage = packageConf.homepage ||
      'https://github.com/' + userName + '/' + repositoryName + '#readme';
    }
  }

  return packageConf;
};
