var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var minify = require('gulp-minify');
require('gulp-watch');

gulp.task('serve', function () {
	gulp.src('./')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 8080,
			fallback: 'index.html',
			livereload: true,
		}));
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
gulp.task('build', ['js', 'html', 'tests', 'sass']);


var sourceSass = [
	'./pages/**/**.scss',
];
gulp.task('sass', function () {
	gulp.src(sourceSass)
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(debug({ title: 'Move SCSS:' }))
		.pipe(gulp.dest('./css/'));

	gulp.src('./css/**/**/**.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function () {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(['./**/**.js', '!node_modules/**', '!./_**/**', '!./dist/**'])
	// .pipe(eslint())
		.pipe(eslint({ fix: true }))
		.pipe(eslint.format())
		.pipe(gulp.dest('.'))	// <-- update original files
		.pipe(eslint.failAfterError());
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
