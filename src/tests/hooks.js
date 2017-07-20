'use strict';

const PRE_COMMIT_TEST_CHECK = 'npm run test';

module.exports = (hooks) => {
  hooks['pre-commit'] = hooks['pre-commit'] || [];
  hooks['pre-commit'].push(PRE_COMMIT_TEST_CHECK);
  return hooks;
};
