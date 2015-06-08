var minify = require("html-minifier").minify
  , fs = require("fs")
  , fspath = require("path")
  , mkdirp = require("mkdirp")
  , _ = require("lodash")
  ;

function HtmlPages(config) {
  this.publicPath = fspath.resolve(config.paths["public"]);

  if (config === undefined) config = {};
  if (config.plugins === undefined) config.plugins = {};
  var pluginConfig = config.plugins.htmlPages || {};
  this.destinationFn = pluginConfig.destination || this.DEFAULT_DESTINATION_FN;
  this.disabled = pluginConfig.disabled || this.DISABLED_SETTING;
  this.htmlMinOptions = pluginConfig.htmlMin ?
    _.clone(pluginConfig.htmlMin) :
    this.DEFAULT_HTMLMIN_OPTIONS;

}

HtmlPages.prototype.brunchPlugin = true;
HtmlPages.prototype.type = "template";
HtmlPages.prototype.extension = "html";

HtmlPages.prototype.DEFAULT_DESTINATION_FN = function (path) {
  return path.replace(/^app[\/\\](.*)\.html$/, "$1.html");
};

HtmlPages.prototype.DEFAULT_HTMLMIN_OPTIONS = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseBooleanAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  collapseWhitespace: true,
  minifyJS: true,
  minifyCSS: true
};

HtmlPages.prototype.DISABLED_SETTING = false;

HtmlPages.prototype.compile = function (data, path, callback) {
  var destinationDir, destinationPath, err, error, result;
  try {
    result = this.disabled ? data : minify(data, this.htmlMinOptions);
    destinationPath = this.destinationFn(path);
    destinationPath = fspath.join(this.publicPath, destinationPath);
    destinationDir = fspath.dirname(destinationPath);
    mkdirp.sync(destinationDir);
    return fs.writeFileSync(destinationPath, result);
  } catch (_error) {
    err = _error;
    console.error("Error while processing '" + path + "': " + (err.toString()));
    return error = err;
  } finally {
    callback(error, "");
  }
};

module.exports = HtmlPages;
