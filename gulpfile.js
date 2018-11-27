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
            livereload: false,
        }));
});

gulp.task('serve-dev', function () {
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

gulp.task('make-config', function () {
	var json = JSON.stringify({
		nodeEnv: process.env.NODE_ENV || 'development',
		backendApiUrl: process.env.BACKEND_API_URL || 'http://localhost:3000',
		gmapsApiKey: process.env.GMAPS_API_KEY || 'provideGmapsApiKey',
		mixpanelApiKey: process.env.MIXPANEL_API_KEY || 'provideMixpanelApiKey',
		maxVideoUploadByteSize: process.env.MAX_VIDEO_UPLOAD_BYTE_SIZE || '1500000',
		auth0ClientId: process.env.AUTH0_CLIENT_ID || 'setup_auth0_credentials!',
		auth0Domain: process.env.AUTH0_DOMAIN,
		auth0Audience: process.env.AUTH0_AUDIENCE,
		auth0Redirect_uri: process.env.AUTH0_REDIRECT_URI,
		auth0Scope: process.env.AUTH0_SCOPE,
		auth0MetadataNS: process.env.AUTH0_METADATA_NS,
		flavour: process.env.FLAVOUR || 'vimojo',
		mainColor: process.env.MAIN_COLOR || '#f14b51',
		openGallery: process.env.OPEN_GALLERY === "true" || false,
		driftKey: process.env.DRIFT_KEY || false,
		driftSnippetVersion: process.env.DRIFT_SNIPPET_VERSION || '0.3.1',
	});

	return b2v.stream(new Buffer(json), 'config.js')
		.pipe(gulpNgConfig('app.config'))
		.pipe(gulp.dest('js'));
});

gulp.task('flavour', function () {
	let flavour = process.env.FLAVOUR || 'vimojo';
	console.log('##############################################');
	console.log('### Building flavour ' + flavour);
	console.log('##############################################');

	return gulp.src('./flavour/' + flavour + '/**/**')
		.pipe(debug({ title: 'Move flavour files (' + flavour + '):' }))
		.pipe(gulp.dest('./'));
});


// Build dependencies
var sourceDeps = [
	'../node_modules/ng-file-upload/dist/ng-file-upload.min.js',
	'../node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
	'../node_modules/ngmap/build/scripts/ng-map.min.js',
	'../node_modules/videogular-buffering/vg-buffering.min.js',
	'../node_modules/videogular-controls/vg-controls.min.js',
	'../node_modules/videogular-overlay-play/vg-overlay-play.min.js',
	'./js/custom-vg-poster.js',
	'../node_modules/auth0-js/build/auth0.js',
	'../node_modules/angular-auth0/dist/angular-auth0.min.js',
  '../node_modules/angular-material-data-table/dist/md-data-table.min.js',
	'../node_modules/angulartics/dist/angulartics.min.js',
	'../node_modules/angulartics-google-analytics/dist/angulartics-ga.min.js',
	'../node_modules/angulartics-mixpanel/dist/angulartics-mixpanel.min.js',
	'../node_modules/ng-drift/lib/ng-drift.js',
];

var styleDeps = [
  '../node_modules/angular-material-data-table/dist/md-data-table.min.css',
];
gulp.task('join-dependencies', ['make-config', 'flavour', 'copy-style-dependencies'], function () {
	return gulp.src(sourceDeps)
		.pipe(debug({ title: 'Join js dependencies:' }))
		.pipe(concat('modules.js'))
		.pipe(gulp.dest('./modules'));
});

gulp.task('copy-style-dependencies', [], function () {
  return gulp.src(styleDeps)
    .pipe(debug({ title: 'Copy style dependencies:' }))
    // .pipe(concat('modules.js'))
    .pipe(gulp.dest('./modules/css'));
});

gulp.task('dependencies', ['join-dependencies'], function () {
	return gulp.src('./modules/modules.js')
		.pipe(debug({ title: 'Move js dependencies:' }))
		.pipe(minify({
			ext: {
				src: '-debug.js',
				min: '.min.js',
			},
		}))
		.pipe(gulp.dest('./dist/js'));
});


// Build app js
var sourceJs = [
	'./js/**/**.js',
	'!./js/custom-vg-poster.js',
	'./languages/**/**.js',
	'./services/**/**.js',
	'./services/**.js',
	'./components/**/**.js',
	'./pages/**/**.js',
	'!./gulpfile.js',
	'!./**/**.spec.js',
	'!./node_modules/**',
	'!./dist/**',
];
gulp.task('js', ['dependencies', 'make-config', 'flavour'], function () {
	return gulp.src(sourceJs)
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
	'./*/**.spec.js',
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
gulp.task('html', ['make-config', 'flavour'], function () {
	gulp.src(sourceHtml)
		.pipe(debug({ title: 'Move HTML:' }))
		.pipe(gulp.dest('./dist'));
});

var sourceSass = [
	'./**.scss',
	'./sass/*.scss',
	'./pages/**/**.scss',
	'./pages/**/*.scss',
	'./components/**/*.scss',
];
gulp.task('sass', ['flavour'], function () {
	gulp.src('./sass/style.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(debug({ title: 'Move SCSS:' }))
		.pipe(gulp.dest('./css'));

	gulp.src('./css/**/**.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('images', ['flavour'], function () {
	gulp.src('./img/**/**')
		.pipe(debug({ title: 'Move images:' }))
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', ['flavour'], function () {
	gulp.src('./fonts/**/**')
		.pipe(debug({ title: 'Move fonts:' }))
		.pipe(gulp.dest('./dist/fonts'));
});


// Perform a complete build
gulp.task('build', ['make-config', 'flavour', 'dependencies', 'js', 'images', 'fonts', 'html', 'tests', 'sass']);


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

// Watch and build on change
gulp.task('watch', function () {
	gulp.watch(sourceJs, ['js']);
	gulp.watch(sourceTest, ['tests']);
	gulp.watch(sourceHtml, ['html']);
	gulp.watch(sourceSass, ['sass']);
	// gulp.watch(['./src/**/*.css', './src/**/*.css'], ['styles']);
});

gulp.task('default', ['watch']);
