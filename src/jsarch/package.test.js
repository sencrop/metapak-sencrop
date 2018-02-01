"use strict";

const packageTransformer = require("./package");

describe("Architecture", () => {
  describe("Package transformer for jsdocs", () => {
    it("should work with an empty package.json", () => {
      expect(
        packageTransformer({
          metapak: {
            data: {
              files: "yolo.js"
            }
          }
        })
      ).toMatchSnapshot();
    });
  });
});
