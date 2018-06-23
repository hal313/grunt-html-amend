(()  => {
  'use strict';

  const grunt = require('grunt');
  const merge = require('../../util/merge');
  const runTest = require('../../util/runTest');
  const PathUtil = require('../../util/PathUtil');

  const defaultOptions = {
    position: 'regex',
    content: 'replaced!',
    regex: 'REPLACEME'
  };


  describe('regex', () => {

    beforeAll(() => {
      grunt.loadTasks('tasks');
    });

    test('should replace a regular expression (regex.default)', () => {
      runTest(
        'regex.default',
        defaultOptions,
        PathUtil.source('/regex/default.html'),
        PathUtil.actual('/regex/default.html'),
        PathUtil.expected('/regex/default.html')
      );
    });

    test('should not alter file content when the regex is undefined (regex.undefined-regex)', () => {
      runTest(
        'regex.undefined-regex',
        merge({regex: undefined}, defaultOptions),
        PathUtil.source('/regex/default.html'),
        PathUtil.actual('/regex/undefined-regex.html'),
        PathUtil.expected('/regex/undefined-regex.html')
      );
    });

    test('should not alter file content when the regex is null (regex.null-regex)', () => {
      runTest(
        'regex.null-regex',
        merge({regex: null}, defaultOptions),
        PathUtil.source('/regex/default.html'),
        PathUtil.actual('/regex/null-regex.html'),
        PathUtil.expected('/regex/null-regex.html')
      );
    });

  });

})();
