'use strict';

const PRE_COMMIT_DOC =
  'npm run doc && git add .readme/API.md';

module.exports = (hooks) => {
  hooks['pre-commit'] = hooks['pre-commit'] || [];
  hooks['pre-commit'].push(PRE_COMMIT_DOC);
  return hooks;
};
