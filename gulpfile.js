var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var minify = require('gulp-minify');
var runSequence = require('run-sequence');
var gulpNgConfig = require('gulp-ng-config');
var b2v = require('buffer-to-vinyl');

require('gulp-watch');

gulp.task('serve', function () {
	gulp.src('./')
		.pipe(webserver({
			host: process.env.FRONTEND_HOST || 'localhost',
			port: process.env.FRONTEND_PORT || 8080,
			fallback: 'index.html',
			livereload: true,
		}));
});

gulp.task('dev', function (done) {
    runSequence('build', ['watch', 'serve'], done);
});

gulp.task('make-config', function() {
    var json = JSON.stringify({
	    nodeEnv: process.env.NODE_ENV || 'development',
	    backendApiUrl: process.env.BACKEND_API_URL || 'http://localhost:3000'
    });

    return b2v.stream(new Buffer(json), 'config.js')
        .pipe(gulpNgConfig('app.config'))
        .pipe(gulp.dest('js'));
});


// --------
// TO_DO:
// ADD TASK FOR BUID DEPENDENCIES
// --------

// Build app js
var sourceJs = [
	'./js/**/**.js',
	'./languages/**/**.js',
	'./services/**/**.js',
	'./components/**/**.js',
	'./pages/**/**.js',
	'!./gulpfile.js',
	'!./**/**.spec.js',
	'!./node_modules/**',
	'!./dist/**',
];
gulp.task('js', function () {
	gulp.src(sourceJs)
		.pipe(debug({ title: 'Join JS:' }))
		.pipe(concat('app.js'))
		.pipe(minify({
			ext: {
				src: '-debug.js',
				min: '.min.js',
			},
		}))
		.pipe(gulp.dest('./dist/js'));
});

// Build app tests
var sourceTest = [
	'./test-globals.js',
	'./**/**.spec.js',
	'!./node_modules/**',
	'!./dist/**',
];
gulp.task('tests', function () {
	gulp.src(sourceTest)
		.pipe(debug({ title: 'Join tests:' }))
		.pipe(concat('test.js'))
		.pipe(gulp.dest('./dist/js'));
});

// Move app HTML files
var sourceHtml = [
	'./**/**.html',
	'!./index.html',
	'!./_**/**',
	'!./node_modules/**',
	'!./dist/**',
];
gulp.task('html', function () {
	gulp.src(sourceHtml)
		.pipe(debug({ title: 'Move HTML:' }))
		.pipe(gulp.dest('./dist'));
});

// Perform a complete build
gulp.task('build', ['make-config', 'js', 'html', 'tests', 'sass']);


var sourceSass = [
	'./**.scss',
	'./pages/**/**.scss',
	'./components/**/**.scss',
];
gulp.task('sass', function () {
	gulp.src('./sass/style.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(debug({ title: 'Move SCSS:' }))
		.pipe(gulp.dest('./css'));

	gulp.src('./css/**/**.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/css'));
});

/**
 * 	Execute eslint code checker.
 *	Autofix everyting eslint is able to. This can be prevented with --nofix
 */
gulp.task('lint', function () {
	var shallFix = process.argv.indexOf('--nofix') === -1;

	return gulp.src(['./**/**.js', '!node_modules/**', '!./_**/**', '!./dist/**'])
		// .pipe(eslint())
		.pipe(eslint({ fix: shallFix }))
		.pipe(eslint.format())
		.pipe(gulp.dest('.'))	// Apply fixes to original files
		.pipe(eslint.failAfterError());
});

gulp.task('aaa', function () {
	console.log(process.argv);
	var shallFix = process.argv.indexOf('--nofix') === -1;
	console.log('fix: ', shallFix);
});

// Watch and build on change
gulp.task('watch', function () {
	gulp.watch(sourceJs, ['js']);
	gulp.watch(sourceTest, ['tests']);
	gulp.watch(sourceHtml, ['html']);
	gulp.watch(sourceSass, ['sass']);
	// gulp.watch(['./src/**/*.css', './src/**/*.css'], ['styles']);
});

gulp.task('default', ['watch']);
