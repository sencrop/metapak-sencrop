const escapeStringRegexp = require('escape-string-regexp');

module.exports = {
  ensureScript,
};

function ensureScript(baseScript = '', addedScript) {
  return new RegExp(`(^| && )${escapeStringRegexp(addedScript)}($| && )`).test(
    baseScript,
  )
    ? baseScript
    : `${baseScript ? `${baseScript} && ` : baseScript}${addedScript}`;
}
