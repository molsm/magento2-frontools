const application = require('../application'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    linter = require('gulp-scss-lint'),
    scss = require('gulp-sass'),
    wait = require('gulp-wait'),
    sourcemaps = require('gulp-sourcemaps');

const linterOptions = application.config().scss.linting;
linterOptions.config = application.path(linterOptions.config);

module.exports = function() {
    return gulp.src(application.path(application.config().scss.source))
        .pipe(linter(linterOptions))
        .pipe(gulpif(application.mode() === 'development' && !application.isWatchTask(), linter.failReporter()))
        .pipe(gulpif(application.mode() === 'development', sourcemaps.init()))
        .pipe(scss(application.config().scss.options))
        .on('error', scss.logError)
        .pipe(gulpif(application.mode() === 'development', sourcemaps.write()))
        .pipe(gulpif(application.mode() === 'production', autoprefixer(application.config().autoprefixer)))
        .pipe(gulpif(application.mode() === 'production', csso()))
        .pipe(gulp.dest(application.path(application.config().scss.destination)))
        .pipe(wait(3000))
        .pipe(application.browserSyncInstance().stream());
};
