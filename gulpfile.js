var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require("gulp-babel");
var responsive = require('gulp-responsive-images');
var browserSync = require('browser-sync').create();

gulp.task('default', ['styles', 'sctipts'], function() {
	gulp.watch('src/js/**/*.js', ['sctipts']);
	gulp.watch('src/css/**/*.css', ['styles']);
	gulp.watch('./index.html').on('change', browserSync.reload);

	browserSync.init({
		server: './'
	});
});

gulp.task('styles', function() {
	gulp.src('src/**/*.css')
		.pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
		.pipe(cssnano())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('sctipts', function (cb) {
  pump([
        gulp.src('src/js/**/*.js'),
        concat('app.js'),
        babel({
            presets: ['es2015']
        }),
        uglify(),
        gulp.dest('js')
    ],
    cb
  );
  gulp.src('js/**/*.js')
  	.pipe(browserSync.stream());
});

gulp.task('images', function () {
  gulp.src('src/img/**/*')
    .pipe(responsive({
      '*': [{
        quality: 75,
      }, {
        quality: 50,
        suffix: '-small'
      }]
    }))
    .pipe(gulp.dest('img'));
});