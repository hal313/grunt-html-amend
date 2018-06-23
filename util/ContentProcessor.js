((module) => {
    'use strict';

    // The amender (the hard work)
    const amender = require('@hal313/html-amend');

    /**
     * Determines if a value is defined (not null and not undefined).
     *
     * @param {*} value the value to check if it is defined
     * @returns {Boolean} true if the value is not null and not undefined
     */
    const isDefined = (value) => {
        return undefined !== value && null !== value;
    };

    /**
     * Determines if a value is not defined (null or undefined).
     *
     * @param {*} value the value to check if it is undefined
     * @returns {Boolean} true if the value is null or undefined
     */
    const isUndefined = (value) => {
        return !isDefined(value);
    };

    /**
     * Determines if a value is undefined or the empty string (null, undefined or '').
     *
     * @param {*} value the value to check if it is undefined or the empty string
     * @returns {Boolean} true if the value is null, undefined or ''
     */
    const isUndefinedOrEmpty = (value) => {
        return isUndefined(value) || '' === value;
    };


    /**
     * An object which processes content by amending content in specific places.
     *
     * @param {Object} options options for the processor
     * @param {Function} warnFn the warning function (useful for logging, should take a String parameter)
     * @param {Function} failFn the fail function (useful for logging, should take a String parameter)
     */
    const ContentProcessor = function ContentProcessor(options, warnFn, failFn) {

        /**
         * Invokes either the failFn or warnFn with the specified message, based on options.fail.
         *
         * @param {String} message the message to fail or warn with
         */
        const failOrWarn = (message) => {
            // If the option 'fail' is truthy, fail the test
            if (!!options.fail) {
                // Fail!
                return failFn(message);
            }

            // Output a warning and return the original file content
            warnFn(message);
        };

        /**
         * Replaces a regular expression within 'input' with 'replacement'.
         *
         * @param {String|Function} input the original content
         * @param {String|RegExp|Function} regex the regular expression to use
         * @param {String|Function} [replacement] the replacement content
         * @returns {String} the content, with the regular expression replaced by the content
         */
        const processRegex = (input, regex, replacement) => {
            if (isUndefined(regex)) {
                return failOrWarn('No regex specifed') || input;
            }
            return amender.replaceWith(input, regex, replacement);
        };

        /**
         * Adds content to an element (either after the open tag or before the close tag).
         *
         * @param {String|Function} input the original content
         * @param {String|Function} element the element tag to process
         * @param {String} mode the mode ('afterOpen' or 'beforeClose')
         * @param {String|Function} content the content to insert
         * @return {String} the content, with the element modified by inserting the specified content
         */
        const processElement = (input, element, mode, content) => {
            if (isUndefinedOrEmpty(element)) {
                return failOrWarn('No element tag specifed') || input;
            }
            switch (mode) {
                case 'afterOpen':
                    return amender.afterElementOpen(input, element, content);
                case 'beforeClose':
                    return amender.beforeElementClose(input, element, content);
                default:
                    return failOrWarn('Unknown element mode [' + mode + ']') || input;
            }
        };

        /**
         * Adds an attribute to an element.
         *
         * @param {String|Function} input the original content
         * @param {String|Function} element the element tag
         * @param {String|Function} attributeName the attribute name to add
         * @param {String|Function} attributeValue the attribute value to add
         * @return {String} the original content with the specified attributed added to the specified element
         */
        const processAttribute = (input, element, attributeName, attributeValue) => {
            if (isUndefinedOrEmpty(element)) {
                return failOrWarn('No element tag specifed') || input;
            }
            if (isUndefinedOrEmpty(attributeName)) {
                return failOrWarn('No attribute name specifed') || input;
            }
            return amender.insertAttribute(input, element, attributeName, attributeValue);
        };

        /**
         * Adds a comment to the specified element.
         *
         * @param {String|Function} input the original content
         * @param {String|Function} element the element tag
         * @param {String|Function} comment the comment to add
         * @return {String} the original content with the comment added after the specified element
         */
        const processComment = (input, element, comment) => {
            if (isUndefinedOrEmpty(element)) {
                return failOrWarn('No element tag specifed') || input;
            }
            return amender.insertComment(input, element, comment);

        };

        /**
         * Processes content by dispatching to the appropriate helper functions based on type.
         *
         * @param {String|Function} input the original content
         * @param {Object} options options to help with processing
         * @return {String} the fully processed content
         */
        const process = (input, options) => {
            switch (options.position.trim().toLowerCase()) {
                case 'regex':
                    return processRegex(input, options.regex, options.content);
                case 'element':
                    return processElement(input, options.element, options.mode, options.content);
                case 'attribute':
                    return processAttribute(input, options.element, options.attributeName, options.attributeValue);
                case 'comment':
                    return processComment(input, options.element, options.content);
                default:
                    return failOrWarn('Unknown position [' + options.position + ']') || input;
            }
        };

        /**
         * Processes content by amending content.
         *
         * @param {String} input the content to amend
         * @returns {String} the content of the file, possibly amended
         */
        this.processContent = (input) => {
            // If the position is specified, process the content
            if (!!options.position) {
                return process(input, options);
            } else {
                // No options specified
                return failOrWarn('options.position not present; returning original file content') || input;
            }
        };

    };

    module.exports = ContentProcessor;

})(module);
