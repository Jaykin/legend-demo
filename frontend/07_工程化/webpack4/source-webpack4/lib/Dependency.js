/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const util = require("util");
const compareLocations = require("./compareLocations");
const DependencyReference = require("./dependencies/DependencyReference");

/** @typedef {import("./Module")} Module */
/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("./RuntimeTemplate")} RuntimeTemplate */

/**
 * @typedef {Object} DependencyTemplate
 * @property {function(Dependency, Source, RuntimeTemplate, Map<Function, DependencyTemplate>): void} apply
 */

// 源代码位置点（行列）
/** @typedef {Object} SourcePosition
 *  @property {number} line
 *  @property {number=} column
 */

/** @typedef {Object} RealDependencyLocation
 *  @property {SourcePosition} start
 *  @property {SourcePosition=} end
 *  @property {number=} index
 */

/** @typedef {Object} SynteticDependencyLocation
 *  @property {string} name
 *  @property {number=} index
 */

/** @typedef {SynteticDependencyLocation|RealDependencyLocation} DependencyLocation */
// 定义依赖的类
class Dependency {
	constructor() {
		// 引用依赖的模块
		/** @type {Module|null} */
		this.module = null;
		// TODO remove in webpack 5
		/** @type {boolean} */
		this.weak = false;
		/** @type {boolean} */
		this.optional = false;
		/** @type {DependencyLocation} */
		this.loc = undefined;
	}

	// 获取依赖资源的标识符
	getResourceIdentifier() {
		return null;
	}

	// 获取引用依赖的模块
	// Returns the referenced module and export
	getReference() {
		if (!this.module) return null;
		return new DependencyReference(this.module, true, this.weak);
	}

	// Returns the exported names
	getExports() {
		return null;
	}

	getWarnings() {
		return null;
	}

	getErrors() {
		return null;
	}

	updateHash(hash) {
		hash.update((this.module && this.module.id) + "");
	}

	disconnect() {
		this.module = null;
	}
}

// TODO remove in webpack 5
Dependency.compare = util.deprecate(
	(a, b) => compareLocations(a.loc, b.loc),
	"Dependency.compare is deprecated and will be removed in the next major version"
);

module.exports = Dependency;
