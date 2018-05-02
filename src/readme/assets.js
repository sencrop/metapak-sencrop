'use strict';

const path = require('path');
const { apiPath } = require('../config.js');
const ORGANISATION_NAME = 'sencrop';
const README_CONTENTS_START_TAG = `[//]: # (::contents:start)`;
const README_CONTENTS_END_TAG = `[//]: # (::contents:end)`;
const README_REGEXP = /^(?:[^]*)\[\/\/\]: # \(::contents:start\)\r?\n\r?\n([^]*)\r?\n\r?\n\[\/\/\]: # \(::contents:end\)(?:[^]*)$/gm;

module.exports = (file, packageConf, { PROJECT_DIR, fs, log }) => {
  // Simple README templating system
  if ('README.md' === file.name) {
    // Header
    file.data += '# ' + packageConf.name + '\n';
    if (packageConf.description) {
      file.data += '> ' + packageConf.description + '\n';
    }
    file.data += '\n';

    return Promise.all([
      _getReadmeContents({ PROJECT_DIR, fs, log }),
      _getAPIContents({ PROJECT_DIR, fs, log }),
    ]).then(([readme, api]) => {
      file.data += '\n\n' + README_CONTENTS_START_TAG + '\n\n';
      if (readme) {
        file.data += readme + '\n';
      }
      file.data += '\n' + README_CONTENTS_END_TAG + '\n\n';
      if (api) {
        file.data += api + '\n';
      }
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

function _getAPIContents({ PROJECT_DIR, fs, log }) {
  const filePath = path.join(PROJECT_DIR, apiPath);

  return fs.readFileAsync(filePath, 'utf8').catch(err => {
    log('debug', 'Cannot read the API.md file contents:', filePath);
    log('debug', err.stack);
    return '';
  });
}
