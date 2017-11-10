'use strict';

//include gulp, gulp-sass and browser-sync
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync')

/* gulp.src() --> function that takes file globs and creates a stream of objects that represent the files
 pipe() --> allows stream to be piped through a function
 gilp.dest() --> specifies the destination of changed files */
gulp.task('sass', function(){
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

gulp.task('sass:watch', function(){
    //specify the files to watch; use gulp's built-in watch
    gulp.watch('./css/*.scss', ['sass']);
});


gulp.task('browser-sync', function(){
    var files = [
        //specify all files that if modified the browser sync needs to reload
        './*.html',
        './css/*.css',
        './img/.{png,gif,jpg}',
        './js/*.js'
    ];
    //using the browserSync variable defined at the top
    browserSync.init(files, {
        //options
        server: {
            baseDir: './'
        }
    });
});

//define the default task
gulp.task('default', ['browser-sync'], function(){
    //only starts after browser-sync is running
    gulp.start('sass:watch');
})