# html-pages-brunch
Adds [html-minifier](https://github.com/kangax/html-minifier) support to
[brunch](http://brunch.io).

The plugin will compile, reload-on-save, validate and minify your HTML templates located outside of `assets` directory. This  allows to architect your project with templates in a folders-by-feature structure, as well as receive instantaneous visual and semanctic feedback on the changes to your markup. 

The plugin provides a default optimization, ready to be used in production environment.

## Usage
Install the plugin via npm with `npm install --save-dev html-pages-brunch`.

Or, do manual install:

* Add `"html-pages-brunch": "x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, add
`"html-pages-brunch": "git@github.com:tolyo/html-pages-brunch.git"`.

To specify html-pages-brunch options, use `plugins.htmlPages` object to specify `htmlMin` and `destination` settings.

For _development_, the minification is disabled by default. You can enable it by setting `optimize` to `true`.
For _production_, the minification is enabled by default.

The plugin can be disabled with a `disabled` setting.

To enable minification of `.html` files inside assets folder use `compileAssets` setting.

Front Matter will be minified by default with `html-minifier`.  You can choose to override this setting using the following properties:
* `preserveFrontMatter` - Leaves the front matter untouched
* `removeFrontMatter` - Removes the front matter completely
* `forceRemoveFrontMatter` - Allows removing the front matter even when `disabled` is true
* `frontMatterSeparator` - Allows configuring the front matter separator (defaults to `---`)

For example:

```javascript
module.exports = {
  // OPTIONAL settings. No settings are required by default.
  plugins: {
    htmlPages: {
      htmlMin: {
        caseSensitive: false,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        conservativeCollapse: false,
        html5: true,
        includeAutoGeneratedTags: false,
        keepClosingSlash: false,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: false,
        preventAttributesEscaping: false,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true    
      },
      destination(path) {
        return path.replace(/^app[\/\\](.*)\.html$/, "$1.html");
      },
      disabled: false,
      compileAssets: true,
      preserveFrontMatter: false,
      removeFrontMatter: false,
      forceRemoveFrontMatter: false,
      frontMatterSeparator: '---'
    }
  }
}
```

## License

The MIT License (MIT)

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
