# grunt-html-amend
> Amends HTML source files with dynamic data.

[![Build Status](https://travis-ci.org/hal313/grunt-html-amend.svg?branch=master)](https://travis-ci.org/hal313/grunt-html-amend)
[![npm version](https://badge.fury.io/js/grunt-html-amend.svg)](https://badge.fury.io/js/grunt-html-amend)
[![Dependency Status](https://img.shields.io/david/hal313/html-amend.svg?style=flat-square)](https://david-dm.org/hal313/grunt-html-amend)

## Introduction
It is often desirable to have a grunt task inject dynamic data into an HTML file. This grunt task allows you to add in comments, element, attributes or arbirtary character data.


## Getting Started
This plugin requires Grunt `^1.0.3`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-amend --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-amend');
```


## The "htmlAmend" task

### Overview
In your project's Gruntfile, add a section named `htmlAmend` to the data object passed into `grunt.initConfig()`.

**NOTE:** Nearly all options may be specified as functions which return a valid option. For example, the `content` option may be either a string or a function which results in a string. If the result of the function is another function, that new function will be executed. There is no limit to the number of functions which may be run, however system limitations and Grunt will certainly impose limits.

```js
grunt.initConfig({
  htmlAmend: {
    options: {
        // Common options go here
    },
    // Standard grunt file specifications
    src: 'src/index.html',
    dest: 'dist/index.html'
    }]
  },
});
```

### Options

#### options.position
Type | Values | Default Value
--- | --- | ---
`string` | 'element', 'attribute', 'comment', 'regex' | `undefined`


##### attribute
Name | Values | Required
--- | --- | ---
element | String or Function | yes
attributeName | String or Function | yes
attributeValue | String or Function | no

The `attribute` option will operate on the first element in the DOM which matches the `element`.

An attribute with the name `attributeName` and value `attributeValue` will be appended to the opening tag of the matching element.

Example:

Grunt configuration:
```js

htmlAmend: {
  options: {
    position: 'attribute',
    element: 'div',
    attributeName: 'class',
    attributeValue: 'best-class'
  },
  src: 'src/index.html',
  dest: 'dist/index.html'
}
```
Input HTML ('src/index.html'):
```html
<html>
  <body>
    <div></div>
  </body>
</html>
```
Output HTML ('dest/index.html'):
Input HTML:
```html
<html>
  <body>
    <div class="best-class"></div>
  </body>
</html>
```


##### comment
Name | Values | Required
--- | --- | ---
element | String or Function | yes
content | String or Function | no

The `comment` option will operate on the first element in the DOM which matches the `element`.

A star comment (`/* */`) will be added directly after the matching element, with the `content` between the comment stars.

Example:

Grunt configuration:
```js

htmlAmend: {
  options: {
    position: 'comment',
    element: 'div',
    content: 'This space for rent'
  },
  src: 'src/index.html',
  dest: 'dist/index.html'
}
```
Input HTML ('src/index.html'):
```html
<html>
  <body>
    <div></div>
  </body>
</html>
```
Output HTML ('dest/index.html'):
Input HTML:
```html
<html>
  <body>
    <div>/* This space for rent */</div>
  </body>
</html>
```


##### element
Name | Values | Required
--- | --- | ---
element | String or Function | yes
mode | 'afterOpen', 'beforeClose' or Function | yes
content | String or Function | no

The `element` option will operate on the first element in the DOM which matches the `element`.

If the `mode` is `afterOpen`, then the `content` will be added after the open tag. Conversely, if the `mode` is `beforeClose`, then the `content` will be inserted directly before the closing tag.

Example:

Grunt configuration:
```js

htmlAmend: {
  options: {
    position: 'element',
    element: 'section',
    mode: 'afterOpen',
    content: '<div class="message">Hello world!</div>'
  },
  src: 'src/index.html',
  dest: 'dist/index.html'
}
```
Input HTML ('src/index.html'):
```html
<html>
  <body>
    <section></section>
  </body>
</html>
```
Output HTML ('dest/index.html'):
```html
<html>
  <body>
    <section><div class="message">Hello world!</div></section>
  </body>
</html>
```


##### regex
Name | Values | Required
--- | --- | ---
regex | String, RegExp or Function | yes
content | String or Function | no

The `regex` option will operate on the first instance in the DOM which is matched by the `regex` value. It is possible to replace all matches if the value for `regex` is a `RegExp` with the `global` flag set.

Example:

Grunt configuration:
```js

htmlAmend: {
  options: {
    position: 'regex',
    regex: 'PUT_CONTENT_HERE',
    content: '<div>This space for rent</div>'
  },
  src: 'src/index.html',
  dest: 'dist/index.html'
}
```
Input HTML ('src/index.html'):
```html
<html>
  <body>
    PUT_CONTENT_HERE
  </body>
</html>
```
Output HTML ('dest/index.html'):
Input HTML:
```html
<html>
  <body>
    <div>This space for rent</div>
  </body>
</html>
```


## Building
```
npm install -g grunt jest
npm install
npm run build
```


### Running Tests
Integration tests run, which invoke the task to run against specific HTML files. In general, the input HTML files reside in `test\integration\files\source` and the expected HTML files reside in `test\integration\files\expected`. Using `PathUtil` to specify files for the `runTest` harness can keep tests clean and easy to follow.

Run tests once:
```
npm run test
```

Run tests continuously:
```
npm run test:watch
```


## Deploying
This is a basic script which can be used to build and deploy (to NPM) the project.

```
export VERSION=<NEXT VERSION>
git checkout -b release/$VERSION
npm version --no-git-tag-version patch
npm run build
npm run test
git add package*
git commit -m 'Version bump'
npx auto-changelog -p
git add CHANGELOG.md
git commit -m 'Updated changelog'
git checkout master
git merge --no-ff release/$VERSION
git tag -a -m 'Tagged for release' $VERSION
git branch -d release/$VERSION
git checkout develop
git merge --no-ff master
git push --all && git push --tags
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).