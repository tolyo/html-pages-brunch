# html-pages-brunch
Adds [html-minifier](https://github.com/kangax/html-minifier) support to
[brunch](http://brunch.io).

The plugin will minify your HTML templates located outside of `assets` directory, which is a must if you're working
with templates in a folders-by-feature structure.

## Usage
Install the plugin via npm with `npm install --save html-pages-brunch`.

Or, do manual install:

* Add `"html-pages-brunch": "x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, add
`"html-pages-brunch": "git@github.com:tolyo/html-pages-brunch.git"`.

To specify html-pages-brunch options, use `config.plugins.htmlPages` object to specify `htmlMin` and `destination` settings.
The plugin can be disabled with a `disabled` setting.
For example:

```coffeescript
config =
  plugins:
    htmlPages:
      htmlMin :
        removeComments: true
        removeCommentsFromCDATA: true
        removeCDATASectionsFromCDATA: true
        collapseBooleanAttributes: true
        useShortDoctype: true
        removeEmptyAttributes: true
        removeScriptTypeAttributes: true
        removeStyleLinkTypeAttributes: true
        collapseWhitespace: true
        minifyJS: true
        minifyCSS: true
      destination : (path) ->
        path.replace /^app[\/\\](.*)\.html$/, "$1.html"
      disable: false
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

