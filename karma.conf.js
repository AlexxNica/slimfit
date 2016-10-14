// Karma configuration
'use strict';

const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup').default;
const nodeResolve = require('rollup-plugin-node-resolve');
const istanbul = require('rollup-plugin-istanbul');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // each file acts as entry point for the webpack configuration
    files: [
      // all files ending in ".spec.js"
      'src/**/*.spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.spec.js': ['rollup']
    },

    rollupPreprocessor: {
      // rollup settings. See Rollup documentation
      plugins: [
        nodeResolve(),
        babel(babelrc()), // ES2015 compiler by the same author as Rollup
        istanbul({
          exclude: ['src/**/*.spec.js', 'node_modules/**/*', 'vendor/**/*']
        })
      ],
      // will help to prevent conflicts between different tests entries
      format: 'iife',
      sourceMap: 'inline'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      reporters: [
        { type: 'text' }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
      // 'Chrome',
      // 'Firefox'
    ]

  });
};
