'use strict';

// It is safe to run metapak here to add the API
// to the readme file since it should fail upfront
// if other changes were detected
const PRE_COMMIT_DOC = 'npm run doc && npm run metapak && git add README.md';

module.exports = hooks => {
  hooks['pre-commit'] = hooks['pre-commit'] || [];
  hooks['pre-commit'].push(PRE_COMMIT_DOC);
  return hooks;
};
