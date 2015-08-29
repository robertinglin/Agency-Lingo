'use strict';

var production = false;

// Module Requires
var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var watchify = require('watchify');
var _ = require('lodash');
var del = require('del');
var babel = require('gulp-babel');
var babelify = require('babelify');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');

// Gulp paths and options
var SRC_DIR = './client/src';
var BUILD_DIR = './dist';

var SRC_JS = SRC_DIR;
var SRC_CSS = SRC_DIR;
var SRC_SASS = path.join(SRC_DIR, 'sass');
var SRC_LESS = path.join(SRC_DIR, 'less');
var SRC_IMG = path.join(SRC_DIR, 'img');
var SRC_FONTS = path.join(SRC_DIR, 'fonts');
var SRC_PARTIALS = SRC_DIR;
var SRC_DATA = SRC_DIR;
var SRC_SHARED = SRC_DIR;

var BROWSERIFY_BUNDLES = [{
    debug: true,
    entries: SRC_JS + '/components/AgencyLingo.js',
    dest: BUILD_DIR,
    outputName: 'global.js',
    paths: ['./node_modules', './src/js'],
    fullPaths: true
}];

var BROWSERSYNC = {
    server: {
        baseDir: './dist'
    }
};

// Clean up build directory
gulp.task('clean', function (cb) {
    del(BUILD_DIR, { force: true }, function (err) {
        if (err) { cb(err); }
        cb();
    });
});

//move js
gulp.task('js', function () {
    return gulp.src(SRC_JS + '/**/*.js')
        .pipe(babel({
            nonStandard: true
        }))
        .on('error', function(err) { console.log(err); })
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(gulpif(!production, browserSync.reload({
        stream: true
    })));
});
// Move partials
gulp.task('partials', function () {
    return gulp.src(SRC_PARTIALS + '/**/*.html')
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(gulpif(!production, browserSync.reload({
        stream: true
    })));
});

//move shared folder

gulp.task('shared', function (){
    return gulp.src(SRC_DATA + '/**/*.js')
    .pipe(gulp.dest(BUILD_DIR))
    .pipe(gulpif(!production, browserSync.reload({
        stream: true
    })));
});

//Move data
gulp.task('data', function () {
    return gulp.src(SRC_DATA + '/**/*.json')
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(gulpif(!production, browserSync.reload({
        stream: true
    })));
});
gulp.task('css', function () {
    return gulp.src(SRC_CSS + '/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(gulpif(!production, browserSync.reload({
        stream: true
    })));
});

gulp.task('watch', function () {
    //gulp.watch(SRC_SASS + '/*', ['styles']);
    //gulp.watch(SRC_IMG + '/*', ['images']);
    gulp.watch(SRC_PARTIALS + '/**/*.html', ['partials']);
    gulp.watch(SRC_CSS + '/**/*.css', ['css']);
    gulp.watch(SRC_JS + '/**/*/js', ['js']);
    gulp.watch(SRC_DATA + '/**/*/.json', ['data']);
    gulp.watch(SRC_SHARED + '/**/*/.js', ['shared']);
});

// Javscript linting
gulp.task('lint', function () {
    return gulp.src(SRC_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Javascript assets pipeline
gulp.task('scripts', ['lint'], function (cb) {
    var queue = BROWSERIFY_BUNDLES.length;

    function browserifyIt(config) {
        _.extend(config, {
            cache: {},
            packageCache: {}
        });

        var b = browserify(config);
        b.transform(babelify);

        b = watchify(b);

        function done() {
            if (--queue === 0) {
                cb();
            }
        }

        function bundle() {
            console.log('Building scripts...');
            return b
                .bundle()
                .on('error', function (err) {
                console.log(err);
            })
                .pipe(source(config.outputName))
                .pipe(gulp.dest(config.dest))
                .pipe(browserSync.reload({
                stream: true
            }))
                .on('end', done);
        }

        b.on('update', bundle);

        return bundle();
    }

    BROWSERIFY_BUNDLES.forEach(browserifyIt);
});

// Browser Sync
gulp.task('browserSync', function () {
    browserSync.init(BROWSERSYNC);
});

// Build task
gulp.task('build', function (cb) {
    runSequence(
        'clean',

        // run these in parallel
        [
            'lint',
            'scripts',
            'partials',
            'css',
            'js',
            'data',
            'shared'
        ],
        function (err) {
            if (err) {
                cb(err);
            }
            cb();
        }
        );
});

// Default gulp task
gulp.task('default', ['build', 'watch', 'browserSync']);