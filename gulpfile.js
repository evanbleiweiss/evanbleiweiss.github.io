'use strict';
var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

var paths = {
  bower:   'bower_components',
  css:     'stylesheets/**/*.scss',
  scripts: 'scripts/**/*.coffee',
  images:  'images/**/*'
};

gulp.task('default', ['clean', 'coffee', 'html', 'styles'], function() {
  //start this inside a function rather than the initializer array bc it seems
  //like this needs to wait to execute after everything else finishes
  gulp.start('webserver');
});

// Out with the old
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], 
    {read: false}).pipe($.clean());
});

// HTML
gulp.task('html', function () {
    return gulp.src('*.html')
        // .pipe($.useref())
        .pipe(gulp.dest('dist'));
        // .pipe($.size())
        // .pipe($.connect.reload());
});

// Minify and copy all Coffeescripts (except vendor scripts)
// with sourcemaps all the way down
gulp.task('coffee', ['clean'], function() {
  // ^^coffee really wants to be clean ^^
  return gulp.src(paths.scripts)
    .pipe($.sourcemaps.init())
      .pipe($.coffee())
      // .pipe(uglify())
      // .pipe(concat('all.min.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'));
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
        .pipe(gulp.dest('dist/styles'));
        // .pipe($.size())
        // .pipe($.connect.reload());
});

// Server
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      // directoryListing: true,
      // open: true
    }));
});

gulp.task('watchmen', ['default'], function () {
// If this appears broken
// see http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc
// look into https://www.npmjs.org/package/gulp-watch

    // Watch .json files
    // gulp.watch('scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('*.html', ['html']);
    
    // Watch .scss files
    gulp.watch('stylesheets/**/*.scss', ['styles']);

    // Watch .jade files
    // gulp.watch('app/template/**/*.jade', ['jade', 'html']);

    // Watch .coffeescript files
    gulp.watch('scripts/**/*.coffee', ['coffee']);

    // Watch .js files
    // gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('images/**/*', ['images']);
});

//          //
// One Offs //
//          //

// Bower helper
gulp.task('bower', function() {
    gulp.src('bower_components/**/*.js', {base: 'bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));
});

