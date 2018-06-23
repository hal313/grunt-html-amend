((module) => {
    'use strict';

    const grunt = require('grunt');

    /**
     * Generates a subtask configuration suitable to be run in Grunt.
     *
     * Example:
     * name: {
     *   options: options,
     *   src: src,
     *   dest: dest
     * }
     *
     * @param {String} name the name of the subtask to run
     * @param {Object} options task options
     * @param {String} src the source file path
     * @param {String} dest the destination file path
     * @returns {Object} a grunt subtask definition
     */
    const generateTaskConfig = (name, options, src, dest) => {
        let testConfig = {};
        testConfig[name] = {
          options: options,
          src: src,
          dest: dest
        };
        return testConfig;
      };

    /**
     * Runs a Grunt subtask by name. This will initialize the config for the task run the task.
     *
     * @param {String} name the name of the subtask to run
     * @param {Object} options task options
     * @param {String} src the source file path
     * @param {String} dest the destination file path
     */
      const runTask = (name, options, src, dest) => {
        grunt.initConfig({
          htmlAmend: generateTaskConfig(name, options, src, dest)
        });
        grunt.task.run(['htmlAmend:' + name]);
        grunt.task.start();
      };

    /**
     *
     *
     * @param {String} name the name of the subtask to run
     * @param {Object} options task options
     * @param {String} sourcePath the source file path
     * @param {String} destinationPath the destination file path
     * @param {String} expectedPath the path to the expected output
     * @param {Boolean} [skipExpectations] if true, the default expectations will not be executed
     */
    module.exports = (name, options, sourcePath, destinationPath, expectedPath, skipExpectations) => {
        runTask(name, options, sourcePath, destinationPath);

        if (!skipExpectations) {
          const actual = grunt.file.read(destinationPath);
          const expected = grunt.file.read(expectedPath);

          expect(actual).toEqual(expected);
        }
      };

})(module);
