// Karma configuration
// Generated on Tue Jan 10 2017 15:47:24 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // 基础路径
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use (测试用的框架)
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

      // 文件匹配：使用minimatch表达式来匹配文件
    // list of files / patterns to load in the browser (浏览器中加载的文件)
    files: [
        'src/*.js',
        'test/*.js'
    ],
    // list of files to exclude (排除的文件)
    exclude: [
    ],
    // preprocess matching files before serving them to the browser (文件预处理器)
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    protocol: 'http:',
    hostname: 'localhost',
    urlRoot: '/',
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // 是否监控文件变化并运行测试
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    autoWatchBatchDelay: 250,

    // 浏览器设置：
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    browserDisconnectTimeout: 2000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
