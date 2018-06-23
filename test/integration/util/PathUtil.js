((module) => {
    'use strict';

	// Path prefixes for the HTML files
	const ACTUAL_PATH = 'build/temp/files/actual';
	const EXPECTED_PATH = 'test/integration/files/expected';
	const SOURCE_PATH = 'test/integration/files/source';

	/**
	 * Trims the leading slash from a path, if present.
	 *
	 * @param {String} path the path to trim the leading slash from
	 * @return {String} the path, with the leading slash (if originally present) trimmed off
	 */
	const trimLeadingSlash = (path) => {
		if ('/' === path.charAt(0) || '\\' === path.charAt(0)) {
			return path.substring(1);
		}
		return path;
	};

    module.exports = {
		/**
		 * Creates a file with the "actual" path; that is, a file whose path is a test-time "actual".
		 *
		 * @param {String} localPath the path to prefix with the "actual" root
		 * @return {String} a complete file path to the "actual" file
		 */
		actual: (localPath) => {
			return `${ACTUAL_PATH}/${trimLeadingSlash(localPath)}`;
		},
		/**
		 * Creates a file with the "expected" path; that is, a file whose path is a test-time "expected".
		 *
		 * @param {String} localPath the path to prefix with the "expected" root
		 * @return {String} a complete file path to the "expected" file
		 */
		expected: (localPath) => {
			return `${EXPECTED_PATH}/${trimLeadingSlash(localPath)}`;
		},
		/**
		 * Creates a file with the "source" path; that is, a file whose path is a test-time "source".
		 *
		 * @param {String} localPath the path to prefix with the "source" root
		 * @return {String} a complete file path to the "source" file
		 */
		source: (localPath) => {
			return `${SOURCE_PATH}/${trimLeadingSlash(localPath)}`;
		}
	};

})(module);
