'use strict';
const expect = require('chai').expect;
const Plugin = require('./');
const fs = require('fs');

describe('Plugin', () => {
  const plugin = new Plugin({
    paths: {public: 'build'}
  });
  plugin.disabled = false;

  it('should be an object', () => {
    expect(plugin).to.be.an('object');
  });

  it('should have #compileStatic method', () => {
    expect(plugin.compileStatic).to.be.a('function');
  });

  it('should has #compile method', () => {
    expect(plugin.compile).to.be.a('function');
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

  it('should minify front matter', function (done) {
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };
    plugin.preserveFrontMatter = false;

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '--- title: test name: test ---<p>blah';

    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      var path = "./build";
      expect(fs.existsSync(path)).to.be.ok;

      const filecontents = fs.readFileSync(path);
      expect(filecontents.toString()).to.equal(minified);

      fs.unlinkSync(path);
      done();
    });
  });

  it('should remove front matter', function (done) {
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };
    plugin.removeFrontMatter = true;

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '<p>blah';

    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      var path = "./build";
      expect(fs.existsSync(path)).to.be.ok;

      const filecontents = fs.readFileSync(path);
      expect(filecontents.toString()).to.equal(minified);

      fs.unlinkSync(path);
      done();
    });
  });

  it('should preserve front matter', function (done) {
    plugin.preserveFrontMatter = true;
    plugin.removeFrontMatter = false;
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '---\ntitle: test\nname: test\n---\n<p>blah';

    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      var path = "./build";
      expect(fs.existsSync(path)).to.be.ok;

      const filecontents = fs.readFileSync(path);
      expect(filecontents.toString()).to.equal(minified);

      fs.unlinkSync(path);
      done();
    });
  });

  it('should preserve front matter with unique separator', function (done) {
    plugin.preserveFrontMatter = true;
    plugin.removeFrontMatter = false;
    plugin.frontMatterSeparator = '= yaml =';
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };

    var content = '= yaml =\ntitle: test\nname: test\n= yaml =\n<p>blah</p>';
    var minified = '= yaml =\ntitle: test\nname: test\n= yaml =\n<p>blah';

    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      var path = "./build";
      expect(fs.existsSync(path)).to.be.ok;

      const filecontents = fs.readFileSync(path);
      expect(filecontents.toString()).to.equal(minified);

      fs.unlinkSync(path);
      done();
    });
  });
});
