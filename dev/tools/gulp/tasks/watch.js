const application = require('../application'),
    watch = require('gulp-watch'),
    sccsConstructor = require('./helper/scss-constructor');

module.exports = () => {
    application.setWatchTask();

    application.getScssSources().forEach(config => {
        watch(config.source, application.config().watch.scss.options, () => {
            sccsConstructor(config);
        });
    });
};