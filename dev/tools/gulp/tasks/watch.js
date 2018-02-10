const application = require('../application'),
    sequence = require('run-sequence'),
    watch = require('gulp-watch');

module.exports = function() {
    application.setWatchTask();

    application.getScssSources().forEach(config => {
        watch(config.source, application.config().watch.scss.options, () => {
            return sequence(...application.config().watch.scss.tasks);
        });
    });
};