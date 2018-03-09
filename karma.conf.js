// Karma configuration

module.exports = function (config) {
	config.set({

		plugins : [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			// Dependencies
			'../node_modules/angular/angular.js',
			'../node_modules/@uirouter/angularjs/release/angular-ui-router.js',
			'../node_modules/angular-translate/dist/angular-translate.js',
			'../node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js',
			'../node_modules/angular-mocks/angular-mocks.js',
			// Angular app
			'./dist/js/app.min.js',
			// Tests
			'./dist/js/test.js',
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
		},

		junitReporter: {
			outputDir: './report', // results will be saved as $outputDir/$browserName.xml
			outputFile: 'report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
			suite: '', // suite will become the package name attribute in xml testsuite element
			useBrowserName: false, // add browser name to report and classes names
			nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
			classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
			properties: {} // key value pair of properties to add to the <properties> section of the report
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['dots', 'progress', 'junit'],

		// web server port
		port: 4200,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config. LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],
		customLaunchers: {
			Chrome_without_sandbox: {
				base: 'Chrome',
				flags: ['--no-sandbox'] // with sandbox it fails under Docker
			}
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,
	});
};
