var gulp = require('gulp');
var webserver = require('gulp-webserver');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
 
gulp.task('serve', function() {  
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      fallback: 'index.html',
      livereload: true
    }))
});

gulp.task('js', function() {
	gulp.src(["./*/**.js", "!./gulpfile.js"])
		.pipe(debug({title: 'Join JS:'}))
		.pipe(concat('app.js'))
		.pipe(minify({
	        ext:{
	            src:'-debug.js',
	            min:'.js'
	        }
        }))
		.pipe(gulp.dest("./dist/js"));
});

gulp.task('html', function() {
	gulp.src(["./*/**.html"])
		.pipe(debug({title: 'Move HTML:'}))
		.pipe(gulp.dest("./dist"));
});

gulp.task('build', ['js', 'html']);


gulp.task('watch', function() {  
  gulp.watch('./*/**.js', ['js'])
  gulp.watch('./*/**.html', ['html'])
//  gulp.watch(['./src/**/*.css', './src/**/*.css'], ['styles'])
});



gulp.task('default', ['watch']);