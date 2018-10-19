'use strict';

const path = require('path');
const { getMetapakConfig } = require('../utils');

const ORGANISATION_NAME = 'sencrop';
const README_CONTENTS_START_TAG = `[//]: # (::contents:start)`;
const README_CONTENTS_END_TAG = `[//]: # (::contents:end)`;
const README_REGEXP = /^(?:[^]*)\[\/\/\]: # \(::contents:start\)\r?\n\r?\n([^]*)\r?\n\r?\n\[\/\/\]: # \(::contents:end\)(?:[^]*)$/gm;

module.exports = (file, packageConf, { PROJECT_DIR, fs, log }) => {
  const { configs } = getMetapakConfig(packageConf);

  // Simple README templating system
  if ('README.md' === file.name) {
    // Header
    file.data += '# ' + packageConf.name + '\n';
    if (packageConf.description) {
      file.data += '> ' + packageConf.description + '\n';
    }
    file.data += '\n';

    return _getReadmeContents({ PROJECT_DIR, fs, log }).then(readme => {
      file.data += '\n\n' + README_CONTENTS_START_TAG + '\n\n';
      if (readme) {
        file.data += readme + '\n';
      }
      file.data += '\n' + README_CONTENTS_END_TAG + '\n\n';
      file.data += '# Useful resources\n';
      if (configs.includes('jsdocs')) {
        file.data += '- [API documentation](./API.md)\n';
      }
      if (configs.includes('jsarch')) {
        file.data += '- [Architecture Notes](./ARCHITECTURE.md)\n';
      }
      file.data += '- [Changelog](./CHANGELOG.md)\n\n';
      file.data +=
        '# License\n' +
        '[' +
        packageConf.license +
        '](https://github.com/' +
        ORGANISATION_NAME +
        '/' +
        packageConf.name +
        '/blob/master/LICENSE.md)\n';
      return file;
    });
  }

  return file;
};

function _getReadmeContents({ PROJECT_DIR, fs, log }) {
  const filePath = path.join(PROJECT_DIR, 'README.md');

  return fs
    .readFileAsync(filePath, 'utf8')
    .catch(err => {
      log('error', 'Cannot read the README.md file contents:', filePath);
      log('stack', err.stack);
      throw err;
    })
    .then(contents => {
      return contents.replace(README_REGEXP, '$1');
    });
}
