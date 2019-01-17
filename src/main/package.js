'use strict';

const config = require('../config.js');
const { ensureScript } = require('../utils');

const GITHUB_REPOSITORY_REGEXP = /git\+https:\/\/github.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)\.git/;
const LINT_SCRIPT = 'npm run lint';
const METAPAK_CHECK_SCRIPT = 'npm run metapak -- -s';

module.exports = packageConf => {
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
  packageConf.scripts.precz = ensureScript(
    packageConf.scripts.precz,
    LINT_SCRIPT,
  );
  packageConf.scripts.precz = ensureScript(
    packageConf.scripts.precz,
    METAPAK_CHECK_SCRIPT,
  );
  packageConf.scripts.cz = 'env NODE_ENV=${NODE_ENV:-cli} git cz';
  packageConf.config = {
    commitizen: {
      path: './node_modules/cz-conventional-changelog',
    },
  };

  // Add the changelog stuffs
  packageConf.scripts.changelog =
    'conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md';
  packageConf.scripts.version = ensureScript(
    packageConf.scripts.version,
    'npm run changelog',
  );
  packageConf.scripts.lint =
    packageConf.scripts.lint || 'echo "WARNING: No linter configured"';
  packageConf.scripts.preversion = ensureScript(
    packageConf.scripts.preversion,
    LINT_SCRIPT,
  );
  packageConf.scripts.preversion = ensureScript(
    packageConf.scripts.preversion,
    METAPAK_CHECK_SCRIPT,
  );

  // Add the MUST HAVE dev dependencies
  packageConf.devDependencies = packageConf.devDependencies || {};
  packageConf.devDependencies.commitizen = '^3.0.5';
  packageConf.devDependencies['cz-conventional-changelog'] = '^2.1.0';
  packageConf.devDependencies['conventional-changelog-cli'] = '^2.0.11';

  // This job is already done by NPM, but once,.
  // This allows to do it on old repositories
  if (packageConf.repository && 'git' === packageConf.repository.type) {
    const [, userName, repositoryName] =
      GITHUB_REPOSITORY_REGEXP.exec(packageConf.repository.url) || [];
    if (userName && repositoryName) {
      packageConf.bugs = packageConf.bugs || {
        url:
          'https://github.com/' + userName + '/' + repositoryName + '/issues',
      };
      packageConf.homepage =
        packageConf.homepage ||
        'https://github.com/' + userName + '/' + repositoryName + '#readme';
    }
  }

  return packageConf;
};
