var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
 
gulp.task('serve', function () {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      fallback: 'index.html',
      livereload: true
    }));
});

// --------
// TO_DO:
// ADD TASK FOR BUID DEPENDENCIES
// --------

// Build app js
var source_js = [
	'./js/**/**.js',
	'./languages/**/**.js',
	'./services/**/**.js',
	'./components/**/**.js',
	'./pages/**/**.js',
	'!./gulpfile.js',
	'!./**/**.spec.js',
	'!./node_modules/**',
	'!./dist/**'
];
gulp.task('js', function () {
	gulp.src(source_js)
		.pipe(debug({title: 'Join JS:'}))
		.pipe(concat('app.js'))
		.pipe(minify({
			ext: {
				src: '-debug.js',
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest('./dist/js'));
});

// Build app tests
var source_test = [
	'./test-globals.js',
	'./**/**.spec.js',
	'!./node_modules/**',
	'!./dist/**'
];
gulp.task('tests', function () {
	gulp.src(source_test)
		.pipe(debug({title: 'Join tests:'}))
		.pipe(concat('test.js'))
		.pipe(gulp.dest('./dist/js'));
});

// Move app HTML files
var source_html = [
	'./**/**.html',
	'!./index.html',
	'!./_**/**',
	'!./node_modules/**',
	'!./dist/**'
];
gulp.task('html', function () {
	gulp.src(source_html)
		.pipe(debug({title: 'Move HTML:'}))
		.pipe(gulp.dest('./dist'));
});

// Perform a complete build
gulp.task('build', ['js', 'html', 'tests', 'sass']);


// Watch and build on change
gulp.task('watch', function () {
	gulp.watch(source_js, ['js']);
	gulp.watch(source_test, ['tests']);
	gulp.watch(source_html, ['html']);
	gulp.watch(source_sass, ['sass']);
	// gulp.watch(['./src/**/*.css', './src/**/*.css'], ['styles']);
});

gulp.task('default', ['watch']);

var source_sass = [
	'./pages/**/**.scss'
];
gulp.task('sass', function () {
	gulp.src(source_sass)
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
//		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//		.pipe(sass().on('error', sass.logError))
		.pipe(debug({title: 'Move SCSS:'}))
		.pipe(gulp.dest('./dist/css/'));
});