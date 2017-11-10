'use strict';

//include gulp, and all the plugins that are used
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');
    

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
        './img/*.{png,gif,jpg}',
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
});

//clean task
gulp.task('clean', function(){
    return del(['dist']);
});

//copy fonts
gulp.task('copyfonts', function(){
    //using globing patterns
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf, woff, eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

//image compression and minification
gulp.task('imagemin', function(){
    return gulp.src('img/*.{png,gif,jpg}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/img'));
});

//usemin task takes the html files and looks up the blocks, it concatenates, minifies, uglifies and generates 
//the files for the dist folder
gulp.task('usemin', function(){
    return gulp.src('./*.html')
    //flatmap takes multiple html files and starts parallel pipelines for each one of the files before making
    //them converge
    .pipe(flatmap(function(stream, file){
        return stream
        //pipe each stream through the usemin task
        .pipe(usemin ({
            css: [rev()], 
            //as there are multiple html files, use a function
            html: [function(){ return htmlmin({collapseWhitespace:true})}],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }))
    }))
    //pipe resulting streams to dist folder
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], function(){
    //clean should be first and then subsequent tasks can be completed in parallel
     gulp.start('copyfonts', 'imagemin', 'usemin');

});