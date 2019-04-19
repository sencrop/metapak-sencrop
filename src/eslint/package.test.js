'use strict';

const packageTransformer = require('./package');

describe('Main', () => {
  describe('Package transformer', () => {
    test('should work with an empty package.json for backend', () => {
      expect(
        packageTransformer({
          metapak: {
            data: {
              files: 'lol.js',
              eslintConfigType: 'backend',
            },
          },
        }),
      ).toMatchSnapshot();
    });

    test('should work with an empty package.json for create-react-app', () => {
      expect(
        packageTransformer({
          metapak: {
            data: {
              files: 'lol.js',
              eslintConfigType: 'create-react-app',
            },
          },
        }),
      ).toMatchSnapshot();
    });
  });
});
