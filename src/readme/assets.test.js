'use strict';

const assert = require('assert');
const sinon = require('sinon');
const assetsTransformer = require('./assets');

describe('Readme', () => {
  describe('Assets transformer for www configs', () => {
    it('should build the README.md file', done => {
      const fs = {
        readFileAsync: sinon.stub(),
      };
      const PROJECT_DIR = '/lol/';
      const log = {
        error: sinon.stub,
      };

      fs.readFileAsync
        .onFirstCall()
        .returns(Promise.resolve('## Usage\nJust require me\n'));

      assetsTransformer(
        {
          name: 'README.md',
          data: '<!-- something -->\n',
        },
        {
          name: 'module',
          description: 'A great module!',
          devDependencies: {},
          license: 'MIT',
        },
        {
          PROJECT_DIR,
          fs,
          log,
        },
      )
        .then(file => {
          expect(file).toMatchSnapshot();
        })
        .then(done)
        .catch(done);
    });

    it('should build the README.md file with links', done => {
      const fs = {
        readFileAsync: sinon.stub(),
      };
      const PROJECT_DIR = '/lol/';
      const log = {
        error: sinon.stub,
      };

      fs.readFileAsync
        .onFirstCall()
        .returns(Promise.resolve('## Usage\nJust require me\n'));

      assetsTransformer(
        {
          name: 'README.md',
          data: '<!-- something -->\n',
        },
        {
          name: 'module',
          description: 'A great module!',
          metapak: { configs: ['jsarch', 'jsdocs'] },
          devDependencies: {},
          license: 'MIT',
        },
        {
          PROJECT_DIR,
          fs,
          log,
        },
      )
        .then(file => {
          expect(file).toMatchSnapshot();
        })
        .then(done)
        .catch(done);
    });

    it('should let pass other files', () => {
      assert.deepEqual(
        assetsTransformer(
          {
            name: 'YOLO',
            data: 'Carpe diem\n',
          },
          {},
          {},
        ),
        {
          name: 'YOLO',
          data: 'Carpe diem\n',
        },
      );
    });
  });
});
