const application = require('../application'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    linter = require('gulp-scss-lint'),
    scss = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');
    merge = require('merge-stream');

const linterOptions = application.config().scss.linting;
module.exports = function() {
    let tasks = application.getScssSources().map(config => {
        return gulp.src(config.source)
            .pipe(linter(linterOptions))
            .pipe(gulpif(application.mode() === 'development' && !application.isWatchTask(), linter.failReporter()))
            .pipe(gulpif(application.mode() === 'development', sourcemaps.init()))
            .pipe(scss(config.options))
            .on('error', scss.logError)
            .pipe(gulpif(application.mode() === 'development', sourcemaps.write()))
            .pipe(gulpif(application.mode() === 'production', autoprefixer(config.autoprefixer)))
            .pipe(gulpif(application.mode() === 'production', csso()))
            .pipe(gulp.dest(config.destination))
    });

    return merge(tasks);
};
