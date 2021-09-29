/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

// 编译器类 - 单个 compiler 时使用
const Compiler = require("./Compiler");
// 编译器类 - 单个 compiler 时使用
const MultiCompiler = require("./MultiCompiler");
// webpack插件 - 用来自定义 node 底层环境的功能（如：文件输出、文件监听）
const NodeEnvironmentPlugin = require("./node/NodeEnvironmentPlugin");
// 配置选项相关的类 - 增加内置的 options & 配置 compiler
const WebpackOptionsApply = require("./WebpackOptionsApply");
// 配置选项相关的类 - 设置 options 中的默认值
const WebpackOptionsDefaulter = require("./WebpackOptionsDefaulter");

// 校验数据结构的工具
const validateSchema = require("./validateSchema");
// 自定义的错误类，继承自 Error
const WebpackOptionsValidationError = require("./WebpackOptionsValidationError");
// webpack 配置选项的格式定义
const webpackOptionsSchema = require("../schemas/WebpackOptions.json");
// 自定义的错误类，继承自 Error
const RemovedPluginError = require("./RemovedPluginError");
// 获取 webapck 自己的版本号
const version = require("../package.json").version;

/** @typedef {import("../declarations/WebpackOptions").WebpackOptions} WebpackOptions */

/**
 * @param {WebpackOptions} options options object
 * @param {function(Error=, Stats=): void=} callback callback
 * @returns {Compiler | MultiCompiler} the compiler object
 */
const webpack = (options, callback) => {
	// 1、检验 options（配置选项）的格式 via JSON Schema
	const webpackOptionsValidationErrors = validateSchema(
		webpackOptionsSchema,
		options
	);
	if (webpackOptionsValidationErrors.length) {
		throw new WebpackOptionsValidationError(webpackOptionsValidationErrors);
	}

	// 2、创建 Compiler（编译器）实例
	let compiler;
	if (Array.isArray(options)) {
		// 多 compiler
		compiler = new MultiCompiler(
			Array.from(options).map(options => webpack(options))
		);
	} else if (typeof options === "object") {
		// 单 compiler，options 可能是纯 Object、Function、Promise

		// 处理 options: 为 options 设置默认值
		options = new WebpackOptionsDefaulter().process(options);

		// 实例化 Compiler
		compiler = new Compiler(options.context);
		compiler.options = options;

		// 配置 compiler: 应用 NodeEnvironmentPlugin 插件
		new NodeEnvironmentPlugin({
			infrastructureLogging: options.infrastructureLogging
		}).apply(compiler);

		// 配置 compiler: 应用 options 的插件列表
		if (options.plugins && Array.isArray(options.plugins)) {
			for (const plugin of options.plugins) {
				if (typeof plugin === "function") {
					plugin.call(compiler, compiler);
				} else {
					plugin.apply(compiler);
				}
			}
		}

		// 触发 compiler hooks
		compiler.hooks.environment.call();
		compiler.hooks.afterEnvironment.call();

		// 处理 options & 配置 compiler: 增加 webapck 内置的配置项
		compiler.options = new WebpackOptionsApply().process(options, compiler);
	} else {
		throw new Error("Invalid argument: options");
	}

	// 3、若提供了 callback，则会启动构建 compiler.run(callback)
	if (callback) {
		if (typeof callback !== "function") {
			throw new Error("Invalid argument: callback");
		}
		if (
			options.watch === true ||
			(Array.isArray(options) && options.some(o => o.watch))
		) {
			const watchOptions = Array.isArray(options)
				? options.map(o => o.watchOptions || {})
				: options.watchOptions || {};
			return compiler.watch(watchOptions, callback);
		}
		compiler.run(callback);
	}

	// 4、返回编译器实例
	return compiler;
};

exports = module.exports = webpack;
exports.version = version;

webpack.WebpackOptionsDefaulter = WebpackOptionsDefaulter;
webpack.WebpackOptionsApply = WebpackOptionsApply;
webpack.Compiler = Compiler;
webpack.MultiCompiler = MultiCompiler;
webpack.NodeEnvironmentPlugin = NodeEnvironmentPlugin;
// @ts-ignore Global @this directive is not supported
webpack.validate = validateSchema.bind(this, webpackOptionsSchema);
webpack.validateSchema = validateSchema;
webpack.WebpackOptionsValidationError = WebpackOptionsValidationError;

// 模块导出工具
const exportPlugins = (obj, mappings) => {
	for (const name of Object.keys(mappings)) {
		Object.defineProperty(obj, name, {
			configurable: false,
			enumerable: true,
			get: mappings[name]
		});
	}
};

