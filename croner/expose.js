/**
 * UMD (Universal Module Definition) export helper.
 * Exposes a factory function to the current environment so the same file
 * works in Node, AMD loaders (e.g. RequireJS), and plain browser scripts.
 *
 * @param {Function} factory - The module API (e.g. function (pattern) { return new Cron(pattern); }).
 */
function expose (factory) {
	// Node: require('croner') returns the factory
	if (typeof module != 'undefined' && typeof module.exports === 'object') {
		module.exports = factory;
	// AMD: define([], ...) provides the factory as the module value
	} else if (typeof define === 'function' && define.amd) {
		define([], function () { return factory; });
	// Browser: attach to global so <script> gives window.cron
	} else {
		this.cron = factory;
	}
}

// Expose the Cron constructor as the public API in this environment
expose(function (pattern) { return new Cron(pattern); });