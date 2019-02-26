'use strict';

const COMMIT_MSG_COMMITLINT_CHECK = `
npm run commitlint -- -x '@commitlint/config-conventional'
`;
const PRE_COMMIT_CWD_WARNING = `
npm run precz;
if ! git diff-files --quiet --ignore-submodules ; then
  echo "⚠️ - Unstaged files found:"
  echo $(git diff-files --shortstat)
fi`;

module.exports = hooks => {
  hooks['pre-commit'] = hooks['pre-commit'] || [];
  hooks['pre-commit'].push(PRE_COMMIT_CWD_WARNING);
  hooks['commit-msg'] = hooks['commit-msg'] || [];
  hooks['commit-msg'].push(COMMIT_MSG_COMMITLINT_CHECK);
  return hooks;
};
