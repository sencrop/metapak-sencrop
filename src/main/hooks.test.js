'use strict';

const hooksTransformer = require('./hooks');

describe('Main', () => {
  describe('Hooks transformer', () => {
    it('should add pre-commit hooks', () => {
      expect(hooksTransformer({})).toMatchSnapshot();
    });
  });
});
