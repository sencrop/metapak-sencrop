'use strict';

const packageTransformer = require('./package');

describe('Package transformer', () => {
  test('should work with an empty package.json', () => {
    expect(packageTransformer({
      metapak: {
        data: {
          files: 'lol.js',
        },
      },
    }))
    .toMatchSnapshot();
  });
});
