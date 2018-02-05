'use strict';

const PRE_COMMIT_ARCHITECTURE =
  'npm run architecture && git add ARCHITECTURE.md || exit 1';
const assert = require('assert');
const hooksTransformer = require('./hooks');

describe('Architecture', () => {
  describe('Hooks transformer', () => {
    it('should add pre-commit hooks', () => {
      assert.deepEqual(hooksTransformer({}), {
        'pre-commit': [PRE_COMMIT_ARCHITECTURE],
      });
    });

    it('should leave existing pre-commit hooks', () => {
      assert.deepEqual(
        hooksTransformer({
          'pre-commit': ['npm t'],
        }),
        {
          'pre-commit': ['npm t', PRE_COMMIT_ARCHITECTURE],
        }
      );
    });
  });
});
