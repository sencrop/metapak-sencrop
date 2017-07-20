'use strict';

const path = require('path');
const USERNAME = 'nfroidure';

module.exports = (file, packageConf, { PROJECT_DIR, glob, fs, log }) => {
  if('README.md' === file.name) {
    // Header
    file.data += '# ' + packageConf.name + '\n';
    if(packageConf.description) {
      file.data += '> ' + packageConf.description + '\n';
    }
    file.data += '\n';
    return Promise.all([
      file.data,
      _getReadmeContents({ PROJECT_DIR, fs, log }),
      _getAPIContents({ PROJECT_DIR, fs, log }),
    ]).then((chunks) => {
      file.data = chunks.filter(_identity).join('\n') + '\n';
      file.data += '# License\n' +
      '[' + packageConf.license + '](https://github.com/' +
      USERNAME + '/' + packageConf.name + '/blob/master/LICENSE.md)\n';
      return file;
    });
  }

  return file;
};

function _getReadmeContents({ PROJECT_DIR, fs, log }) {
  const filePath = path.join(PROJECT_DIR, '.readme', 'contents.md');

  return fs.readFileAsync(filePath, 'utf8')
  .catch((err) => {
    log('error', 'Cannot read the README.md file contents:', filePath);
    log('stack', err.stack);
    throw err;
  });
}

function _getAPIContents({ PROJECT_DIR, fs, log }) {
  const filePath = path.join(PROJECT_DIR, '.readme', 'API.md');

  return fs.readFileAsync(filePath, 'utf8')
  .catch((err) => {
    log('debug', 'Cannot read the API.md file contents:', filePath);
    log('debug', err.stack);
    return '';
  });
}

function _identity(me) { return me; }
