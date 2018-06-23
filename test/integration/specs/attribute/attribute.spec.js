(() => {
  'use strict';

  const grunt = require('grunt');
  const merge = require('../../util/merge');
  const runTest = require('../../util/runTest');
  const PathUtil = require('../../util/PathUtil');

  const defaultOptions = {
    position: 'attribute',
    element: 'div',
    attributeName: 'some-attribute',
    attributeValue: 'some-value'
  };


  describe('attribute', () => {

    beforeAll(() => {
      grunt.loadTasks('tasks');
    });

    test('should replace a regular expression (attribute.default)', () => {
      runTest(
        'attribute.default',
        defaultOptions,
        PathUtil.source('/attribute/default.html'),
        PathUtil.actual('/attribute/default.html'),
        PathUtil.expected('/attribute/default.html')
      );
    });

    test('should not replace content when the element is undefined (attribute.undefined-element)', () => {
      runTest(
        'attribute.undefined-element',
        merge({element: undefined}, defaultOptions),
        PathUtil.source('/attribute/default.html'),
        PathUtil.actual('/attribute/undefined-element.html'),
        PathUtil.expected('/attribute/undefined-element.html')
      );
    });

    test('should not replace content when the attributeName is undefined (attribute.undefined-attributeName)', () => {
      runTest(
        'attribute.undefined-attributeName',
        merge({attributeName: undefined}, defaultOptions),
        PathUtil.source('/attribute/default.html'),
        PathUtil.actual('/attribute/undefined-attributeName.html'),
        PathUtil.expected('/attribute/undefined-attributeName.html')
      );

    });

  });

})();
