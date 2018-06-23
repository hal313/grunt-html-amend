(() => {
  'use strict';

  const grunt = require('grunt');
  const runTest = require('../../util/runTest');
  const PathUtil = require('../../util/PathUtil');

  describe('position', () => {

    beforeAll(() => {
      grunt.loadTasks('tasks');
    });

    test('should not replace content when the position is undefined (position.undefined-position)', () => {
      runTest(
        'position.undefined-position',
        {position: undefined},
        PathUtil.source('/position/default.html'),
        PathUtil.actual('/position/undefined-position.html'),
        PathUtil.expected('/position/undefined-position.html')
      );
    });

    test('should not replace content when the position is null (position.null-position)', () => {
      runTest(
        'position.null-position',
        {position: null},
        PathUtil.source('/position/default.html'),
        PathUtil.actual('/position/null-position.html'),
        PathUtil.expected('/position/null-position.html')
      );
    });

    test('should not replace content when the position is unknown (position.unknown-position)', () => {
      runTest(
        'position.unknown-position',
        {position: 'unknown'},
        PathUtil.source('/position/default.html'),
        PathUtil.actual('/position/unknown-position.html'),
        PathUtil.expected('/position/unknown-position.html')
      )
    });

  });

})();
