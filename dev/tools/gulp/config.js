const path = require('path');

module.exports = {
    tasks: {
        list: ['bower', 'scss', 'copy-js', 'browser-sync', 'clean-cache'],
        default: ['bower', 'scss', 'copy-js']
    },

    autoprefixer: {
        browsers: ['> 1%', 'IE >= 10']
    },

    scss: {
        source: '/web/assets/scss/**/*.scss',
        destination: '/web/assets/css',
        options: {
            outputStyle: process.env.NODE_ENV === 'development' ? 'expanded' : 'compressed',
            includePaths: []
        },

        linting: {
            config: path.resolve(__dirname, '/../.scss-lint.yml')
        }
    },

    js: {
        sources: [],
        destination: '/web/js'
    },

    watch: {
        scss: {
            source: '/web/assets/scss/**/*.scss',
            tasks: ['copy-js', 'scss', 'clean-cache'],
            options: { ignoreInitial: false }
        }
    }
};