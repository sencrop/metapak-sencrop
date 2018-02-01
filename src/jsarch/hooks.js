"use strict";

const PRE_COMMIT_ARCHITECTURE =
  "npm run architecture && git add ARCHITECTURE.md || exit 1";

module.exports = hooks => {
  hooks["pre-commit"] = hooks["pre-commit"] || [];
  hooks["pre-commit"].push(PRE_COMMIT_ARCHITECTURE);
  return hooks;
};
