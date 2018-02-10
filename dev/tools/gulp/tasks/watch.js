const application = require('../application'),
    sequence = require('run-sequence'),
    watch = require('gulp-watch');

module.exports = function() {
    application.setWatchTask();

    watch(application.path(application.config().watch.scss.source), application.config().watch.scss.options, function() {
        return sequence(...application.config().watch.scss.tasks);
    });
};