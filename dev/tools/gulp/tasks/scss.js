'use-strict';

const application = require('../application'),
    merge = require('merge-stream'),
    scssConstructor = require('./helper/scss-constructor');

module.exports = function() {
    let tasks = application.getScssSources().map(config => {
        return scssConstructor(config);
    });

    return merge(tasks);
};
