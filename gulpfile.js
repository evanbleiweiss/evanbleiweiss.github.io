'use strict';
var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

var paths = {
  bower:   'bower_components',
  css:     'stylesheets/**/*.scss'
  scripts: 'scripts/**/*.coffee',
  images: 'images/**/*'
};

gulp.task('default', function() {
  // place code for your default task here
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], 
    {read: false}).pipe($.clean());
});

// Minify and copy all JavaScript (except vendor scripts)
// with sourcemaps all the way down
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe($.sourcemaps.init())
      .pipe($.coffee())
      // .pipe(uglify())
      // .pipe(concat('all.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'));
});

// Bower helper
gulp.task('bower', function() {
    gulp.src('bower_components/**/*.js', {base: 'bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));
});

// Styles
gulp.task('styles', function () {
    return gulp.src(paths.css)
        .pipe($.rubySass({
            style: 'expanded',
            loadPath: [paths.bower]
        }))
        .on('error', function (err) { console.log(err.message); })
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        // .pipe($.size())
        // .pipe($.connect.reload());
});
