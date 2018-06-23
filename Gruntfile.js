(function (module) {
  'use strict';

  module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          'tasks/*.js',
          'util/*.js'
        ]
      },
      // Before generating any new files, remove any previously-created files.
      clean: {
        build: ['build']
      }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Build
    grunt.registerTask('build', ['jshint']);

    // Build
    grunt.registerTask('default', ['build']);

  };

})(module);
