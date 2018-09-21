'use strict';

const packageTransformer = require('./package');

describe('JSDocs', () => {
  describe('Package transformer for jsdocs', () => {
    it('should work with an empty package.json', () => {
      expect(
        packageTransformer({
          metapak: {
            data: {
              files: 'yolo.js',
            },
          },
        }),
      ).toMatchSnapshot();
    });

    it('should work with an existing package.json', () => {
      expect(
        packageTransformer({
          scripts: {
            doc: 'yolo',
          },
          metapak: {
            data: {
              files: 'yolo.js',
              ignore: ['API.md'],
            },
          },
        }),
      ).toMatchSnapshot();
    });
  });
});
