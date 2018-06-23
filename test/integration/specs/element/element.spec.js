(() => {
  'use strict';

  const grunt = require('grunt');
  const merge = require('../../util/merge');
  const runTest = require('../../util/runTest');
  const PathUtil = require('../../util/PathUtil');

  const defaultOptions = {
    position: 'element',
    element: 'div',
    content: '<new-element>this is new content</new-element>'
  };


  describe('element', () => {

    beforeAll(() => {
      grunt.loadTasks('tasks');
    });

    test('should add an element after the open tag for a specified element (element.afterOpen)', () => {
      runTest(
        'element.afterOpen',
        merge({mode: 'afterOpen'}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/afterOpen.html'),
        PathUtil.expected('/element/afterOpen.html')
      );
    });

    test('should add an element before the close tag for a specified element (element.beforeClose)', () => {
      runTest(
        'element.beforeClose',
        merge({mode: 'beforeClose'}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/beforeClose.html'),
        PathUtil.expected('/element/beforeClose.html')
      );
    });

    test('should not replace content when there is no element (element.undefined-element)', () => {
      runTest(
        'element.undefined-element',
        merge({element: undefined, mode: 'unknown',}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/undefined-element.html'),
        PathUtil.expected('/element/default.html')
      );
    });

    test('should not replace content when there is no element (element.null-element)', () => {
      runTest(
        'element.null-element',
        merge({element: null, mode: 'unknown',}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/null-element.html'),
        PathUtil.expected('/element/default.html')
      );
    });

    test('should not replace content when there is no element found (element.notfound-element)', () => {
      runTest(
        'element.notfound-element',
        merge({element: 'notfound', mode: 'unknown',}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/notfound-element.html'),
        PathUtil.expected('/element/default.html')
      );
    });

    test('should not change the content when the mode is unknown (element.mode-unknown)', () => {
      runTest(
        'element.mode-unknown',
        merge({mode: 'unknown'}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/mode-unknown.html'),
        PathUtil.expected('/element/default.html')
      );
    });

    test('should not change the content when the mode is undefined (element.mode-undefined)', () => {
      runTest(
        'element.mode-undefined',
        merge({mode: undefined}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/mode-undefined.html'),
        PathUtil.expected('/element/default.html')
      );
    });

    test('should not change the content when the mode is null (element.mode-null)', () => {
      runTest(
        'element.mode-null',
        merge({mode: null}, defaultOptions),
        PathUtil.source('/element/default.html'),
        PathUtil.actual('/element/mode-null.html'),
        PathUtil.expected('/element/default.html')
      );
    });

  });

})();
