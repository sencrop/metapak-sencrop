const escapeStringRegexp = require('escape-string-regexp');

module.exports = {
  ensureScript,
  getMetapakConfig,
};

function ensureScript(baseScript = '', addedScript) {
  return new RegExp(`(^| && )${escapeStringRegexp(addedScript)}($| && )`).test(
    baseScript,
  )
    ? baseScript
    : `${baseScript ? `${baseScript} && ` : baseScript}${addedScript}`;
}

function getMetapakConfig(packageConf) {
  return {
    data:
      packageConf.metapak && packageConf.metapak.data
        ? packageConf.metapak.data
        : {},
    configs:
      packageConf.metapak && packageConf.metapak.configs
        ? packageConf.metapak.configs
        : [],
  };
}
