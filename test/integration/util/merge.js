((module) => {
    'use strict';

    /**
	 * Merges objects from right to left, where the left-most item takes precedence over the right-most item.
	 *
	 * @param {Object[]} objects the objects to merge (in right to left order)
	 * @return {Object} an object whose members are the result of merging all object parameters into this object
	 */
    module.exports = (...objects) => {
	    let mergedObject = {};
	    let sources = Array.prototype.slice.call(objects).reverse();
	    let source;

	    for (let i=0; i<sources.length; i++) {
	        source = sources[i];
	        if (!!source) {
	            for (let attributeName in source) {
	                mergedObject[attributeName] = source[attributeName];
	            }
	        }
	    }

	    return mergedObject;
	};

})(module);
