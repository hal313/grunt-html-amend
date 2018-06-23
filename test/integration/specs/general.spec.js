(() => {
  'use strict';

  const grunt = require('grunt');
  const merge = require('./../util/merge');
  const runTest = require('./../util/runTest');
  const PathUtil = require('./../util/PathUtil');

  const defaultOptions = {
    position: 'attribute',
    element: 'div',
    attributeName: 'some-attribute',
    attributeValue: 'some-value'
  };


  describe('General Behavior', () => {

    beforeAll(() => {
      grunt.loadTasks('tasks');
    });

    test('should not output any file when the input file is not found', () => {
      let destPath = PathUtil.actual('/attribute/not-written-input-file-not-found.html');
      runTest(
        'attribute.input-file-not-found',
        merge({}, defaultOptions),
        PathUtil.source('/attribute/not-read.html'),
        destPath,
        null,
        true
      );

      // Check to be sure that the file was not written
      expect(grunt.file.exists(destPath)).toBeFalsy();
    });

    test('should not write a file when the fail flag is true and the config has an invalid configuration', () => {
      let destPath = PathUtil.actual('/attribute/not-written-fail-flag-null-element.html');
      runTest(
        'attribute.fail-flag-unknown-element',
        merge({fail: true, element: null}, defaultOptions),
        PathUtil.source('/attribute/default.html'),
        destPath,
        null,
        true
      );

      // Check to be sure that the file was not written
      expect(grunt.file.exists(destPath)).toBeFalsy();
    });

  });

})();
