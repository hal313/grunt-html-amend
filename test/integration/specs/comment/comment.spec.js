(() => {
  'use strict';

  const grunt = require('grunt');
  const merge = require('../../util/merge');
  const runTest = require('../../util/runTest');
  const PathUtil = require('../../util/PathUtil');

  const defaultOptions = {
    position: 'comment',
    content: 'this is a comment',
    element: 'div'
  };


  describe('comment', () => {

    beforeAll(() => {
      grunt.loadTasks('tasks');
    });

    test('should add a comment (comment.default)', () => {
      runTest(
        'comment.default',
        defaultOptions,
        PathUtil.source('/comment/default.html'),
        PathUtil.actual('/comment/default.html'),
        PathUtil.expected('/comment/default.html')
      );
    });

    test('should not add a comment when the element is undefined (comment.undefined-element)', () => {
      runTest(
        'comment.undefined-element',
        merge({element: undefined}, defaultOptions),
        PathUtil.source('/comment/default.html'),
        PathUtil.actual('/comment/undefined-element.html'),
        PathUtil.expected('/comment/undefined-element.html')
      );
    });

    test('should not add a comment when the element is null (comment.null-element)', () => {
      runTest(
      'comment.null-element',
        merge({element: null}, defaultOptions),
        PathUtil.source('/comment/default.html'),
        PathUtil.actual('/comment/null-element.html'),
        PathUtil.expected('/comment/null-element.html')
      );
    });

    test('should not add a comment when the element is not found (comment.notfound-element)', () => {
      runTest(
        'comment.notfound-element',
        merge({element: 'notfound'}, defaultOptions),
        PathUtil.source('/comment/default.html'),
        PathUtil.actual('/comment/notfound-element.html'),
        PathUtil.expected('/comment/notfound-element.html')
      );
    });

    test('should not add a comment when the comment is undefined (comment.undefined-comment)', () => {
      runTest(
        'comment.undefined-comment',
        merge({comment: undefined, element: 'notfound'}, defaultOptions),
        PathUtil.source('/comment/default.html'),
        PathUtil.actual('/comment/undefined-comment.html'),
        PathUtil.expected('/comment/undefined-comment.html')
      );
    });

    test('should not add a comment when the comment is null (comment.null-comment)', () => {
      runTest(
        'comment.null-comment',
        merge({comment: null, element: 'notfound'}, defaultOptions),
        PathUtil.source('/comment/default.html'),
        PathUtil.actual('/comment/null-comment.html'),
        PathUtil.expected('/comment/null-comment.html')
      );
    });

    test('should not add a comment when the comment is empty (comment.empty-comment)', () => {
      runTest(
        'comment.empty-comment',
          merge({omment: '', element: 'notfound'}, defaultOptions),
          PathUtil.source('/comment/default.html'),
          PathUtil.actual('/comment/empty-comment.html'),
          PathUtil.expected('/comment/empty-comment.html')
        );
    });

  });

})();
