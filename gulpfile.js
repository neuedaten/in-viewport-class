/* jshint node: true, undef: true, unused: true, esversion: 6, scripturl:true */
/* globals require, console */

"use strict";

const gulp = require('gulp');
const pump = require('pump');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('startConnect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('javascript:live', function(cb) {
    pump([
        gulp.src('./source/in-viewport-class.js'),
        sourcemaps.init(),
        babel({
            presets: ['env']
        }),
        sourcemaps.write('.'),
        gulp.dest('./dist/'),
        connect.reload()],
        cb
    );
});


gulp.task('javascript:build', function(cb) {
    pump([
        gulp.src('./source/in-viewport-class.js'),
        rename({suffix: '.min'}),
        sourcemaps.init(),
        babel({
            presets: ['env']
        }),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('./dist/'),
        connect.reload()],
        cb
    );
});

gulp.task('serve', ['live', 'startConnect']);

gulp.task('build', ['javascript:build']);

gulp.task('live', function() {
    gulp.watch(
        './source/in-viewport-class.js',
        ['javascript:live']);
});