exportPlugins(exports, {
	AutomaticPrefetchPlugin: () => require("./AutomaticPrefetchPlugin"),
	BannerPlugin: () => require("./BannerPlugin"),
	CachePlugin: () => require("./CachePlugin"),
	ContextExclusionPlugin: () => require("./ContextExclusionPlugin"),
	ContextReplacementPlugin: () => require("./ContextReplacementPlugin"),
	DefinePlugin: () => require("./DefinePlugin"),
	Dependency: () => require("./Dependency"),
	DllPlugin: () => require("./DllPlugin"),
	DllReferencePlugin: () => require("./DllReferencePlugin"),
	EnvironmentPlugin: () => require("./EnvironmentPlugin"),
	EvalDevToolModulePlugin: () => require("./EvalDevToolModulePlugin"),
	EvalSourceMapDevToolPlugin: () => require("./EvalSourceMapDevToolPlugin"),
	ExtendedAPIPlugin: () => require("./ExtendedAPIPlugin"),
	ExternalsPlugin: () => require("./ExternalsPlugin"),
	HashedModuleIdsPlugin: () => require("./HashedModuleIdsPlugin"),
	HotModuleReplacementPlugin: () => require("./HotModuleReplacementPlugin"),
	IgnorePlugin: () => require("./IgnorePlugin"),
	LibraryTemplatePlugin: () => require("./LibraryTemplatePlugin"),
	LoaderOptionsPlugin: () => require("./LoaderOptionsPlugin"),
	LoaderTargetPlugin: () => require("./LoaderTargetPlugin"),
	MemoryOutputFileSystem: () => require("./MemoryOutputFileSystem"),
	Module: () => require("./Module"),
	ModuleFilenameHelpers: () => require("./ModuleFilenameHelpers"),
	NamedChunksPlugin: () => require("./NamedChunksPlugin"),
	NamedModulesPlugin: () => require("./NamedModulesPlugin"),
	NoEmitOnErrorsPlugin: () => require("./NoEmitOnErrorsPlugin"),
	NormalModuleReplacementPlugin: () =>
		require("./NormalModuleReplacementPlugin"),
	PrefetchPlugin: () => require("./PrefetchPlugin"),
	ProgressPlugin: () => require("./ProgressPlugin"),
	ProvidePlugin: () => require("./ProvidePlugin"),
	SetVarMainTemplatePlugin: () => require("./SetVarMainTemplatePlugin"),
	SingleEntryPlugin: () => require("./SingleEntryPlugin"),
	SourceMapDevToolPlugin: () => require("./SourceMapDevToolPlugin"),
	Stats: () => require("./Stats"),
	Template: () => require("./Template"),
	UmdMainTemplatePlugin: () => require("./UmdMainTemplatePlugin"),
	WatchIgnorePlugin: () => require("./WatchIgnorePlugin")
});
exportPlugins((exports.dependencies = {}), {
	DependencyReference: () => require("./dependencies/DependencyReference")
});
exportPlugins((exports.optimize = {}), {
	AggressiveMergingPlugin: () => require("./optimize/AggressiveMergingPlugin"),
	AggressiveSplittingPlugin: () =>
		require("./optimize/AggressiveSplittingPlugin"),
	ChunkModuleIdRangePlugin: () =>
		require("./optimize/ChunkModuleIdRangePlugin"),
	LimitChunkCountPlugin: () => require("./optimize/LimitChunkCountPlugin"),
	MinChunkSizePlugin: () => require("./optimize/MinChunkSizePlugin"),
	ModuleConcatenationPlugin: () =>
		require("./optimize/ModuleConcatenationPlugin"),
	OccurrenceOrderPlugin: () => require("./optimize/OccurrenceOrderPlugin"),
	OccurrenceModuleOrderPlugin: () =>
		require("./optimize/OccurrenceModuleOrderPlugin"),
	OccurrenceChunkOrderPlugin: () =>
		require("./optimize/OccurrenceChunkOrderPlugin"),
	RuntimeChunkPlugin: () => require("./optimize/RuntimeChunkPlugin"),
	SideEffectsFlagPlugin: () => require("./optimize/SideEffectsFlagPlugin"),
	SplitChunksPlugin: () => require("./optimize/SplitChunksPlugin")
});
exportPlugins((exports.web = {}), {
	FetchCompileWasmTemplatePlugin: () =>
		require("./web/FetchCompileWasmTemplatePlugin"),
	JsonpTemplatePlugin: () => require("./web/JsonpTemplatePlugin")
});
exportPlugins((exports.webworker = {}), {
	WebWorkerTemplatePlugin: () => require("./webworker/WebWorkerTemplatePlugin")
});
exportPlugins((exports.node = {}), {
	NodeTemplatePlugin: () => require("./node/NodeTemplatePlugin"),
	ReadFileCompileWasmTemplatePlugin: () =>
		require("./node/ReadFileCompileWasmTemplatePlugin")
});
exportPlugins((exports.debug = {}), {
	ProfilingPlugin: () => require("./debug/ProfilingPlugin")
});
exportPlugins((exports.util = {}), {
	createHash: () => require("./util/createHash")
});

const defineMissingPluginError = (namespace, pluginName, errorMessage) => {
	Object.defineProperty(namespace, pluginName, {
		configurable: false,
		enumerable: true,
		get() {
			throw new RemovedPluginError(errorMessage);
		}
	});
};

// TODO remove in webpack 5
defineMissingPluginError(
	exports.optimize,
	"UglifyJsPlugin",
	"webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead."
);

// TODO remove in webpack 5
defineMissingPluginError(
	exports.optimize,
	"CommonsChunkPlugin",
	"webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead."
);
