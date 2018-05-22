'use strict';

const assert = require('assert');
const hooksTransformer = require('./hooks');
const PRE_COMMIT_TEST_CHECK = 'NODE_ENV=test npm run test || exit 1';

describe('Tests', () => {
  describe('Hooks transformer', () => {
    it('should add pre-commit hooks', () => {
      assert.deepEqual(hooksTransformer({}), {
        'pre-commit': [PRE_COMMIT_TEST_CHECK],
      });
    });
  });
});
