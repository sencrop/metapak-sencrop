'use strict';

const assert = require('assert');
const assetsTransformer = require('./assets');

describe('Readme', () => {
  describe('Assets transformer for www configs', () => {
    it('should build the README.md file', async () => {
      const fs = {
        readFileAsync: jest.fn(),
      };
      const PROJECT_DIR = '/lol/';
      const log = {
        error: jest.fn(),
      };

      fs.readFileAsync.mockResolvedValueOnce('## Usage\nJust require me\n');

      const file = await assetsTransformer(
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
      );

      expect(file).toMatchSnapshot();
    });

    it('should build the README.md file with links', async () => {
      const fs = {
        readFileAsync: jest.fn(),
      };
      const PROJECT_DIR = '/lol/';
      const log = {
        error: jest.fn(),
      };

      fs.readFileAsync.mockResolvedValueOnce('## Usage\nJust require me\n');

      const file = await assetsTransformer(
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
      );
      expect(file).toMatchSnapshot();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should let pass other files', () => {
      assert.deepStrictEqual(
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
