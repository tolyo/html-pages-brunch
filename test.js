'use strict';
const expect = require('chai').expect;
const Plugin = require('./');
const fs = require('fs');

describe('Plugin', () => {
  const plugin = new Plugin({
    paths: {public: 'build'}
  });

  it('should be an object', () => {
    expect(plugin).to.be.an('object');
  });

  it('should have #compileStatic method', () => {
    expect(plugin.compileStatic).to.be.a('function');
  });

});
