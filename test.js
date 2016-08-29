'use strict';
const expect = require('chai').expect;
const Plugin = require('./');
const fs = require('fs');

describe('Plugin', () => {
  const plugin = new Plugin({
    paths: {public: 'build'}
  });
  const path = "./build";

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
    plugin.compile('<p>blah</p>', '', function (error) {
      expect(error).not.to.be.ok;
      expect(fs.existsSync(path)).to.be.ok;
      fs.unlinkSync(path);
      done();
    });
  });

  it('should minify file', function (done) {
    plugin.disabled = false;
    plugin.htmlMin = {
      removeComments: true
    };

    var content = '<!-- some comment --><p>blah</p>';
    var minified = '<p>blah';

    testCompile(content, minified, done);
  });

  it('should minify front matter', function (done) {
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };
    plugin.preserveFrontMatter = false;

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '--- title: test name: test ---<p>blah';

    testCompile(content, minified, done);
  });

  it('should preserve front matter', function (done) {
    plugin.disabled = false;
    plugin.preserveFrontMatter = true;
    plugin.removeFrontMatter = false;
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '---\ntitle: test\nname: test\n---\n<p>blah';

    testCompile(content, minified, done);
  });

  it('should preserve front matter with custom separator', function (done) {
    plugin.disabled = false;
    plugin.preserveFrontMatter = true;
    plugin.removeFrontMatter = false;
    plugin.frontMatterSeparator = '= yaml =';
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };

    var content = '= yaml =\ntitle: test\nname: test\n= yaml =\n<p>blah</p>';
    var minified = '= yaml =\ntitle: test\nname: test\n= yaml =\n<p>blah';

    testCompile(content, minified, done);
  });

  it('should remove front matter', function (done) {
    plugin.disabled = false;
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };
    plugin.removeFrontMatter = true;

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '<p>blah';

    testCompile(content, minified, done);
  });

  it('should not remove front matter when disabled', function (done) {
    plugin.disabled = true;
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };
    plugin.removeFrontMatter = true;

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';

    testCompile(content, content, done);
  });

  it('should force remove front matter when disabled', function (done) {
    plugin.disabled = true;
    plugin.htmlMin = {
      preserveLineBreaks: false,
      collapseWhitespace: true
    };
    plugin.forceRemoveFrontMatter = true;

    var content = '---\ntitle: test\nname: test\n---\n<p>blah</p>';
    var minified = '<p>blah</p>';

    testCompile(content, minified, done);
  });

  function testCompile(content, expected, done) {
    plugin.compile(content, '', function (error) {
      expect(error).not.to.be.ok;
      expect(fs.existsSync(path)).to.be.ok;

      const filecontents = fs.readFileSync(path);
      expect(filecontents.toString()).to.equal(expected);

      fs.unlinkSync(path);
      done();
    });
  }
});
