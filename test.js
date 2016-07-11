'use strict';
const expect = require('chai').expect;
const Plugin = require('./');

describe('Plugin', () => {
  const plugin = new Plugin({
    paths: {public: 'build'}
  });

  it('should be an object', () => {
    expect(plugin).to.be.an('object');
  });

  it('should has #optimize method', () => {
    expect(plugin.optimize).to.be.a('function');
  });

  it('should optimize html file and change path', () => {
    plugin.htmlMinOptions = {
      removeComments: true
    };

    const file = {
      data: '<!-- some comment --><p>blah</p>',
      path: 'app/some/dir/index.html'
    };

    return plugin.optimize(file).then(file => {
      expect(file.data).to.equal('<p>blah</p>');
      expect(file.path).to.equal('build/some/dir/index.html');
    });
  });
});
