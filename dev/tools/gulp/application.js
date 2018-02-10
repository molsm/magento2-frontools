process.env.NODE_ENV = require('gulp-util').env.production ? 'production' : 'development';

const path = require('path'),
    configuration = require('./config'),
    themes = require('../../../theme');
    rootDirectory = path.resolve(__dirname, '..'),
    gutils = require('gulp-util'),
    gulp = require('gulp'),
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
        Object.keys(themes).forEach((themeId) => {
            let theme = themes[themeId];
            themeRegister.push(Object.assign({}, configuration.scss, theme, {
                    source: path.resolve(
                        rootDirectory,
                        '../..', 'app/design',
                        theme.area,
                        theme.name
                    ) + configuration.scss.source,
                    destination: path.resolve(
                        rootDirectory, '../..',
                        'app/design',
                        theme.area,
                        theme.name
                    ) + configuration.scss.destination,
                    autoprefixer: configuration.autoprefixer
                })
            );
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