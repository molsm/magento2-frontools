'use strict';

process.env.NODE_ENV = require('gulp-util').env.production ? 'production' : 'development';

const path = require('path'),
    configuration = require('./config'),
    themes = require('../../../theme'),
    rootDirectory = path.resolve(__dirname, '..'),
    gutils = require('gulp-util'),
    gulp = require('gulp'),
    _ = require('lodash'),
    sequence = require('run-sequence');

let isWatchTask = false,
    magentoRoot = false;

module.exports = {
    path(addition) {
        return rootDirectory + addition;
    },

    magentoRootPath() {
        return magentoRoot;
    },

    config() {
        return configuration;
    },

    getScssSources() {
        let themeRegister = [];

        _.forEach(themes, (theme, key) => {
            let sourcePath = path.resolve(rootDirectory, '../..', 'app/design', theme.area, theme.name)
                + (theme.source ? theme.source : configuration.scss.source);
            let destinationPath = path.resolve(rootDirectory, '../..', 'app/design', theme.area, theme.name)
            + (theme.destination ? theme.destination : configuration.scss.destination);

            let buildedTheme = {
                source: sourcePath,
                destination: destinationPath,
                autoprefixer: configuration.autoprefixer
            };

            themeRegister.push(buildedTheme);
        });

        return themeRegister;
    },

    mode() {
        return process.env.NODE_ENV;
    },

    setWatchTask() {
        isWatchTask = true;
    },

    isWatchTask() {
        return isWatchTask;
    },

    run(magentoRootDirectory) {
        if (!magentoRootDirectory) {
            throw new gutils.PluginError({
                plugin: 'GULP Application',
                message: 'No Magento root path is specified.',
                showStack: false
            });
        }

        magentoRoot = magentoRootDirectory;

        configuration.tasks.list.forEach(function(task) {
            gulp.task(task, require(`${rootDirectory}/gulp/tasks/${task}`));
        });

        gulp.task('default', function(cb) {
            sequence(...configuration.tasks.default.concat([cb]));
        });

        gulp.task('watch', [], require(`${rootDirectory}/gulp/tasks/watch`));

        return gulp;
    }
};