'use strict';

const packageTransformer = require('./package');

describe('Main', () => {
  describe('Package transformer', () => {
    test('should work with an empty package.json', () => {
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

    test('should work with an empty package.json for react', () => {
      expect(
        packageTransformer({
          metapak: {
            data: {
              files: 'lol.js',
              eslintConfigType: 'react',
            },
          },
        }),
      ).toMatchSnapshot();
    });
  });
});
