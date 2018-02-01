"use strict";

const PRE_COMMIT_DOC = "npm run doc && git add .readme/API.md";

const assert = require("assert");
const hooksTransformer = require("./hooks");

describe("JSDocs", () => {
  describe("Hooks transformer", () => {
    it("should add pre-commit hooks", () => {
      assert.deepEqual(hooksTransformer({}), {
        "pre-commit": [PRE_COMMIT_DOC]
      });
    });

    it("should leave existing pre-commit hooks", () => {
      assert.deepEqual(
        hooksTransformer({
          "pre-commit": ["npm t"]
        }),
        {
          "pre-commit": ["npm t", PRE_COMMIT_DOC]
        }
      );
    });
  });
});
