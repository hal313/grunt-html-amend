(function(module) {
  'use strict';

  const ContentProcessor = require('../util/ContentProcessor');

  module.exports = function(grunt) {

    /**
     * Registers a multitask for Grunt.
     */
    grunt.registerMultiTask('htmlAmend', 'Modifies HTML content', function htmlAmend() {
      // The content processor
      const contentProcessor = new ContentProcessor(this.options(), grunt.log.warn, grunt.fail);

      // Iterate over all specified file groups
      this.files.forEach(function(file) {
        // For each group
        file.src.filter(function(path) {
          // Warn on and remove source files which do not exist
          if (!grunt.file.exists(path)) {
            // Logging
            grunt.log.warn('Source file "' + path + '" not found.');
            return false;
          } else {
            return true;
          }
        })
        .forEach(function onFile(filepath) {
          // Get the content
          const content = contentProcessor.processContent(grunt.file.read(filepath));

          // Write the destination file with the processed content
          grunt.file.write(file.dest, content);

          // Print a success message
          grunt.log.writeln('File "' + file.dest + '" created.');
        });

      });

    });

  };

})(module);
