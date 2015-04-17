global.expect = require('chai').expect;
global.Plugin = require('./');
var fs = require('fs');
describe('Plugin', function () {
  var plugin;

  beforeEach(function () {
    plugin = new Plugin({paths: {"public": 'build'}});
  });

  it('should be an object', function () {
    expect(plugin).to.be.ok;
  });

  it('should has #optimize method', function () {
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile and produce a build file', function (done) {
    plugin.htmlMin = {
      removeComments: true
    };

    var content = '<!-- some comment --><p>blah</p>';

    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      var path = "./build";
      expect(fs.existsSync(path)).to.be.ok;
      fs.unlinkSync(path);
      done();
    });
  });

});
